import { NextResponse } from 'next/server';
import client, { connectToRedis } from '@/lib/redis';

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

const CACHE_DURATION = 30 * 60; // 30 minutes in seconds

export async function GET() {
  try {
    // Attempt to connect to Redis if not already connected
    await connectToRedis();

    const now = Date.now();
    let cachedData, cachedTimestamp;

    if (client.isReady) {
      try {
        cachedData = await client.get('weather_data');
        cachedTimestamp = await client.get('weather_data_timestamp');
      } catch (error) {
        console.error('Error fetching cached data:', error);
      }
    }

    if (cachedData && cachedTimestamp) {
      const dataAge = now - parseInt(cachedTimestamp);
      console.log(`Cached data age: ${dataAge / 1000} seconds`);

      if (dataAge < CACHE_DURATION * 1000) {
        console.log('Using cached weather data');
        return NextResponse.json(JSON.parse(cachedData));
      } else {
        console.log('Cache expired, fetching fresh data');
      }
    } else {
      console.log('No cached data found, fetching fresh data');
    }

    console.log('Fetching fresh weather data from AccuWeather API');

    const locationResponse = await fetch(
      `${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=New%20York%20City`
    );
    const locationData = await locationResponse.json();
    const locationKey = locationData[0].Key;

    const currentConditionsResponse = await fetch(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`
    );
    const currentConditionsData = await currentConditionsResponse.json();

    const weatherData = {
      locationKey,
      currentConditions: currentConditionsData[0],
      fetchedAt: now,
    };

    // Modify the caching part
    if (client.isReady) {
      try {
        console.log('Storing new weather data in Redis cache');
        await client.set('weather_data', JSON.stringify(weatherData));
        await client.set('weather_data_timestamp', now.toString());
      } catch (error) {
        console.error('Error caching weather data:', error);
      }
    } else {
      console.log('Redis not available, skipping caching');
    }

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

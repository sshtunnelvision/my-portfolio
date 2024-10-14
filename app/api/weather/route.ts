import { NextResponse } from 'next/server';
import client from '@/lib/redis';

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

const CACHE_DURATION = 30 * 60; // 30 minutes in seconds

export async function GET() {
  try {
    // Check if Redis client is connected, if not, wait for it to connect
    if (!client.isReady) {
      await new Promise((resolve) => {
        client.on('connect', resolve);
      });
    }

    const now = Date.now();
    const cachedData = await client.get('weather_data');
    const cachedTimestamp = await client.get('weather_data_timestamp');

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

    console.log('Storing new weather data in Redis cache');
    await client.set('weather_data', JSON.stringify(weatherData));
    await client.set('weather_data_timestamp', now.toString());

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import redisClient from '@/lib/redis';

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

const CACHE_DURATION = 60 * 60; // 1 hour in seconds

export async function GET() {
  try {
    console.log('Attempting to retrieve weather data from Redis cache');
    // Try to get cached data from Redis
    const cachedData = await redisClient.get('weather_data');

    if (cachedData) {
      console.log('Using cached weather data');
      return NextResponse.json(JSON.parse(cachedData));
    }

    console.log('No cached data found. Fetching fresh weather data');

    // If no valid cache, fetch new data
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
    };

    console.log('Storing new weather data in Redis cache');
    // Store the new data in Redis
    await redisClient.set('weather_data', JSON.stringify(weatherData), {
      EX: CACHE_DURATION
    });

    console.log('Returning fresh weather data');
    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

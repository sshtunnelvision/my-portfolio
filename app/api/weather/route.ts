import { NextResponse } from 'next/server';

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

// Cache object
let weatherCache: {
  data: any;
  timestamp: number;
} | null = null;

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    // Check if we have cached data that's still valid
    if (weatherCache && Date.now() - weatherCache.timestamp < CACHE_DURATION) {
      console.log('Using cached weather data'); // Log for cached data
      return NextResponse.json(weatherCache.data);
    }

    console.log('Fetching fresh weather data'); // Log for fresh data fetch

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

    // Update the cache
    weatherCache = {
      data: weatherData,
      timestamp: Date.now(),
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

export async function GET() {
  try {
    console.log('Fetching weather data from AccuWeather API');

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
      fetchedAt: Date.now(),
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

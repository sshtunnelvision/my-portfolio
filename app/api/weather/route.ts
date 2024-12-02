import { NextResponse } from 'next/server';

const ACCUWEATHER_API_KEY = process.env.ACCUWEATHER_API_KEY;
const BASE_URL = 'http://dataservice.accuweather.com';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    console.log('Fetching weather data from AccuWeather API');

    const locationResponse = await fetch(
      `${BASE_URL}/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=New%20York%20City`,
      { cache: 'no-store' }
    );
    const locationData = await locationResponse.json();
    const locationKey = locationData[0].Key;

    const currentConditionsResponse = await fetch(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`,
      { cache: 'no-store' }
    );
    const currentConditionsData = await currentConditionsResponse.json();

    return NextResponse.json({
      locationKey,
      currentConditions: currentConditionsData[0],
      fetchedAt: Date.now(),
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({
      locationKey: "349727",
      currentConditions: {
        WeatherText: "Sunny",
        Temperature: {
          Imperial: {
            Value: 70,
            Unit: "F"
          }
        }
      }
    });
  }
}

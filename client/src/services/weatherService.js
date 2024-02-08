import { getTimezones } from "country-timezone";
import { DateTime } from "luxon";

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(`${import.meta.env.VITE_WEATHER_BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...searchParams, appid: import.meta.env.VITE_WEATHER_API_KEY })
  return fetch(url).then((res) => res.json()).then((data) => data);

}


const formatCurrentWeather = (data) => {
  console.log('formatCurrentWeather data', data)
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed }
  } = data;

  const { main: details, icon } = weather[0]

  return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed }
}

const formatTimeZone = (country) => {
  let timeZone;
  switch (country) {
    case 'IN':
      timeZone = 'Asia/Kolkata';
      break;
    case 'JP':
      timeZone = 'Asia/Tokyo';
      break;
    case 'GB':
      timeZone = 'Europe/London';
      break;
    case 'AE':
      timeZone = 'Asia/Dubai';
      break;
    case 'ES':
      timeZone = 'Canada/Eastern';
      break;
    case 'CU':
      timeZone = 'America/Jamaica';
      break;
    default:
      var timeZones = getTimezones(country); // Move the variable declaration outside
      timeZone = timeZones.length > 0 ? timeZones[0] : null;
  }
  return timeZone;
}

const formatForecastWeather = (data) => {
  let { timezone, list } = data;
  console.log('forecastWeather', data)
  console.log('data', data)

  list = list.slice(0, 5).map(d => {

    return {
      title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
      temp: d.main.temp,
      icon: d.weather[0].icon
    }
  })

  return { timezone, list }
}


const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);

  const { lat, lon, country } = formattedCurrentWeather;
  console.log('country: ' + country)
  // Chain promises to get the time zone first
  return getWeatherData('forecast', { lat, lon, units: searchParams.units })
    .then(data => {
      const timezone = formatTimeZone(country);
      return formatForecastWeather({ ...data, timezone });
    })
    .then(formattedForecastWeather => {
      console.log('forecastWeather: ', formattedForecastWeather);
      return { ...formattedCurrentWeather, ...formattedForecastWeather };
    });
}


const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"

) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`


export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode, formatTimeZone };
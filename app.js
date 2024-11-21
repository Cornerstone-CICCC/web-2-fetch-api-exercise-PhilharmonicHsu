const temp = document.querySelector('#temp');
const windSpeed = document.querySelector('#wind-speed');
const timezone = document.querySelector('#timezone');
const datetime = document.querySelector('#datetime');
const refreshBtn = document.querySelector('#refresh-btn');

const getWeather = async () => {
  try {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers,wind_speed_10m&timezone=auto&forecast_days=1')
    const data = await response.json();

    temp.innerHTML = `${data.current.temperature_2m} ${data.current_units.temperature_2m}`;
    windSpeed.innerHTML = `Wind speed: ${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`
    timezone.innerHTML = data.timezone;

    let time = new Date(data.current.time)

    datetime.innerHTML = `Last updated: ${time.toLocaleString("en-US")}`

    if (data.current.is_day) {
      datetime.classList.add('nighttime')
    }
  } catch (err) {
    console.log(err);
  }
}

function reset() {
  temp.innerHTML = '...'
  windSpeed.innerHTML = ''
  timezone.innerHTML = ''
  datetime.innerHTML = ''
}

refreshBtn.addEventListener('click', async () => {
  reset()
  await getWeather()

  alert('Already refreshing')
});

getWeather()
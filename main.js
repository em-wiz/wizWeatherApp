const api = {
    key: "7076ca0a3bc6bf16c7594314681ae603",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults);
  }
  
  function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weatherDescription = document.querySelector('.current .description');
    weatherDescription.innerText = weather.weather[0].main;

    let longitude = document.querySelector('.longitude');
    longitude.innerHTML = `<span>Longitude: </span>${Math.round(weather.coord.lon)}<span>°</span>`;

    let latitude = document.querySelector('.latitude');
    latitude.innerHTML = `<span>Latitude: </span>${Math.round(weather.coord.lat)}<span>°</span>`;

    let pressure = document.querySelector('.pressure');
    pressure.innerHTML = `<span>Pressure: </span>${Math.round(weather.main.pressure)}<span>Pa</span>`;

    let humidity = document.querySelector('.humidity');
    humidity.innerHTML = `<span>Humidity: </span>${Math.round(weather.main.pressure)}<span>g.kg-1</span>`;

    let bg_image = document.body.style.backgroundImage;

    switch(weatherDescription.innerText) {
      case 'Clear':
        bg_image = document.body.style.backgroundImage = "url('assets/sunny.jpg')";
        break;
      case 'Rain':
        bg_image = document.body.style.backgroundImage = "url('assets/rain.jpg')";
        break;
      case 'Sunny':
        bg_image = document.body.style.backgroundImage = "url('assets/sunny.jpg')";
        break;
      case 'Clouds':
        bg_image = document.body.style.backgroundImage = "url('assets/cloud.jpg')";
        break;
      case 'Thunderstorm':
      bg_image = document.body.style.backgroundImage = "url('assets/thunderstorm.jpg')";
      break;
      default:
        bg_image = document.body.style.backgroundImage = "url('assets/bg-default.jpg')";
    }
    

  }




  
  function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  } 
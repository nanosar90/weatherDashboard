var submitBtn = document.getElementById('search-button');
var submitVal = document.getElementById('search-box');
var todaysDate = document.getElementById('todaysDate');
var weatherGif = document.getElementById('weatherGif');
var todaysIcon = document.getElementById('todaysIcon');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var uvEl = document.getElementById('uvIndex');
var city = document.getElementById('name');
var desc = document.getElementById('desc');
var icon = document.getElementById('icon');


submitBtn.addEventListener('click', function(){
    fetch('https://api.opencagedata.com/geocode/v1/json?q='+submitVal.value+'&key=6b1781b276684b489d50b410afde64d2').then(response=> response.json())
    .then(data => {
    
    var latvalue = data.results[0].geometry.lat
    var longvalue = data.results[0].geometry.lng
    var cityName = data.results[0].formatted
    console.log(cityName)
    city.innerHTML = cityName;

    var finalVar = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latvalue+'&lon='+longvalue+'&exclude=hourly,minutely,alerts&units=imperial&appid=8ab2be6d9faf82566c55dc24245637af'

    console.log(finalVar)
    
    fetch(finalVar).then(response=> {return response.json()})
    .then(data => {

        console.log(data)

        
    
    var tempValue = data.current.temp;
    var descValue = data.current.weather[0].description;
    var uvVal = data.current.uvi;
    var humidityVal = data.current.humidity;
    var windValue = data.current.wind_speed;
    let iconValue = data.current.weather[0].icon;
    var currentDate = data.current.dt
    var uvColor= document.getElementById('uvStatus');
    var uvStatus = "text-red-500"
            if (uvVal <= 2) {
                uvStatus = "text-green-500"
            }
            else if (uvVal <= 6) {
                uvStatus = "text-yellow-400";
            }
            else if (uvVal <= 8) {
                uvStatus = "text-yellow-600"
            };
    uvEl.setAttribute('class', uvStatus )
    
    console.log(uvVal);
    
    
    tempEl.innerHTML = tempValue;
    desc.innerHTML = descValue;
    uvEl.innerHTML = uvVal;
    humidityEl.innerHTML = humidityVal;
    windEl.innerHTML = windValue;
    icon.setAttribute('src', 'http://openweathermap.org/img/wn/'+ iconValue + '@2x.png')
    const date = document.getElementById('forecastDate');
    date.innerHTML = moment.unix(currentDate).format('MM/ DD/ YY ');

        for(let i=1; i<6; i++) {
            const tempElement = document.getElementById(`temp${i}`);
            const tempF = data.daily[i].temp.day;
            tempElement.innerHTML = tempF + ' F';
            const humidityElement = document.getElementById(`humidity${i}`);
            const humidity = data.daily[i].humidity;
            humidityElement.innerHTML = humidity;
            const windSpeed = document.getElementById(`wind${i}`);
            const windMPH = data.daily[i].wind_speed;
            windSpeed.innerHTML = windMPH + 'MPH';
            var uVI = document.getElementById(`uvIndex${i}`);
            const uvNum = data.daily[i].uvi;
            var uvColor = "text-red-500"
                if (uvNum <= 2) {
                    uvColor = "text-green-500"
                }
                else if (uvNum <= 6) {
                    uvColor = "text-yellow-400";
                }
                else if (uvNum <= 8) {
                    uvColor = "text-yellow-600"
                };
            uVI.innerHTML = uvNum;
            const icons= document.getElementById(`icon${i}`);
            const iconsValue = data.daily[i].weather[0].icon;
            icons.setAttribute('src', 'http://openweathermap.org/img/wn/'+ iconsValue + '@2x.png')
            const description = document.getElementById(`desc${i}`);
            description.innerHTML = data.daily[i].weather[0].description;
            const date = data.daily[i].dt;
            const dates = document.getElementById(`forecastDate${i}`);
            dates.innerHTML = moment.unix(date).format('MM/ DD/ YY ');
            uVI.setAttribute('class', uvColor )
            

        }

    })

})
    

.catch(error => alert('wrong city name'))
})




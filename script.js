var submitBtn = document.getElementById('search-button');
var submitVal = document.getElementById('search-box');
var todaysDate = document.getElementById('todaysDate');
var weatherGif = document.getElementById('weatherGif');
var todaysIcon = document.getElementById('todaysIcon');
var tempEl = document.getElementById('temp');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var uvEl = document.getElementById('uvIndex');
var location = document.getElementById('name');
var desc = document.getElementById('desc');

submitBtn.addEventListener('click', function(){
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+submitVal.value+'&appid=8ab2be6d9faf82566c55dc24245637af').then(response=> response.json())
.then(data => {
    var nameValue = data['name'];
    var tempValue = data['main']['temp'];
    var descValue = data['weather'][0]['description'];

    location.innerHTML = nameValue;
    temp.innerHTML = tempValue;
    desc.innerHTML = descValue;
})

.catch(error => alert('wrong city name'))
})


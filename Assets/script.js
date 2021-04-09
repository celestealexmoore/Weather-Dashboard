//Made the key a constant variable we need multiple API's & can just reference the variable.
const WEATHER_API_KEY = '37da8c9a08447f616fa749bd4ecfb171'

//grab existing history from localStorage IF it exists.
window.addEventListener('load', function () {
    var existingHistory;
    if (!JSON.parse(localStorage.getItem('searchHistory'))) {
      existingHistory = [];
    } else {
      existingHistory = JSON.parse(localStorage.getItem('searchHistory'));
}
var historyItems = [];

//when the page loads, do this:
$(document).ready( function () {
    //display current date at top of div
    $("#current-day").text(moment().format("dddd D/MM/YYYY")); 
    // Function to get the forecast, loop through only the days of the week and render data to the page
    function getForecast(searchValue) {
        if (!searchValue){
            return;
        }
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${WEATHER_API_KEY}`
        fetch(weatherAPI)
        //(res) is response.
        .then((res) => res.json())
        .then((data) => {
            //select my forecast element
            var forecastBlocks = $("#forecast-blocks");
         // Loop over all forecasts (by 3-hour increments)
            for (var i=0; i< data.list.length; i++){
                // Only look at forecasts around 3:00pm
                if (data.list[i].dt_txt.indexOf('15:00:00') !== -1) {
                    // Create HTML elements for the forecastBlocks
            const { temp, humidity } = res.main
            const { speed } = res.wind
            const { name } = res
            temp = document.createElement('p');
            temp.classList.add('card-text');
            temp.text("Temperature: " + temp + "℉");
            speed = document.createElement('p');
            speed.classList.add('card-text');
            speed.text("Speed: " + speed + " MPH")
            humidity = document.createElement('p');
            humidity.classList.add('card-text');
            humidity.text("Humidity: " + humidity + "%");
           $("forecast-blocks").classList.add('card-title');
           var blockFutureDates = document.createElement('h5');
           blockFutureDates.textContent = new Date(
            //something goes here
           ).toLocaleDateString();
            var weatherIcons = document.createElement('icons');
            weatherIcons.setAttribute(
                'src',
                `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`
            );

            // Merge together and put on page
            forecaseBlocks.appendChild(blockFutureDates);
            forecastBlocks.appendChild(weatherIcons);
            $("forecast-blocks").appendChild(temp);
            $("forecast-blocks").appendChild(humidity);
            $("forecast-blocks").appendChild(speed);
            }
        }
    });

    //uv index
    
    function getUVIndex(lat, lon) {
        fetch(
            `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
        )
            .then((res) => res.json())
            .then((data) => {
            var bodyEl = document.querySelector('.card-body');
            var uvEl = document.createElement('p');
            uvEl.id = 'uv';
            uvEl.textContent = 'UV Index: ';
            var buttonEl = document.createElement('span');
            buttonEl.classList.add('btn', 'btn-sm');
            buttonEl.innerHTML = data.value;
    
            switch (data.value) {
                case data.value < 3:
                buttonEl.classList.add('btn-success');
                break;
                case data.value < 7:
                buttonEl.classList.add('btn-warning');
                break;
                default:
                buttonEl.classList.add('btn-danger');
            }
    
            bodyEl.appendChild(uvEl);
            uvEl.appendChild(buttonEl);
            });





    const searchButton = $('#search-button')
    
    searchButton.click(()=> {
        //
        const searchVal = $('#search-bar').val();
        console.log('SEARCH VALUE---> ',searchVal);
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${WEATHER_API_KEY}`
    });

    $.ajax(requestUrl).then(res => {
        console.log('RESPONSE FROM API=> ', res)
        //temp, humiidty
        const { temp, humidity } = res.main
        //wind speed
        const { speed } = res.wind
        const { name } = res

        console.log( 'temp --> ', temp)
        console.log('wind speed ---> ', speed)

        $('#city-name').text(name)
        
        //Convert Temperature from Kelvin to F

        $('#temp').text("Temperature: " + temp + "℉");
        $('#humidity').text("Humidity: " + humidity + "%");
        $('#wind-speed').text("Speed: " + speed + " MPH"); // plus sign concatonates, not commas!
    });

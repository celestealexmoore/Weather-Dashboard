//Made the key a constant variable we need multiple API's & can just reference the variable.
const WEATHER_API_KEY = '37da8c9a08447f616fa749bd4ecfb171'

//grab existing history from localStorage IF it exists.
window.addEventListener('load', function () {
    var existingHistory;
    if (!JSON.parse(localStorage.getItem('searchHistory'))) {
      existingHistory = [];
    } else {
      existingHistory = JSON.parse(localStorage.getItem('searchHistory'));
    };
    var historyItems = [];
});

    //display current date at top of div
$("#current-day").text(moment().format("dddd D/MM/YYYY")); 

//Function to get the forecast, loop through only the days of the week and render data to the page
function getForecast(lon, lat) {
    // if (!lon, lat){
    //     return;
    // };
    const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=imperial`
    fetch(weatherAPI)
        //(res) is response.
        .then((res) => res.json())
        .then((data) => {
            //select my forecast element
            console.log(data);
            var forecastBlocks = $("#forecast-blocks-parent"); //or just ("#forecast-blocks")
            forecastBlocksEl = document.createElement('div');
            forecastBlocksEl.className = '"row"';
            for (var i = 0; i < 5; i++){
        };
    

        // Create HTML elements for the forecastBlocks
        
        temp = document.createElement('p');
        temp.classList.add('card-text');
        temp.text("Temperature: " + data.current.temp + "℉");
        humidity = document.createElement('p');
        humidity.classList.add('card-text');
        humidity.text("Humidity: " + data.current.humidity + "%");
        speed = document.createElement('p');
        speed.classList.add('card-text');
        speed.text("Speed: " + data.current.wind_speed + " MPH")
        uv = document.createElement('p');
        uv.classList.add('card-text');
        uv.text("UV Index: " + data.current.uvi);
        $("forecast-blocks").classList.add('card-title');
        var blockFutureDates = document.createElement('h5');
        blockFutureDates.textContent = new Date(data.current.dt).toLocaleDateString();
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
    });
    
};

//uv index

function getUVIndex(lon, lat) {
    fetch(
        `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
    )
        .then((res) => res.json())
        .then((data) => {
            $('#uvIndex').text("Uv Index: " + data.value);
            switch (data.value) {
                case data.value < 3:
                uvIndex.classList.add('btn-success');
                break;
                case data.value < 7:
                uvIndex.classList.add('btn-warning');
                break;
                default:
                uvIndex.classList.add('btn-danger');
            };
            // to get value from the third-party API, console.log data to show the response, then look for the value you need, call the element in HTML & append the data.
        });

};

//What I did with Tutor
//This allows the search button to function: pulls info from API and posts in displayedCity div

const searchButton = $('#search-button');
    
searchButton.click(()=> {
    //
    const WEATHER_API_KEY = '37da8c9a08447f616fa749bd4ecfb171'
    const searchVal = $('#search-bar').val();
    console.log('SEARCH VALUE---> ',searchVal);
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${WEATHER_API_KEY}&units=imperial`

    $.ajax(requestUrl).then(res => {
        console.log('RESPONSE FROM API=> ', res)
        //temp, humidity
        const { temp, humidity } = res.main
        //wind speed
        const { speed } = res.wind
        const { name } = res
        const { lon, lat } = res.coord

        console.log( 'temp --> ', temp)
        console.log('wind speed ---> ', speed)

        $('#city-name').text(name)
        $('#temp').text("Temperature: " + temp + "℉");
        $('#humidity').text("Humidity: " + humidity + "%");
        $('#wind-speed').text("Speed: " + speed + " MPH"); // plus sign concatonates, not commas!
        getUVIndex(lon, lat)
        getForecast(lon, lat)
    });
});

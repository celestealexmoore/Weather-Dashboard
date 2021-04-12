//Made the key a constant variable we need multiple API's & can just reference the variable.
const WEATHER_API_KEY = '37da8c9a08447f616fa749bd4ecfb171'

//display current date at top of div
$("#current-day").text(moment().format("dddd MM/D/YYYY")); 


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
            var forecastBlocksNew = document.querySelectorAll(".forecast-blocks");
    
            for (var i = 0; i < forecastBlocksNew.length; i++){
                var forecastBlocksNew = document.getElementsByClassName("forecast-blocks");
                // Create HTML elements for the forecastBlocks
            
                var blockFutureDates = document.createElement('h5');
                blockFutureDates.classList.add('block-header')
                blockFutureDates.textContent = new Date(data.daily[i].dt * 1000)
                .toLocaleDateString();

                var icon = document.createElement('img');
                icon.setAttribute(
                    'src',
                    `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`
                  );

                var temp = document.createElement('p');
                temp.classList.add('block-text');
                temp.textContent = (`Temperature: ${data.daily[i].temp.day} ℉`);

                var humidity = document.createElement('p');
                humidity.classList.add('block-text');
                humidity.textContent = (`Humidity: ${data.daily[i].humidity} %`);

                var speed = document.createElement('p');
                speed.classList.add('block-text');
                speed.textContent = (`Speed: ${data.daily[i].wind_speed} MPH`);

                // Merge together and put on page
                forecastBlocksNew[i].appendChild(blockFutureDates);
                forecastBlocksNew[i].appendChild(icon);
                forecastBlocksNew[i].appendChild(temp);
                forecastBlocksNew[i].appendChild(humidity);
                forecastBlocksNew[i].appendChild(speed);
            };
        });
    };

//uv index -- This works!

function getUVIndex(lon, lat) {
    fetch(
        `http://api.openweathermap.org/data/2.5/uvi?appid=d91f911bcf2c0f925fb6535547a5ddc9&lat=${lat}&lon=${lon}`
    )
        .then((res) => res.json())
        .then((data) => {
            $('#uvIndex').text("UV Index: " + data.value);
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

//What I did with Tutor.
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

        // const iconCode = res.weather[0].icon;
        //temp, humidity
        const { temp, humidity } = res.main
        //wind speed
        const { speed } = res.wind
        const { name } = res
        const { lon, lat } = res.coord
        const { icon } = `http://openweathermap.org/img/w/${res.weather[0].icon}.png`
    

        console.log( 'temp --> ', temp)
        console.log('wind speed ---> ', speed)

    
        $('#city-name').text(name);
        $('#icon').attr('src', icon);
        $('#temp').text("Temperature: " + temp + "℉");
        $('#humidity').text("Humidity: " + humidity + "%");
        $('#wind-speed').text("Speed: " + speed + " MPH"); // plus sign concatonates, not commas!
        getUVIndex(lon, lat)
        getForecast(lon, lat)
    });
});


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


const handleHistory = (term) => {
    if (existingHistory && existingHistory.length > 0) {
      var existingEntries = JSON.parse(localStorage.getItem('searchHistory'));
      var newHistory = [...existingEntries, term];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      // If there is no history, create one with the searchValue and save it localStorage
    } else {
      historyItems.push(term);
      localStorage.setItem('searchHistory', JSON.stringify(historyItems));
    }
  };


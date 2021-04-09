const WEATHER_API_KEY = '37da8c9a08447f616fa749bd4ecfb171'

// window.addEventListener('load', function () {
//     // Grab the existing history from local storage IF it exists
//     var history;
//     if (!JSON.parse(localStorage.getItem('searchHistory'))) {
//       history = [];
//     } else {
//       history = JSON.parse(localStorage.getItem('searchHistory'));
// }
// var searchHistory = [];

$(document).ready( function () {

    // Function to get the forecast, loop through only the days of the week and render data to the page

    const searchButton = $('#search-button')
    
    searchButton.click(()=> {
        //
        const searchVal = $('#search-bar').val();
        console.log('SEARCH VALUE---> ',searchVal);
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${WEATHER_API_KEY}`


        $.ajax(requestUrl).then(res => {
            console.log('RESPONSE FROM API=> ', res)
            //temp, humiidty
            const { temp, temp_max, temp_min, humidity } = res.main
            //wind speed
            const { speed } = res.wind
            const { name } = res

            console.log( 'temp --> ', temp)
            console.log('wind speed ---> ', speed)

            $('#city-name').text(name)
            
            //Convert Temperature from Kelvin to F

            $('#temp').text("Temperature: " + temp + "℉");
            $('#humidity').text("Humidity: " + humidity + "%") //
            $('#wind-speed').text("Speed: " + speed + " MPH") // plus sign concatonates, not commas!

            //uv index
            // function getUVIndex(lat, lon) {
            //     fetch(
            //       `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=${WEATHER_API_KEY}`
            //     )
            //       .then((res) => res.json())
            //       .then((data) => {
            //         var bodyEl = document.querySelector('.card-body');
            //         var uvEl = document.createElement('p');
            //         uvEl.id = $('#uvIndex');
            //         uvEl.textContent = 'UV Index: ';
            //         var buttonEl = document.createElement('span');
            //         buttonEl.classList.add('btn', 'btn-sm');
            //         buttonEl.innerHTML = data.value;
            
            //         switch (data.value) {
            //           case data.value < 3:
            //             buttonEl.classList.add('btn-success');
            //             break;
            //           case data.value < 7:
            //             buttonEl.classList.add('btn-warning');
            //             break;
            //           default:
            //             buttonEl.classList.add('btn-danger');
            //         }
            
            //         bodyEl.appendChild(uvEl);
            //         uvEl.appendChild(buttonEl);
            //       });
            //   }
            
        })
    })

    //target the input
        //obtain its value
            //use the value to send request to openweather
                //use the response to fill in our html
});


   /* - how to get page to respond by pressing enter. (Create event listener with key-up or key-down, whichever
        is appropriate. Can just type 'ENTER')
    */

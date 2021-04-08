const WEATHER_API_KEY = '37da8c9a08447f616fa749bd4ecfb171'

window.addEventListener('load', function () {
    // Grab the existing history from local storage IF it exists
    var history;
    if (!JSON.parse(localStorage.getItem('searchHistory'))) {
      history = [];
    } else {
      history = JSON.parse(localStorage.getItem('searchHistory'));
}
var searchHistory = [];

$(document).ready( function () {
    
        
    //click listener -> search button
    // get the search button
    //add the click handler
    //write that function
        

    // Function to get the forecast, loop through only the days of the week and render data to the page

    const searchButton = $('#search-button')
    
    searchButton.click(()=> {
        //
        const searchVal = $('#search-bar').val();
        console.log('SEARCH VALUE---> ',searchVal);
        const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${WEATHER_API_KEY}`

        $.ajax(requestUrl).then(res => {
            console.log('RESPONSE FROM API=> ',res)
            //temp, humiidty
            const { temp, temp_max, temp_min, humidity } = res.main
            //wind speed
            const { speed } = res.wind
            const { name } = res

            console.log( 'temp --> ', temp)
            console.log('wind speed ---> ', speed)

            $('#city-name').text(name)
            $('#temp').text(temp, "℉")

            // function temperatureConverter(tempNum) {
            //     tempNum = $('#temp').text;
            //     ("outputCelsius").innerHTML = (valNum-32) / 1.8;
            //   }
            
            $('#humidity').text("Humidity: " + humidity + "%") //
            $('#wind-speed').text("Speed: " speed + " MPH") // plus sign concatonates, not commas!
            $('#uvIndex').text(name)
        

            //uv index
        })
    })

    //target the input
        //obtain its value
            //use the value to send request to openweather
                //use the response to fill in our html
})});

/* - Help with turning Kelvin into Fahrenheit, (use different API)

    - help with the uvIndex (Will come with different API)

    - how to get page to respond by pressing enter. (Create event listener with key-up or key-down, whichever
        is appropriate. Can just type 'ENTER')
    */

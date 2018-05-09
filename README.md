# Weather Forecast

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This project uses geolocation to fetch weather forecast.

After requesting weather forecast, application sends request to external API to gather location of current user's IP address. Then, with usage of latitude and longitude values, it sends another request to another API, but this time for actual weather forecast in designated location.

It is possible to change display of temperature between Celsius and Fahrenheit scales.

Application uses fetch API to send requests. Responses are converted into JSON format.

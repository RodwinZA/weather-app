const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile("./index.html", {root: __dirname});
});

app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = // your openweather api key
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;

    https.get(url, (response) => {
        console.log(response);

        response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<h1>The weather is currently " + weatherDescription + ".");
        res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>.");
        res.write("<img src=" + imageUrl +">");
        res.send();
        });

    });
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});

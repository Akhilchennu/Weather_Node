const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const app_id = '12dd05c446f6061e6c1e69b3022a3902'

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const fetchData=async (city)=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${app_id}`
    // const data= await fetch(url);
    // return await data;   
    // const dataValue=await data.then( res => { return res.json()});  
    // return data;
    const data=await fetch(url).then( res => { return res.json()});
    return data;
}

app.post('/getWeatherUpdate',async (req,res)=>{
    const weatherData = req.body.weatherData;
    const promiseValue=weatherData.map(async (data)=>{
        const cityData=await fetchData(data);
        return cityData; 
    })
   const responseData=await Promise.all(promiseValue);
    res.send({ success: true, weather: responseData })
})


// app.post('/getWeatherUpdates',async (req, res) => {
//     const weatherData = req.body.weatherData;
//     debugger
//     if (Array.isArray(weatherData) && weatherData.length > 0) {
//         let responseData = [];
//         await weatherData.forEach(async (city) => {
//             const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${app_id}`
//              fetch(url).then(res => res.json())
//                 .then(body => {
//                     responseData.push(body);
//                     if (responseData.length === weatherData.length) {
//                         res.send({ success: true, weather: responseData });
//                     }
//                 }).catch((error) => { res.send({ success: false }) });
//         });
//         //  res.send({ success: true, weather: getData(weatherData) });

//     } else {
//         res.send({ success: false });
//     }

// })

app.listen(3002, () => {
    console.log('server listening at 3003');
})

const express = require('express');

const app = express();

const {config} = require('./config/index')

app.get('/', (req, res)=> {
    res.send('Hello world')
})

app.get('/json', (req, res)=> {
    res.json({Hello : 'world'})
})

app.listen(config.port, ()=>{
    console.log(`Listening http://localhost:${config.port}`)
})

//------------------------Challenge

app.get('/:anho', (req, res) => {
    let anho = req.params.anho
    if (((anho % 4) === 0 && (anho % 100) > 0) || anho % 400 === 0){
        res.send("Es año bisiesto")
    }else {
        res.send("No es año bisiesto")
    }
})


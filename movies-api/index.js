const express = require('express');
const cors = require('cors');
// const slash = require('slash')
const app = express();

const {config} = require('./config/index')
const authApi = require('./routes/auth')
const moviesApi = require('./routes/movies');
const userMoviesApi = require('./routes/userMovies')
const {logErrors, errorHandler, wrapErrors} = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')
//Middleware de Cross-Origin Resource Sharing
app.use(cors())

//Declaración de uso estricto del ruteo
app.enable('strict routing')
// middleware body parser
app.use(express.json());

//Routes
authApi(app)
moviesApi(app);
userMoviesApi(app)
//Middleware de Slash para setear como se determina la url del usuario.
// app.use(slash())

//middleware catch 404 
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors)
app.use(errorHandler);

app.listen(config.port, ()=>{
    console.log(`Listening http://localhost:${config.port}`)
})



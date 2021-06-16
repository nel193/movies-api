const express = require('express');
const passport = require('passport')
const MoviesService = require('../services/movies')
const validationHandler = require('../utils/middleware/validationHandler')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')
const {
    movieIdSchema,
    createMovieSchema,
    updateMovieSchema
} = require('../utils/schemas/movies.js')

const cacheResponse = require('../utils/cacheResponse.js')
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time.js')
// JWT strategy
require('../utils/auth/strategies/jwt')

function moviesApi(app){
    const router = express.Router({
        caseSensitive   : app.get('case sensitive routing'),
        strict          : app.get('strict routing')
    });
    app.use('/api/movies', router)

    const moviesService = new MoviesService()

    router.get('/',
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['read:movies']),
    async(req, res, next) => {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
        const {tags} = req.query;
        try{
            const movies = await moviesService.getMovies({tags})
            // throw new Error ('Fatal error getting movies')
            res.status(200).json({
                data: movies,
                message: 'movies listed'
            })
        }catch(err){
            next(err)
        }
    });

    router.get('/:movieId', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['read:movies']),
    validationHandler({movieId: movieIdSchema}, 'params'), 
    async(req, res, next) => {
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
        const {movieId} = req.params;

        try{
            const movies = await moviesService.getMovie({movieId})

            res.status(200).json({
                data: movies,
                message: 'movie retrieved'
            })
        }catch(err){
            next(err)
        }
    });

    router.post('/', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['create:movies']),
    validationHandler(createMovieSchema), 
    async(req, res, next) => {
        const {body: movie} = req

        try{
            const createdMovieId = await moviesService.createMovie({movie})

            res.status(201).json({
                data: createdMovieId,
                message: 'movie created'
            })
        }catch(err){
            next(err)
        }
    });

    router.put('/:movieId', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['update:movies']),
    validationHandler({ movieId: movieIdSchema }, 'params'), 
    validationHandler(updateMovieSchema), async(req, res, next) => {
        const {movieId} = req.params;
        const {body: movie} = req

        try{
            const updatedMovieId = await moviesService.updateMovie({
                movieId,
                movie
            })

            res.status(200).json({
                data: updatedMovieId,
                message: 'movie updated'
            })
        }catch(err){
            next(err)
        }
    });

    router.patch('/:movieId', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['update:movies']),
    async(req, res, next) => {
        const {movieId} = req.params.movieId;
        const {body: movie} = req

        try{
            const editedMovieId = await moviesService.editMovie({
                movieId,
                movie
                })

            res.status(200).json({
                data: editedMovieId,
                message: 'movie edited'
            })
        }catch(err){
            next(err)
        }
    });

    router.delete('/:movieId', 
    passport.authenticate('jwt', {session: false}),
    scopesValidationHandler(['delete:movies']),
    validationHandler({ movieId: movieIdSchema }, 'params'),  async(req, res, next) => {
        const {movieId} = req.params;
        try{
            const deleteMovieId = await moviesService.deleteMovie({movieId})

            res.status(200).json({
                data: deleteMovieId,
                message: 'movies was deleted'
            })
        }catch(err){
            next(err)
        }
    });

    
}

module.exports = moviesApi;
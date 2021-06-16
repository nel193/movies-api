const assert = require('assert');
const proxyquire = require('proxyquire')
const debug = require('debug')('app:db')

const { 
    MongoLibMock, 
    getAllStub, 
    getStub, 
    createStub,
    updateStub,
    editStub,
    deleteStub
    } = require('../utils/mocks/mongoLib')

const { moviesMock} = require('../utils/mocks/movies')

describe('services - movies', function(){
    const MoviesServices = proxyquire('../services/movies', {
        '../lib/mongo' : MongoLibMock
    })

    const moviesService = new MoviesServices()

    let movieId = moviesMock[1].id
    let newMovie = moviesMock[0]
    delete newMovie.id
    describe('When getMovies method its called', async function(){
        it('Should call the getAll MongoLib method', async function(){
            await moviesService.getMovies({});
            assert.deepStrictEqual(getAllStub.called, true);
        })
        it('Should return an array of movies', async function(){
            const result = await moviesService.getMovies({});
            const expected = moviesMock;
            
            assert.deepStrictEqual(result, expected)
        })
    })

    describe('When getMovie method its called', async function(){
        it('This should call the get MongoLib method', async function(){
            await moviesService.getMovie(movieId);
            assert.deepStrictEqual(getStub.called, true)
        })
        it('This should return a specific movie', async function(){
            const result = await moviesService.getMovie({movieId});
            const expected = moviesMock[1]
            assert.deepStrictEqual(result, expected)
        })
    })

    describe('When createMovie method its called', async function(){
        it('This should call the create MongoLib method', async function(){
            await moviesService.createMovie(newMovie);
            assert.deepStrictEqual(createStub.called, true)
        })
        it('This should return a created movie', async function(){
            const result = await moviesService.createMovie(newMovie);
            moviesMock[0].id = 'd2a4a062-d256-41bb-b1b2-9d915af6b75e'
            const expected = moviesMock[0].id
            
            assert.deepStrictEqual(result, expected)
        })
    })

    describe('When updateMovie method its called', async function(){
        it('This should call the update MongoLib method', async function(){
            await moviesService.updateMovie({ movieId, title : 'Nuevo titulo' })
            assert.deepStrictEqual(updateStub.called, true)
        })
        it('This should return a updated movie', async function(){
            const result = await moviesService.updateMovie({ movieId, 'title' : 'Nuevo titulo' });
            const expected = moviesMock[1].title
            assert.deepStrictEqual(result, expected)
        })
    })

    describe('When editMovie method its called', async function(){
        it('This should call the edit MongoLib method', async function(){
            await moviesService.editMovie({ movieId, title : 'Nuevo titulo' })
            assert.deepStrictEqual(editStub.called, true)
        })
        it('This should return a edited movie', async function(){
            const result = await moviesService.editMovie({ movieId, 'title' : 'Nuevo titulo'});
            const expected = moviesMock[1].title
            assert.deepStrictEqual(result, expected)
        })
    })

    describe('When deleteMovie method its called', async function (){
        it('This should call the delete MongoLib method', async function(){
            await moviesService.deleteMovie({ movieId })
            assert.deepStrictEqual(deleteStub.called, true)
        })
        it('This should delete the movie', async function (){
            const result = await moviesService.deleteMovie({ movieId })
            setTimeout(()=>{
                return expected = moviesMock[1]
                console.log('Este fue el result ' + result)
                console.log('Este fue el esperado ' + expected)
                assert.deepStrictEqual(result, expected)
            },500)
        })
    })
    
})


const assert = require ('assert');
const proxyquire = require('proxyquire');
const debug = require('debug')('app:server');
const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js');
const testServer = require('../utils/testServer.js');

describe('routes - movies', function () {
    const route = proxyquire ('../routes/movies', {
        //En esta configuración es donde proxyquire hace el reemplazo de servicios
        '../services/movies' : MoviesServiceMock
    })

    const request = testServer(route);
    let id = moviesMock[0].id

    describe('GET - movies', function() {
        it('This should response with a 200 status code', function(done){
            request.get('/api/movies').expect(200, done)
        });

        it('This should response with a list of movies', function(done){
            request.get('/api/movies').end((err, res)=> {
            //Aquì assert con el metodo deepStrictEqual compara los objetos que pasemos por parametros
                assert.deepStrictEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                })
                done()
            })
        })
    })
    describe('GET - movie', function () {
        it('This should response with an exact movie', function (done){
            request.get(`/api/movies/${id}`)
                .expect(200)
                .end((err, res) => {
                        assert.deepStrictEqual(res.body, {
                        data: moviesMock[0],
                        message: 'movie retrieved'
                    })
                    done(err)
                })
        })
    })

    describe('POST - movie', function (){
        it('This should return whit a movie created', function(done){
            let newMovie = moviesMock[0]
            delete newMovie.id
            request.post('/api/movies')
                .send(newMovie)
                .expect(201)
                .end((err,res)=>{
                    done(err)
                })
        })
    })

    describe('PUT - movie', function(){
        it('This should return with a movie updated', function(done){
            request.put(`/api/movies/${id}`)
                .send({
                    'title': 'editado'
                })
                .expect(200)
                .end((err, res)=>{
                    done(err)
                })
        })
    })
    describe('PATCH - movie', function(){
        it('This should return a movie patched', function(done){
            request.patch(`/api/movies/${id}`)
                .send({
                    'title':'Actualizado'
                })
                .expect(200, done)
        })
    })
    describe('DELETE - movie', function(){
        it('This should return a movie deleted', function(done){
            request.delete(`/api/movies/${id}`)
                .expect(200, done)
        })
    })

})

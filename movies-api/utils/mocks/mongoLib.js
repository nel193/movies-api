const sinon = require ('sinon');
const debug = require('debug')('app:error')
const {
    moviesMock, 
    filteredMoviesMock,
    updatedMoviesMock,
    deleteMoviesMock
    } = require ('./movies')

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const getStub = sinon.stub().resolves(moviesMock[1]);
const movieId= moviesMock[1].id

const createStub = sinon.stub().resolves(moviesMock[0].id);

const updateStub = sinon.stub().resolves(updatedMoviesMock('Nuevo titulo'))

const editStub = sinon.stub().resolves(updatedMoviesMock('Nuevo titulo'))

const deleteStub = sinon.stub().resolves(deleteMoviesMock(moviesMock[1]))

class MongoLibMock {
    getAll(collection, query){
        return getAllStub(collection, query);
    };
    get(collection, movieId){
        return getStub(collection, movieId)
    }
    create(collection, data){
        return createStub(collection, data)
    };
    update(collection, movieId, data){
        return updateStub(collection, movieId, data)
    }
    edit(collection, movieId, data){
        return editStub(collection, movieId, data)
    }
    delete(collection, movieId){
        return deleteStub(collection, movieId)
    }
}

module.exports = {
    getAllStub,
    getStub,
    createStub,
    updateStub,
    editStub,
    deleteStub,
    MongoLibMock
}
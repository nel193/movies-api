const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

//el .only obliga a que solo se realice este test
describe('utils - buildMessage', function(){
    describe('When receives an entity and an action', function () {
        it('should return the respective message', function (){
            const result = buildMessage('movie', 'create');
            const expect = 'movie created';
            assert.deepStrictEqual(result, expect);
        })
    })

    describe('When receives an entity and an action wich its a listed', function(){
        it('Should return the respective message', function() {
            const result = buildMessage('movie', 'list');
            const expect = 'movies listed';
            assert.deepStrictEqual(result, expect);
        })
    })
})
import { HomeController } from './home';
import { suite, test, slow, timeout } from 'mocha-typescript';
import { expect, assert } from 'chai';

@suite('Basic test')
class TestClass {

    @test('True should be true')
    fooTest() {
        expect(true).to.equal(true);
    }

    @test
    barTest() {
        assert.equal(true, true);
    }
}


import {expect} from 'chai';
import 'aurelia-polyfills';
import {PragmaScatterchart} from './../../../src/components/pragma-scatterchart/pragma-scatterchart';

describe('PragmaScatterchart Tests', function() {
    let pragmaScatterchart;

    beforeEach(function() {
        pragmaScatterchart = new PragmaScatterchart ({});
    });
    
    it('constructor', function() {
        expect(pragmaScatterchart).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => PragmaScatterchart()).to.throw("Cannot call a class as a function");
    });    
})

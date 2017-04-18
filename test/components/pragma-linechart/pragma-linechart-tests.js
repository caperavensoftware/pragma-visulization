
import {expect} from 'chai';
import 'aurelia-polyfills';
import {PragmaLinechart} from './../../../src/components/pragma-linechart/pragma-linechart';

describe('PragmaLinechart Tests', function() {
    let pragmaLinechart;

    beforeEach(function() {
        pragmaLinechart = new PragmaLinechart ({});
    });
    
    it('constructor', function() {
        expect(pragmaLinechart).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => PragmaLinechart()).to.throw("Cannot call a class as a function");
    });    
})

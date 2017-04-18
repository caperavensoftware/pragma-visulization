
import {expect} from 'chai';
import 'aurelia-polyfills';
import {PragmaChartbase} from './../../src/components/pragma-chartbase';

describe('PragmaChartbase Tests', function() {
    let pragmaChartbase;

    beforeEach(function() {
        pragmaChartbase = new PragmaChartbase ();
    });
    
    it('constructor', function() {
        expect(pragmaChartbase).to.not.be.null;
    });
    
    it('not constructor', function() {
        expect(() => PragmaChartbase()).to.throw("Cannot call a class as a function");
    });    
})

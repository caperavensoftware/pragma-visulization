import {expect, assert} from 'chai';
import {PragmaBarchart} from './../../../src/components/pragma-barchart/pragma-barchart';
import {ElementMockup} from './../../mockups/element-mockup';

describe('PragmaBarchart Tests', function() {
    let instance;
    let element;

    beforeEach(function() {
        element = new ElementMockup();
        instance = new PragmaBarchart(element);
    });

    it('constructor', function() {
        expect(instance).to.not.be.null;
    });

    it('not constructor', function() {
        expect(() => PragmaBarchart()).to.throw("Cannot call a class as a function");
    });
});
import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';
import {PragmaChartbase, axisType} from './../pragma-chartbase';

@customElement('pragma-scatterchart')
@inject(Element)
export class PragmaScatterchart extends PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfYTicks;
    @bindable numberOfXTicks;
    @bindable xLabelRotation;
    @bindable xTextAnchor;
    @bindable yLabelRotation;
    @bindable yTextAnchor;
    @bindable marginTop;
    @bindable marginBottom;
    @bindable marginLeft;

    constructor(element) {
        super(element);
        this.xAxisType = axisType.timeline;
        this.xLabelFormatter = d3.timeFormat("%B %d, %Y");
    }

    update() {
        super.update();
        const chart = this;
    }
}

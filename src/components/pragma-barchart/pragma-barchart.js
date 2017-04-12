import {customElement, inject, bindable} from 'aurelia-framework';

import * as d3 from 'd3';

@customElement('pragma-barchart')
@inject(Element)
export class PragmaBarchart {
    @bindable data;
    @bindable xField;
    @bindable yField;

    constructor(element) {
        this.element = element;

        this.margins = {
            top: 10,
            right: 0,
            bottom: 10,
            left: 0,
            innerPadding: 0.2,
            outerPadding: 0.2
        };

        this.createRectHandler = this.createRect.bind(this);
    }

    attached() {
        this.selection = d3.select(this.element).select(".chart-container");
        this.bounds = this.element.getBoundingClientRect();

        this.initialize();
    }

    detached() {
        this.selection = null;
        this.dispose();

        this.createRectHandler = null;
    }

    initialize() {
        if (!this.data) {
            return;
        }

        this.initializeScale();
        this.drawChart();
    }

    initializeScale() {
        const mappedYValues = this.data.map((item) => item[this.yField]);
        const mappedXValues = this.data.map((item) => item[this.xField]);

        // Set up pixel range
        const xRange = [this.margins.left, this.bounds.width - this.margins.right];
        const yRange = [this.margins.top, this.bounds.height - this.margins.bottom - this.margins.top];

        // // Set up data range for min and max values
        // const xDomain = d3.range(0, this.data.length);  // how many items are we drawing?
        // const yDomain = d3.extent(mappedYValues);    // what is the min and max y values we are plotting?

        // http://d3indepth.com/scales/
        this.scaleX = d3.scaleBand()
            .domain(mappedXValues)
            .range(xRange)
            .paddingInner(this.margins.innerPadding)
            .paddingOuter(this.margins.outerPadding);

        this.scaleY = d3.scaleLinear()
            .domain(d3.extent(mappedYValues))
            .range(yRange);
    }

    drawChart() {
        this.selection
            .selectAll('rect')
            .data(this.data)
            .enter()
            .call(this.createRectHandler)
    }

    getDataHeight(chart, data) {
        return chart.scaleY(data[chart.yField]);
    }

    getDataY(chart, data) {
        return chart.bounds.height - chart.margins.bottom - chart.scaleY(data[chart.yField]);
    }

    createRect(selection) {
        const chart = this;

        selection.append('rect')
            .style("fill", "steelblue")
            .attr("height", (d) => {
                return chart.getDataHeight(chart, d);
            })
            .attr("width", chart.scaleX.bandwidth())
            .attr("x", (d, i) => {
                return chart.scaleX(d[chart.xField]);
            })
            .attr("y", (d) => {
                return chart.getDataY(chart, d)
            })
    }
}
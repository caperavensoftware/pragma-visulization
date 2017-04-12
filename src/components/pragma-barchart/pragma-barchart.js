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
            right: 10,
            bottom: 10,
            left: 10
        }

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
        const mappedDataValues = this.data.map((item) => item[this.yField]);

        // Set up pixel range
        const xRange = [this.margins.left, this.bounds.width - this.margins.right];
        const yRange = [this.margins.top, this.bounds.height - this.margins.bottom - this.margins.top];

        // // Set up data range for min and max values
        // const xDomain = d3.range(0, this.data.length);  // how many items are we drawing?
        // const yDomain = d3.extent(mappedDataValues);    // what is the min and max y values we are plotting?

        // http://d3indepth.com/scales/
        this.scaleX = d3.scaleOrdinal()
            .domain([0, this.data.length])
            .range([xRange, 0.3, 0.3]);

        this.scaleY = d3.scaleLinear()
            .domain(d3.extent(mappedDataValues))
            .range(yRange);
    }

    drawChart() {
        this.selection
            .selectAll('rect')
            .data(this.data)
            .enter()
            .call(this.createRectHandler)
    }

    createRect(selection) {
        const chart = this;

        selection.append('rect')
            .style("fill", "steelblue")
            .attr("height", (d) => {
                return chart.scaleY(d[chart.yField]) + "px";
            })
            .attr("width", "10px")
            .attr("x", (d, i) => {
                return i * 10 + 2 + "px"
            })
            .attr("y", (d) => {
                return chart.bounds.height - chart.margins.bottom - chart.scaleY(d[chart.yField]) + "px"
            })
    }
}
import {customElement, inject, bindable} from 'aurelia-framework';

import * as d3 from 'd3';

@customElement('pragma-barchart')
@inject(Element)
export class PragmaBarchart {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfTicks;

    constructor(element) {
        this.element = element;

        this.margins = {
            left: 40,
            top: 20,
            bottom: 40
        };

        this.numberOfTicks = 5;
    }

    attached() {
        this.svg = d3.select(this.element).select(".chart-container");
        this.bounds = this.element.getBoundingClientRect();

        this.initialize();
        this.drawXAxis();
        this.drawYAxis();
        this.drawChartArea();
    }

    initialize() {
        const mappedYValues = [0].concat(this.data.map((item) => item[this.yField]));
        const mappedXValues = this.data.map((item) => item[this.xField]);

        this.scaleX = d3.scaleBand()
            .domain(mappedXValues)
            .range([this.margins.left, this.bounds.width])
            .paddingOuter(0.2)
            .paddingInner(0.2);

        this.scaleY = d3.scaleLinear()
            .domain(d3.extent(mappedYValues))
            .range([this.bounds.height - this.margins.top - this.margins.bottom, 0]);
    }

    drawXAxis() {
        const xAxis = d3.axisBottom(this.scaleX);
        const yPosition = this.bounds.height - this.margins.bottom;

        this.svg.append("g")
            .attr("transform", `translate(0, ${yPosition})`)
            .call(xAxis);
    }

    drawYAxis() {
        const yAxis = d3.axisLeft(this.scaleY).ticks(this.numberOfTicks);
        const leftMargin = this.margins.left;
        const topMargin = this.margins.top;

        this.svg.append("g")
            .attr("transform", `translate(${leftMargin}, ${topMargin})`)
            .call(yAxis)
    }

    drawChartArea() {
        const chart = this;

        this.svg.selectAll("rect")
            .data(this.data)
            .enter()
            .append("rect")
            .style("fill", "steelblue")
            .attr("height", data => {
                return chart.getBarHeight(chart, data);
            })
            .attr("y", data => {
                return chart.getBarY(chart, data);
            })
            .attr("width", chart.scaleX.bandwidth())
            .attr("x", (data) => {
                return chart.scaleX(data[chart.xField]);
            })
    }

    getBarHeight(chart, data) {
        return (chart.scaleY(0) - chart.scaleY(data[chart.yField]));
    }

    getBarY(chart, data) {
        return chart.scaleY(data[chart.yField]) + chart.margins.top;
    }

    detached() {
        this.selection = null;
        this.bounds = null;
    }
}
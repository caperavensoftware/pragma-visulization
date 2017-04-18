import {inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@inject(Element)
export class PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfYTicks;
    @bindable numberOfXTicks;

    element;
    svg;
    bounds;
    xAxis;
    yAxis;
    scaleX;
    scaleY;

    xAxisType;
    xLabelFormatter;

    constructor(element) {
        this.element = element;

        this.margins = {
            left: 40,
            top: 20,
            bottom: 40
        };

        this.animationDuration = 500;
        this.animationDelay = 100;
        this.xAxisType = axisType.standard;
    }

    attached() {
        this.svg = d3.select(this.element).select(".chart-container");
        this.bounds = this.element.getBoundingClientRect();

        this.initialize();
        this.drawInitialAxis();
        this.update();
    }

    detached() {
        this.bounds = null;
        this.svg = null;
        this.bounds = null;
        this.xAxis = null;
        this.yAxis = null;
        this.scaleX = null;
        this.scaleY = null;
    }

    initialize() {
        if (this.yField) {
            const mappedYValues = [0].concat(this.data.map((item) => item[this.yField]));

            this.scaleY = d3.scaleLinear()
                .domain(d3.extent(mappedYValues))
                .range([this.bounds.height - this.margins.top - this.margins.bottom, 0]);

            this.yAxis = d3.axisLeft(this.scaleY);

            if (this.numberOfYTicks) {
                this.yAxis.ticks(this.numberOfYTicks);
            }
        }

        this.initializeXAxis();
    }

    initializeXAxis() {
        const mappedXValues = this.data.map((item) => item[this.xField]);

        if (this.xAxisType === axisType.standard && this.xField) {
            this.scaleX = d3.scaleBand()
                .domain(mappedXValues)
                .range([this.margins.left, this.bounds.width])
                .paddingOuter(0.2)
                .paddingInner(0.2);
        }
        else {
            this.scaleX = d3.scaleTime()
                .domain(mappedXValues)
                .range([this.margins.left, this.bounds.width])
        }

        this.xAxis = d3.axisBottom(this.scaleX);

        if (this.numberOfXTicks) {
            this.xAxis.ticks(this.numberOfXTicks);
        }

        if (this.xLabelFormatter) {
            this.xAxis.tickFormat(this.xLabelFormatter);
        }
    }

    drawInitialAxis() {
        const yPosition = this.bounds.height - this.margins.bottom;

        if (this.xAxis) {
            this.svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", `translate(0, ${yPosition})`)
                .call(this.xAxis);
        }

        if (this.yAxis) {
            this.svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", `translate(${this.margins.left}, ${this.margins.top})`)
                .call(this.yAxis)
        }
    }

    // override this with your updates
    update() {
        this.initialize();

        if (this.xAxis) {
            this.svg.select(".x-axis")
                .transition()
                .duration(this.animationDuration)
                .call(this.xAxis);
        }

        if (this.yAxis) {
            this.svg.select(".y-axis")
                .transition()
                .duration(this.animationDuration)
                .call(this.yAxis);
        }
    }
}

export const axisType = {
    standard: 0,
    timeline: 1
};

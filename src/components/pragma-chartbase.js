import {inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@inject(Element)
export class PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfYTicks;
    @bindable numberOfXTicks;
    @bindable marginTop;
    @bindable marginBottom;
    @bindable marginLeft;

    element;
    svg;
    bounds;
    xAxis;
    yAxis;
    scaleX;
    scaleY;

    xAxisType;
    xLabelFormatter;
    @bindable xLabelRotation;
    @bindable xTextAnchor;

    @bindable yLabelRotation;
    @bindable yTextAnchor;

    constructor(element) {
        this.element = element;

        this.marginLeft = 40;
        this.marginTop = 20;
        this.marginBottom = 40;

        this.animationDuration = 500;
        this.animationDelay = 100;
        this.xAxisType = axisType.standard;
        this.textAnchor = "end";
    }

    attached() {
        this.svg = d3.select(this.element).select(".chart-container");
        this.bounds = this.element.getBoundingClientRect();

        this.initializeBackground();
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
        this.initializeYAxis();
        this.initializeXAxis();
    }

    initializeBackground() {
        this.svg
            .append('rect')
            .attr("x", this.marginLeft)
            .attr("y", this.marginTop)
            .attr("width", this.bounds.width - this.marginLeft)
            .attr("height", this.bounds.height - this.marginBottom - this.marginTop)
            .attr("class", "chart-background")
    }

    initializeYAxis() {
        if (this.yField) {
            const mappedYValues = [0].concat(this.data.map((item) => item[this.yField]));

            this.scaleY = d3.scaleLinear()
                .domain(d3.extent(mappedYValues))
                .range([this.bounds.height - this.marginTop - this.marginBottom, 0]);

            this.yAxis = d3.axisLeft(this.scaleY);

            if (this.numberOfYTicks) {
                this.yAxis.ticks([this.numberOfYTicks]);
            }
        }
    }

    initializeXAxis() {
        const mappedXValues = this.data.map((item) => item[this.xField]);

        if (this.xAxisType === axisType.standard && this.xField) {
            this.scaleX = d3.scaleBand()
                .domain(mappedXValues)
                .range([this.marginLeft, this.bounds.width])
                .paddingOuter(0.2)
                .paddingInner(0.2);
        }
        else {
            this.scaleX = d3.scaleTime()
                .domain(d3.extent(mappedXValues))
                .range([this.marginLeft, this.bounds.width])
        }

        this.xAxis = d3.axisBottom(this.scaleX);

        if (this.numberOfXTicks) {
            this.xAxis.ticks([this.numberOfXTicks]);
        }

        if (this.xLabelFormatter) {
            this.xAxis.tickFormat(this.xLabelFormatter);
        }
    }

    drawInitialAxis() {
        const yPosition = this.bounds.height - this.marginBottom;

        if (this.xAxis) {
            this.svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", _ => {
                    return `translate(0, ${yPosition})`;
                })
                .call(this.xAxis);
        }

        if (this.xLabelRotation) {
            this.svg.selectAll('.x-axis text')
                .attr("text-anchor", this.xTextAnchor)
                .attr("transform", `rotate(${this.xLabelRotation})`);
        }

        if (this.yAxis) {
            this.svg.append("g")
                .attr("class", "y-axis")
                .attr("transform", `translate(${this.marginLeft}, ${this.marginTop})`)
                .call(this.yAxis)
        }

        if (this.yLabelRotation) {
            this.svg.selectAll('.y-axis text')
                .attr("text-anchor", this.yTextAnchor)
                .attr("transform", `rotate(${this.yLabelRotation})`);
        }
    }

    update() {
        this.initialize();

        if (this.xAxis) {
            this.svg.select(".x-axis")
                .transition()
                .duration(this.animationDuration)
                .call(this.xAxis);

            if (this.xLabelRotation) {
                this.svg.selectAll('.x-axis text')
                    .attr("text-anchor", this.xTextAnchor)
                    .attr("transform", `rotate(${this.xLabelRotation})`);
            }
        }

        if (this.yAxis) {
            this.svg.select(".y-axis")
                .transition()
                .duration(this.animationDuration)
                .call(this.yAxis);

            if (this.yLabelRotation) {
                this.svg.selectAll('.y-axis text')
                    .attr("text-anchor", this.yTextAnchor)
                    .attr("transform", `rotate(${this.yLabelRotation})`);
            }
        }
    }
}

export const axisType = {
    standard: 0,
    timeline: 1
};

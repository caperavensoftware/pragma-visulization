import {inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@inject(Element)
export class PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfTicks;

    element;
    svg;
    bounds;
    xAxis;
    yAxis;
    scaleX;
    scaleY;

    constructor(element) {
        this.element = element;

        this.margins = {
            left: 40,
            top: 20,
            bottom: 40
        };

        this.numberOfTicks = 5;
        this.animationDuration = 500;
        this.animationDelay = 100;
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

        this.xAxis = d3.axisBottom(this.scaleX);
        this.yAxis = d3.axisLeft(this.scaleY).ticks(this.numberOfTicks);
    }

    drawInitialAxis() {
        const yPosition = this.bounds.height - this.margins.bottom;

        this.svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0, ${yPosition})`)
            .call(this.xAxis);

        this.svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${this.margins.left}, ${this.margins.top})`)
            .call(this.yAxis)
    }

    // override this with your updates
    update() {
        this.initialize();

        this.svg.select(".x-axis")
            .transition()
            .duration(this.animationDuration)
            .call(this.xAxis);

        this.svg.select(".y-axis")
            .transition()
            .duration(this.animationDuration)
            .call(this.yAxis);
    }
}

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

    update() {
        this.initialize();
        const chart = this;

        this.svg.select(".x-axis")
            .transition()
            .duration(this.animationDuration)
            .call(this.xAxis);

        this.svg.select(".y-axis")
            .transition()
            .duration(this.animationDuration)
            .call(this.yAxis);

        const dataJoin = this.svg.selectAll("rect")
            .data(this.data);

        const enter = dataJoin
            .enter()
                .append("rect")
                .style("fill", "steelblue")
                .attr("x", (data) => {
                    return chart.scaleX(data[chart.xField]);
                })
                .attr("width", chart.scaleX.bandwidth())
                .attr("y", chart.bounds.height - chart.margins.bottom)
                .attr("height", 0)
                .transition()
                .duration(this.animationDuration)
                .delay((d, i) => {
                    return i * this.animationDelay;
                })
                .attr("height", data => {
                    return chart.getBarHeight(chart, data);
                })
                .attr("y", data => {
                    return chart.getBarY(chart, data);
                });

        dataJoin
            .merge(enter)
                .transition()
                .duration(this.animationDuration)
                .delay((d, i) => {
                    return i * this.animationDelay;
                })
                .attr("height", data => {
                    return chart.getBarHeight(chart, data);
                })
                .attr("y", data => {
                    return chart.getBarY(chart, data);
                })
                .attr("x", (data) => {
                    return chart.scaleX(data[chart.xField]);
                })
                .attr("width", chart.scaleX.bandwidth());

        dataJoin
            .exit()
                .transition()
                .duration(this.animationDuration)
                .attr("height", 0)
                .attr("y", chart.bounds.height - chart.margins.bottom)
                .remove();
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
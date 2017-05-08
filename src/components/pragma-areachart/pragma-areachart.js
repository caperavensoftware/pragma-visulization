import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@customElement('pragma-areachart')
@inject(Element)
export class PragmaAreachart {

    @bindable data;
    element;
    bounds;

    constructor(element) {
        this.element = element;
    }

    attached() {
        this.update();
    }

    detached() {
        this.data = null;
        this.bounds = null;
    }

     update() {
        
        var svg = d3.select(this.element).select(".chart-container"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom;

        var parseDate = d3.timeParse("%Y %b %d");

        var x = d3.scaleTime().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            z = d3.scaleOrdinal(d3.schemeCategory20c);

        var stack = d3.stack();

        var area = d3.area()
            .x(function(d, i) { return x(d.data.date); })
            .y0(function(d) { return y(d[0]/100); })
            .y1(function(d) { return y(d[1]/100); });

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var keys = [ "InProgress", "AwaitingApproval", "Approved", "Closed", "Cancelled" ].slice(); //this.data.columns.slice(1);

        x.domain(d3.extent(this.data, function(d) { return d.date; }));
        z.domain(keys);
        stack.keys(keys);

        var layer = g.selectAll(".layer")
            .data(stack(this.data))
            .enter().append("g")
            .attr("class", "layer");

        layer.append("path")
            .attr("class", "area")
            .style("fill", function(d) { return z(d.key); })
            .attr("d", area);

        layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
            .append("text")
            .attr("x", width - 10)
            .attr("y", function(d) { return y(((d[d.length - 1][0] / 100) + (d[d.length - 1][1] / 100)) / 2); })
            .attr("dy", ".35em")
            .style("font", "10px sans-serif")
            .style("text-anchor", "end")
            .text(function(d) { return d.key; });

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10, "%"));
        
    }
}
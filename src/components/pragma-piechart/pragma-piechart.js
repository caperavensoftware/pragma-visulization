import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@customElement('pragma-piechart')
@inject(Element)
export class PragmaPiechart {

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
        width = +svg.attr("width"),
        height = +svg.attr("height"),
        radius = Math.min(width, height) / 2,
        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var pie = d3.pie()
            .sort(null)
            .value(function(d) { return d.value; });

        var path = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var label = d3.arc()
            .outerRadius(radius - 40)
            .innerRadius(radius - 40);

        var arc = g.selectAll(".arc")
            .data(pie(this.data))
            .enter().append("g")
            .attr("class", "arc");

        arc.append("path")
            .attr("d", path)
            .attr("fill", function(d, i) { return color(i); });

        arc.append("text")
            .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
            .text(function(d) { return d.data.title; });
     }
}
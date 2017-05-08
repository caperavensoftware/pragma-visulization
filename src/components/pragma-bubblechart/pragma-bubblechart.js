import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';

@customElement('pragma-bubblechart')
@inject(Element)
export class PragmaBubblechart {

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
        height = +svg.attr("height");

        var format = d3.format(",d");

        var color = d3.scaleOrdinal(d3.schemeCategory20b);

        var pack = d3.pack()
            .size([width, height])
            .padding(1.5);
            //.value(function(d) { return d.value; });

        var root = d3.hierarchy( {children: this.data} )
            .sum(function(d) { return d.value; })
            .each(function(d) {
                if (id = d.data.id) {
                var id;
                d.id = id;
                }
            });

            //dataset = toJSONArray(item_series, json = F)
            /*{
                name: "root",
                children: this.data,
                depth: 1
            }*/

          // var dataset = toJSONArray(this.data, json = F)

           console.log(console.log( JSON.stringify(this.data) ));

        var node = svg.selectAll(".node")
            .data(pack(root))
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { console.log(d); return "translate(" + d.x + "," + d.y + ")"; });
            //.attr("transform", function(d) { console.log(d) });
            //.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            //.attr("transform", function(d) { console.log(d); return "translate(" + d.value + "," + d.value + ")"; });
            
        /*var node = svg.selectAll(".node")
            .data(this.data)
            .enter().append("g")
            .attr("class", "node");*/


        node.append("circle")
            .attr("id", function(d) { return d.id; })
            .attr("r", function(d) { return d.value; })
            .style("fill", function(d) { return color(d.title); });

            
            console.log(node);

        /*node.append("clipPath")
            .attr("id", function(d) { return "clip-" + d.id; })
            .append("use")
            .attr("xlink:href", function(d) { return "#" + d.id; });

        node.append("text")
            .attr("clip-path", function(d) { return "url(#clip-" + d.id + ")"; })
            .selectAll("tspan")
            .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
            .text(function(d) { return d; });

        node.append("title")
            .text(function(d) { return d.id + "\n" + format(d.value); });   */
    }
}
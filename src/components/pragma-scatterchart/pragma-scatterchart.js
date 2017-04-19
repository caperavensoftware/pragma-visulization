import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';
import {PragmaChartbase, axisType} from './../pragma-chartbase';

@customElement('pragma-scatterchart')
@inject(Element)
export class PragmaScatterchart extends PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable idField;
    @bindable numberOfYTicks;
    @bindable numberOfXTicks;
    @bindable xLabelRotation;
    @bindable xTextAnchor;
    @bindable yLabelRotation;
    @bindable yTextAnchor;
    @bindable marginTop;
    @bindable marginBottom;
    @bindable marginLeft;

    constructor(element) {
        super(element);
        this.xAxisType = axisType.timeline;
        this.xLabelFormatter = d3.timeFormat("%B %d, %Y");

        this.radius = 5;
    }

    update() {
        super.update();
        const chart = this;

        const dataJoin = this.svg.selectAll(".shape")
            .data(this.data);

        dataJoin
            .exit()
            .transition()
            .duration(this.animationDuration)
            .delay((d, i) => {
                return i * this.animationDelay;
            })
            .attr("cy", chart.bounds.height - chart.marginBottom)
            .remove();


        const enter = dataJoin.enter()
            .append("circle")
                .classed("shape", true)
                    .attr("cx", 0)
                    .attr("cy", 0)
                    .attr("r", this.radius)
                    .attr("data-id", data => {
                        chart.idField ? data[chart.idField] : -1
                    })

                .transition()
                    .duration(this.animationDuration)
                    .delay((d, i) => {
                        return i * this.animationDelay;
                    })
                    .attr("cx", data => {
                        return chart.scaleX(data[chart.xField]);
                    })
                    .attr("cy", data => {
                        return chart.scaleY(data[chart.yField]) + chart.marginTop;
                    });

        dataJoin
            .merge(enter)
            .transition()
            .duration(this.animationDuration)
            .delay((d, i) => {
                return i * this.animationDelay;
            })
            .attr("cx", data => {
                return chart.scaleX(data[chart.xField]);
            })
            .attr("cy", data => {
                return chart.scaleY(data[chart.yField]) + chart.marginTop;
            });
    }
}

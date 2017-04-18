import {customElement, inject, bindable} from 'aurelia-framework';
import {PragmaChartbase} from './../pragma-chartbase';
import * as d3 from 'd3';

@customElement('pragma-barchart')
export class PragmaBarchart extends PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfYTicks;
    @bindable numberOfXTicks;
    @bindable xLabelRotation;
    @bindable xTextAnchor;
    @bindable yLabelRotation;
    @bindable yTextAnchor;

    constructor(element) {
        super(element);
    }

    update() {
        super.update();
        const chart = this;

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

    getBarHeight(chart, data) {
        return (chart.scaleY(0) - chart.scaleY(data[chart.yField]));
    }

    getBarY(chart, data) {
        return chart.scaleY(data[chart.yField]) + chart.margins.top;
    }
}
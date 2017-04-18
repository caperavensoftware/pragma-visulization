import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';
import {PragmaChartbase} from './../pragma-chartbase';

@customElement('pragma-linechart')
export class PragmaLinechart extends PragmaChartbase {
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfYTicks;
    @bindable numberOfXTicks;

    constructor(element) {
        super(element);
    }

    update() {
        super.update();
        const chart = this;
        const xoffset = chart.scaleX.bandwidth() / 2;

        const line = d3.line()
            .x(data => {
                return chart.scaleX(data[chart.xField]) + xoffset;
            })
            .y(data => {
                return chart.scaleY(data[chart.yField]) + chart.margins.top;
            });

        const dataJoin = this.svg.selectAll(".line")
            .data([this.data]);

        dataJoin
            .enter()
                .append('path')
                .classed("line", true)
            .merge(dataJoin)
                .transition()
                .duration(this.animationDuration)
                .delay((d, i) => {
                    return i * this.animationDelay;
                })
                .attr("d", line(this.data))
    }
}

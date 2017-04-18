import {customElement, inject, bindable} from 'aurelia-framework';
import * as d3 from 'd3';
import {PragmaChartbase} from './../pragma-chartbase';

@customElement('pragma-linechart')
export class PragmaLinechart extends PragmaChartbase{
    @bindable data;
    @bindable xField;
    @bindable yField;
    @bindable numberOfTicks;

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

        console.log(line(this.data));

        const dataJoin = this.svg.selectAll("path")
            .data(this.data);

        const enter = dataJoin
            .enter()
            .append('path')
            .attr("class", "line")
            .transition()
            .duration(this.animationDuration)
            .delay((d, i) => {
                return i * this.animationDelay;
            })
            .attr("d", line(this.data));
    }
}

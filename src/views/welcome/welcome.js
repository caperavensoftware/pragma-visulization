export class Welcome {
    constructor() {
        this.data = [
            {
                title: "In Progress",
                value: 10
            },
            {
                title: "Awaiting Approval",
                value: 50
            },
            {
                title: "Approved",
                value: 15
            },
            {
                title: "Closed",
                value: 100
            },
            {
                title: "Cancelled",
                value: 200
            }

        ]
    }

    addMore() {
        this.data[0].value = 30;
        this.data.push({
            title: "Paused",
            value: 250
        })
    }

    removeSum() {
        this.data[0].value = 10;
        this.data.splice(4, 1);
    }

    update() {
        this.barchart.au["pragma-barchart"].viewModel.update();
        this.linechart.au["pragma-linechart"].viewModel.update();
    }
}
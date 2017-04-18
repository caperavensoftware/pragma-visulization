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
        ];

        this.dateData = [
            {
                title: "Item 1",
                value: new Date(2016, 1, 1)
            },
            {
                title: "Item 2",
                value: new Date(2017, 1, 1)
            },
            {
                title: "Item 3",
                value: new Date(2017, 1, 1)
            },
            {
                title: "Item 4",
                value: new Date(2017, 2, 1)
            },
            {
                title: "Item 5",
                value: new Date(2017, 3, 1)
            },
            {
                title: "Item 6",
                value: new Date(2017, 4, 1)
            },
            {
                title: "Item 7",
                value: new Date(2017, 4, 2)
            },
            {
                title: "Item 8",
                value: new Date(2017, 4, 4)
            },
            {
                title: "Item 9",
                value: new Date(2017, 4, 10)
            },
            {
                title: "Item 10",
                value: new Date(2018, 4, 1)
            }
        ]
    }

    addMore() {
        this.data[0].value = 30;
        this.data.push({
            title: "Paused",
            value: 250
        });

        this.update();
    }

    removeSum() {
        this.data[0].value = 10;
        this.data.splice(4, 1);

        this.update();
    }

    update() {
        this.barchart.au["pragma-barchart"].viewModel.update();
        this.linechart.au["pragma-linechart"].viewModel.update();
    }
}
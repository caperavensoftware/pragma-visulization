export class Welcome {
    constructor() {
        this.data = [
            {
                id: 0,
                title: "In Progress",
                value: 10
            },
            {
                id: 1,
                title: "Awaiting Approval",
                value: 50
            },
            {
                id: 2,
                title: "Approved",
                value: 15
            },
            {
                id: 3,
                title: "Closed",
                value: 100
            },
            {
                id: 4,
                title: "Cancelled",
                value: 200
            }
        ];

        this.dateData = [
            {
                id: 0,
                title: "Item 1",
                date: new Date(2016, 1, 1),
                time: 0
            },
            {
                id: 1,
                title: "Item 2",
                date: new Date(2017, 1, 1),
                time: 6
            },
            {
                id: 2,
                title: "Item 3",
                date: new Date(2017, 1, 1),
                time: 7
            },
            {
                id: 3,
                title: "Item 4",
                date: new Date(2017, 2, 1),
                time: 14.30
            },
            {
                id: 4,
                title: "Item 5",
                date: new Date(2017, 3, 1),
                time: 16
            },
            {
                id: 5,
                title: "Item 6",
                date: new Date(2017, 4, 1),
                time: 8
            },
            {
                id: 6,
                title: "Item 7",
                date: new Date(2017, 4, 2),
                time: 8.25
            },
            {
                id: 7,
                title: "Item 8",
                date: new Date(2017, 4, 4),
                time: 9
            },
            {
                id: 8,
                title: "Item 9",
                date: new Date(2017, 4, 10),
                time: 9
            },
            {
                id: 9,
                title: "Item 10",
                date: new Date(2018, 4, 1),
                time: 17
            }
        ]
    }

    addMore() {
        this.data[0].value = 30;
        this.data.push({
            id: 5,
            title: "Paused",
            value: 250
        });

        for (let i = 0; i < 5; i++) {
            const date = new Date(+(new Date()) - Math.floor(Math.random()*10000000000));
            const time = Math.floor((Math.random() * 24) + 1);
            this.dateData.push({
                id: this.dateData.length + 1,
                title: `item ${this.dateData.length + 1}`,
                date: date,
                time: time
            })
        }

        this.update();
    }

    removeSum() {
        this.data[0].value = 10;
        this.data.splice(4, 1);

        for (let i = 0; i < 5; i++) {
            this.dateData.splice(Math.floor((Math.random() * 5) + 1), 1)
        }

        this.update();
    }

    update() {
        this.barchart.au["pragma-barchart"].viewModel.update();
        this.linechart.au["pragma-linechart"].viewModel.update();
        document.querySelector("pragma-scatterchart").au["pragma-scatterchart"].viewModel.update();
    }
}
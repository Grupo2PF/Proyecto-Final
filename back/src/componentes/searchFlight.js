const duffel = require("../duffel");


duffel.offerRequests.create({
    slices: [
        {
            origin: "NYC",
            destination: "ATL",
            departure_date: "2021-06-21"
        },
        {
            origin: "ATL",
            destination: "NYC",
            departure_date: "2021-07-21"
        }
    ],
    passengers: [{type: "adult"}, {type: "adult"}, {age: 1}],
    cabin_class: "business"
})
    .then(r => console.log(r));
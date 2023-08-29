const express = require("express")
const bountyRouter = express.Router()
const Bounty = require("../models/bounty")

// First Name
// - Last Name
// - Living (Boolean)
// - Bounty Amount (number)
// - Type (‘Sith’ or ‘Jedi’)
// - ID (a unique identifier.
// const bounties = [{
//     firstName: "Obi-Wan",
//     lastName: "Kenobi",
//     living: false,
//     amount: 10000000,
//     type: "jedi",
//     imageUrl: "https://api.time.com/wp-content/uploads/2015/12/star-wars-episode-iii-revenge-of-the-sith-obi-wan.jpg?quality=85&w=2480"
// },{
//     firstName: "Luke",
//     lastName: "Skywalker",
//     living: true,
//     amount: 50000000,
//     type: "jedi",
//     imageUrl: "https://media.contentapi.ea.com/content/dam/star-wars-battlefront-2/images/2019/08/swbf2-refresh-hero-large-heroes-page-luke-skywalker-16x9-xl.jpg.adapt.crop1x1.320w.jpg"
// },{
//     "firstName": "Anakin",
//     "lastName": "Skywalker",
//     "living": true,
//     "amount": 90000000,
//     "type": "sith",
//     "imageUrl": "https://images.immediate.co.uk/production/volatile/sites/3/2019/12/Episode_III_Revenge_Christensen07-8bbd9e4.jpg?resize=768,574"
// },{
//     "firstName": "Darth",
//     "lastName": "Maul",
//     "living": false,
//     "amount": 500000,
//     "type": "sith",
//     "imageUrl": "https://lumiere-a.akamaihd.net/v1/images/Darth-Maul_632eb5af.jpeg?region=75%2C42%2C1525%2C858"
// },{
//     "firstName": "Emperor",
//     "lastName": "Palpatine",
//     "living": true,
//     "amount": 500000000,
//     "type": "sith",
//     "imageUrl": "https://static1.thegamerimages.com/wordpress/wp-content/uploads/2018/06/new-palpatine.jpg"
// },{
//     "firstName": "Cal",
//     "lastName": "Kestis",
//     "living": true,
//     "amount": 700000,
//     "type": "jedi",
//     "imageUrl": "https://i0.wp.com/capesandtights.com/wp-content/uploads/2022/06/CalFeatued.png"
// },{
//    " firstName": "Qui-Gon",
//     "lastName": "Jinn",
//     "living": true,
//     "amount": 1700000,
//    " type": "jedi",
//     "imageUrl": "https://upload.wikimedia.org/wikipedia/en/a/ad/Qui-Gon_Jinn.png"
// },{
//     "firstName": "Darth",
//     "lastName": "Plaguesis",
//     "living": true,
//     "amount": 999999999999,
//     "type": "sith",
//     "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRokEvhaOYC4CjMpxKlViX0OoqLwlYAnZPxqw&usqp=CAU"
// },{
//     "firstName": "Darth",
//     "lastName": "Bane",
//     "living": false,
//     "amount": 760000,
//    " type": "jedi",
//     "imageUrl": "https://e0.pxfuel.com/wallpapers/728/459/desktop-wallpaper-darth-bane.jpg"
// }]

bountyRouter.route("/")
.get((req, res, next) => {// mongoose

    Bounty.find()
        .then(response => res.status(200).send(response))
        .catch(error => next(error))
})
.post((req, res, next) => {// mongoose
    const newBounty = new Bounty(req.body)
    newBounty.save()
        .then(response => res.status(201).send(response))
        .catch(error => next(error))
})

// PARAMS
bountyRouter.route("/:bountyId")// GET one
.get((req, res, next) => {
    const bountyId = req.params.bountyId
    Bounty.findById(bountyId)
        .then(response => res.status(200).send(response))
        .catch(err => next(err))
})
.delete((req, res, next) => {
    const bountyId = req.params.bountyId
    Bounty.findByIdAndDelete(bountyId)
        .then(response => res.status(200).send(`Successfully Deleted item with ID: ${bountyId}`))
        .catch(err => next(err))
})
.put((req, res, next) => {
    const bountyId = req.params.bountyId

    Bounty.findByIdAndUpdate(bountyId, req.body)
        .then(response => res.status(201).send(req.body))
        .catch(err => next(err))
})


// QUERY
bountyRouter.route("/search/type")
.get((req, res, next) => {
    Bounty.find({type: req.query.type})
        .then(response => res.status(200).send(response))
        .catch(err => next(err))
})

bountyRouter.route("/search/living")
.get((req, res, next) => {// had an issue with the filter not working, the req is string

    Bounty.find({living: req.query.living})
        .then(response => res.status(200).send(response))
        .catch(err => next(err))
})



// let livingQuery = req.query.living// recives as a string

// let isAlive = JSON.parse(livingQuery)// parse into json 





module.exports = bountyRouter
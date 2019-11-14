const User = require('../user/models/user')

const user = async (parent, args, context) => {
    console.log(context)
    try {

        // const {
        //     input
        // } = args;
        // console.log(input)
        // let u = new User(
        //     args.input.userId,
        //     args.input.name,
        //     args.input.email,
        //     args.input.profile)
        // console.log(u)
        // await u.addUser()
    } catch (e) {
        console.log(e)
    }
};

const friend = (userAid, userBid) => {

};

const post = (userId, text, travelList) => {

};

const travelList = (userId, name, tags, stay_time_from, stay_time_to, cost) => {

};

const city = (userId, name, stay_time_from, stay_time_to, cost, transportation, review, travelList) => {

};

const touristSpot = (userId, name, type, stay_time_total, cost, rates, transportation, review, city) => {

};

module.exports = {
    user
}
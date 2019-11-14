const Sequelize = require('sequelize');
const sequelize = new Sequelize('TheJourney', 'root', 'kkw25053', {
    host: 'localhost',
    dialect: 'mysql'
});


// import tables
const User = require('./user/models/user.js')(sequelize);
const Friend = require('./user/models/friend.js');
const Relationship = require('./user/models/relationship.js')
const Post = require('./user/models/post.js');
const City = require('./travel/models/city');
const Country = require('./travel/models/country');
const TouristSpot = require('./travel/models/touristSpot');
const TravelList = require('./travel/models/travelList');

const db = {};

// Tables' relationship
User.hasOne(Friend);
User.hasMany(Post);
User.hasMany(Relationship, {
    foreignKey: 'id',
    sourceKey: 'user_a'
});
User.hasMany(Relationship, {
    foreignKey: 'id',
    sourceKey: 'user_b'
});
User.hasMany(TravelList);

TravelList.hasMany(City);
Country.hasMany(City);
City.hasMany(TouristSpot);

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Create all models
sequelize.sync()
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class TouristSport extends Model {}
TouristSport.init({
    indexs: [{
        unique: true,
        fields: ['id']
    }],
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    longtitude: {
        type: Sequelize.FLOAT
    },
    latitude: {
        type: Sequelize.FLOAT
    },
    stay_time_total: {
        type: Sequelize.FLOAT
    },
    cost: {
        type: Sequelize.INTEGER
    },
    rates: {
        type: Sequelize.INTEGER
    },
    transportation: {
        type: Sequelize.STRING
    },
    review: {
        type: Sequelize.TEXT
    },
    photo_url: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
}, {
    sequelize,
    underscored: true,
    modelName: 'tourist_spot'
})

module.exports = TouristSport;
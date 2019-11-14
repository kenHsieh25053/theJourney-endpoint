const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class City extends Model {}
City.init({
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
    longtitude: {
        type: Sequelize.FLOAT
    },
    latitude: {
        type: Sequelize.FLOAT
    },
    stay_time_from: {
        type: Sequelize.DATE
    },
    stay_time_to: {
        type: Sequelize.DATE
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
    modelName: 'city'
})

module.exports = City;
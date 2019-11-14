const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class TravelList extends Model {}
TravelList.init({
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
    tag: {
        type: Sequelize.STRING
    },
    stay_time_from: {
        type: Sequelize.DATE
    },
    stay_time_to: {
        type: Sequelize.DATE
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
    like: {
        type: Sequelize.INTEGER
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
    modelName: 'travel_list'
})

module.exports = TravelList;
const Sequelize = require('sequelize');
const Model = Sequelize.Model;


class User extends Model {}
User.init({
    indexs: [{
        unique: true,
        fields: ['id']
    }],
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    position: {
        type: Sequelize.STRING
    },
    country_count: {
        type: Sequelize.INTEGER
    },
    city_count: {
        type: Sequelize.INTEGER
    },
    headshot: {
        type: Sequelize.STRING
    },
    profile: {
        type: Sequelize.TEXT
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
    modelName: 'user'
})

module.exports = User;
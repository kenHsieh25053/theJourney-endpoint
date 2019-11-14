const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Relationship extends Model {}
Relationship.init({
    indexs: [{
        unique: true,
        fields: ['id']
    }],
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    user_a: {
        type: Sequelize.UUID
    },
    user_b: {
        type: Sequelize.UUID
    },
    status: {
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
    modelName: 'friend'
})

module.exports = Relationship;
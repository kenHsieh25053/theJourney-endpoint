const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Friend extends Model {}
Friend.init({
    indexs: [{
        unique: true,
        fields: ['id']
    }],
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    friend_count: {
        type: Sequelize.INTEGER
    },
    friend_list: {
        type: Sequelize.UUID,
        get() {
            return this.getDataValue('friend_list').split(',');
        },
        set(val) {
            return this.setDataValue('friend_list', val.join(','));
        }
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

module.exports = Friend;
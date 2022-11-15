const Favorite = require('./Favorite');
const User = require('./User');

Favorite.belongsTo(User, {
    // key that connects the tables
    foreignKey: 'user_id'
});

User.hasMany(Favorite, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { Favorite, User };

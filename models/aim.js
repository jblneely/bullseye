'use strict';
module.exports = function(sequelize, DataTypes) {
    var aim = sequelize.define('aim', {
        userId: DataTypes.INTEGER,
        objective: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function(models) {
                models.aim.hasMany(models.fire);
                models.aim.belongsTo(models.user);
            }
        }
    });
    return aim;
};

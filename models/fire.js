'use strict';
module.exports = function(sequelize, DataTypes) {
    var fire = sequelize.define('fire', {
        aimId: DataTypes.INTEGER,
        keyResult: DataTypes.TEXT,
        score: DataTypes.INTEGER,
        goal: DataTypes.INTEGER,
        current: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                models.fire.belongsTo(models.aim);
            }
        }
    });
    return fire;
};



//fishished - unfinished - pass in fire.score/fire.goal from db

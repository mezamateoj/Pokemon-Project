const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
    // This allows you to uniquely identify each Pokemon in your database, 
    // regardless of whether it came from the API or was manually created by a user
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true

    },

    apiId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    // name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // path to img sprites.front_default  
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // stats[0].base_stat
    health: {
      type: DataTypes.INTEGER,
      allowNull: false

    },

    // stats[1].base_stat
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false

    },

    // stats[2].base_stat
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    // stats[5].base_stat
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false

    },
  });
};

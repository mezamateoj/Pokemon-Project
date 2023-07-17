const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
  sequelize.define('Pokemon', {
    // id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
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

    }
  });
};

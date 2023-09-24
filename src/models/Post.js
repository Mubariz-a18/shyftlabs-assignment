const { DataTypes } = require('sequelize');
const sequelize = require('../Db/dbConnection.js');
const User = require('./User.js');


const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
},{
  timestamps:false
});

Post.belongsTo(User, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

module.exports = Post
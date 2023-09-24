const { DataTypes } = require('sequelize');
const sequelize = require('../Db/dbConnection.js');
const User = require('./User.js');
const Post = require('./Post.js');


const PostComment = sequelize.define('PostComment', {
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
  timestamps:false,
  tableName: 'PostComment', 
});

PostComment.belongsTo(User, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE',
});

PostComment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

module.exports = PostComment;
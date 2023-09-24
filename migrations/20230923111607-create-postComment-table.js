'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostComment', {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add a foreign key constraint to link the post_id to the Posts table (assuming your Posts table is already defined).
    await queryInterface.addConstraint('PostComment', {
      type: 'foreign key',
      name: 'fk_post_id',
      fields: ['post_id'],
      references: {
        table: 'Posts',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    // Add a foreign key constraint to link the author_id to a Users table (assuming your Users table is already defined).
    await queryInterface.addConstraint('PostComment', {
      type: 'foreign key',
      name: 'fk_author_id',
      fields: ['author_id'],
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the foreign key constraints first.
    await queryInterface.removeConstraint('PostComment', 'fk_post_id');
    await queryInterface.removeConstraint('PostComment', 'fk_author_id');
    await queryInterface.dropTable('PostComment');
  }
};

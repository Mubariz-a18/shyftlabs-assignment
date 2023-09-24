const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const Post = require('../models/Post.js');
const User = require('../models/User.js');
const generateToken = require('../utils/generateToken.js');
const PostComment = require('../models/PostComment.js');

const resolvers = {
  Query: {
    getAllBlogPosts: async () => {
      try {
        const posts = await Post.findAll();
        if (!posts || !posts.length) {
          throw new Error('Blogs not found');
        }
        return posts;
      } catch (error) {
        throw error;
      }
    },
    getBlogPost: async (parent, args) => {
      try {
        const post = await Post.findByPk(+args.id);
        if (!post) {
          throw new Error('Blog not found');
        }
        return post;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    signUp: async (parent, args) => {
      try {
        const { username, email, password } = args;
        if(!email || !username || !password){
          throw new Error("Username, Email and Password is required")
        }
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error('User with this email already exists.');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        return generateToken(user);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    signIn: async (parent, args) => {
      try {
        const { email, password } = args;
        if (!email || !password) {
          throw new Error('Email and Password required');
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error('User not Exist');
        }
        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
          throw new Error('Invalid Email or Password');
        }
        return generateToken(user);
      } catch (error) {
        throw error;
      }
    },

    createBlogPost: async (parent, args, context) => {
      try {
        if (!context.me.user) {
          throw new AuthenticationError('Authentication required');
        }
        const author_id = context.me.user.id;
        const { title, content } = args;
        if (!title || !content) {
          throw new Error('Title and content are required');
        }
        await Post.create({ title, content, author_id });
        return true;
      } catch (error) {
        throw error;
      }
    },

    updateBlogPost: async (parent, args, context) => {
      if (!context.me.user) {
        throw new AuthenticationError('Authentication required');
      }
      const { id, title, content } = args;
      const blogPost = await Post.findByPk(+id);
      if (!blogPost) {
        throw new Error('Blog post not found.');
      }
      if (blogPost.author_id !== context.me.user.id) {
        throw new AuthenticationError('Unauthorized');
      }
      await Post.update({ title, content }, { where: { id } });
      return true;
    },

    deleteBlogPost: async (parent, args, context) => {
      if (!context.me.user) {
        throw new AuthenticationError('Authentication required');
      }
      const { id } = args;
      const blogPost = await Post.findByPk(+id);
      if (!blogPost) {
        throw new Error('Blog post not found.');
      }
      if (blogPost.author_id !== context.me.user.id) {
        throw new AuthenticationError('Unauthorized');
      }
      await blogPost.destroy();
      return true;
    },

    createComment: async (parent, args, context) => {
      try {
        if (!context.me.user) {
          throw new AuthenticationError('Authentication required');
        }
        const { post_id, content } = args;
        if (!post_id || !content) throw new Error('Post id and content are required');
        const blogPost = await Post.findOne({ where: { id: +post_id } });
        if (!blogPost) {
          throw new Error('Blog post not found.');
        }
        await PostComment.create({ post_id, author_id: context.me.user.id, content });
        return true;
      } catch (error) {
        throw error;
      }
    },
  },

  BlogPost: {
    author: async (parent) => {
      const user = await User.findOne({ where: { id: parent.author_id } });
      return user ? user : null;
    },
    comments: async (parent) => {
      const comments = await PostComment.findAll({ where: { post_id: parent.id } });
      return comments;
    },
  },
};

module.exports = resolvers;

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    username: String
    email: String
  }

  type Comment {
    id:ID
    content: String
    author_id:ID
    post_id:ID
  }

  type BlogPost {
    id: ID
    title: String
    content: String
    author: User
    comments:[Comment]
  }

  type Payload {
    token: String
  }

  type Query {

    getAllBlogPosts: [BlogPost!]!

    getBlogPost(id: ID!): BlogPost
    
  }

  type Mutation {

    signUp(username: String!, email: String!, password: String!): Payload

    signIn(email: String!, password: String!): Payload

    createBlogPost(title: String!, content: String!): Boolean

    updateBlogPost(id: ID!, title: String!, content: String!): Boolean

    deleteBlogPost(id: ID!): Boolean

    createComment(post_id:ID!, content:String!):Boolean

  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
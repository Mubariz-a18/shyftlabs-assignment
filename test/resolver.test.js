const { AuthenticationError } = require('apollo-server-express');
const { Mutation, Query } = require('../src/graphql/resolvers.js');
const dotenv = require('dotenv');
dotenv.config();

jest.mock("../src/Db/dbConnection.js")

jest.mock("../src/models/User.js")
jest.mock("../src/models/Post.js")
jest.mock("../src/models/PostComment.js")

describe('Resolvers', () => {

    describe('Mutation - signUp', () => {
        it('should create a new user', async () => {
            const args = {
                username: 'helloNewUser3',
                email: 'helloNewUser7@gmail.com',
                password: 'password',
            };

            const result = await Mutation.signUp(null, args);
            expect(result).toHaveProperty('token');
        });

        it('should throw an error if the user already exists', async () => {
            const args = {
                username: 'testuser',
                email: 'mubariz1@abc.com',
                password: 'password123',
            };

            await expect(async () => {
                await Mutation.signUp(null, args);
            }).rejects.toThrowError('User with this email already exists.');
        });

        it('should throw an error if the email is missing', async () => {
            const args = {
                username: 'helloNewUser4',
                password: 'password',
            };

            await expect(async () => {
                await Mutation.signUp(null, args);
            }).rejects.toThrowError('Username, Email and Password is required');
        });

        it('should throw an error if the password is missing', async () => {
            const args = {
                username: 'helloNewUser5',
                email: 'helloNewUser5@gmail.com',
            };

            await expect(async () => {
                await Mutation.signUp(null, args);
            }).rejects.toThrowError('Username, Email and Password is required');
        });

    });

    describe('Mutation - signIn', () => {

        it('should throw an error if the user does not exist', async () => {

            const args = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            await expect(async () => {
                await Mutation.signIn(null, args);
            }).rejects.toThrowError('User not Exist');
        });

        it('should throw an error if the password is incorrect', async () => {

            const args = {
                email: 'test@example.com',
                password: 'wrongpassword',
            };

            await expect(async () => {
                await Mutation.signIn(null, args);
            }).rejects.toThrowError('Invalid Email or Password');
        });

    });

    describe('Mutation - createBlogPost', () => {
        const context = {
            me: {
                user: {
                    id: 10,
                },
            },
        };
        it('should create a new blog post', async () => {

            const args = {
                title: 'Test Blog Post1',
                content: 'This is the content of the blog post.',
            };

            const result = await Mutation.createBlogPost(null, args, context);
            expect(result).toBe(true);
        });

        it('should throw an error if title is missing', async () => {
            const args = {
                content: 'This is the content of the blog post.',
            };

            await expect(async () => {
                await Mutation.createBlogPost(null, args, context);
            }).rejects.toThrowError('Title and content are required');
        });

        it('should throw an error if content is missing', async () => {
            const args = {
                title: 'Test Blog Post',
            };

            await expect(async () => {
                await Mutation.createBlogPost(null, args, context);
            }).rejects.toThrowError('Title and content are required');
        });

        it('should throw an error if not authenticated', async () => {

            const args = {
                title: 'Test Blog Post',
                content: 'This is the content of the blog post.',
            };

            context.me.user = null;

            await expect(async () => {
                await Mutation.createBlogPost(null, args, context);
            }).rejects.toThrowError('Authentication required');
        });

    });

    describe('Mutation - updateBlogPost', () => {
        const context = {
            me: {
                user: {
                    id: 10,
                },
            },
        };
        it('should update a blog post if the user is the author', async () => {

            const args = {
                id: 1,
                title: 'Updated Blog Post',
                content: 'Updated content.',
            };

            const result = await Mutation.updateBlogPost(null, args, context);

            expect(result).toBe(true);
        });

        it('should throw an error if the user is not the author', async () => {

            const args = {
                id: 2,
                title: 'Updated Blog Post',
                content: 'Updated content.',
            };


            await expect(async () => {
                await Mutation.updateBlogPost(null, args, context);
            }).rejects.toThrowError(AuthenticationError);
        });

        it('should throw an error if the blog post does not exist', async () => {
            const args = {
                id: 999,
                title: 'Updated Blog Post',
                content: 'Updated content.',
            };

            await expect(async () => {
                await Mutation.updateBlogPost(null, args, context);
            }).rejects.toThrowError('Blog post not found.');
        });
    });

    describe('Mutation - deleteBlogPost', () => {
        const context = {
            me: {
                user: {
                    id: 10,
                },
            },
        };
        it('should delete a blog post if the user is the author', async () => {
            const args = {
                id: 1,
            };

            const result = await Mutation.deleteBlogPost(null, args, context);

            expect(result).toBe(true);
        });

        it('should throw an error if the user is not the author', async () => {
            const args = {
                id: 2,
            };


            await expect(async () => {
                await Mutation.deleteBlogPost(null, args, context);
            }).rejects.toThrowError(AuthenticationError);
        });
    });

    describe('Mutation - createComment', () => {
        const context = {
            me: {
                user: {
                    id: 10,
                },
            },
        };
        it('should create a new comment on a blog post', async () => {

            const args = {
                post_id: 1,
                content: 'This is a new comment.',
            };

            const result = await Mutation.createComment(null, args, context);

            expect(result).toBe(true);
        });


        it('should throw an error if post does not exist', async () => {
            const args = {
                post_id: 13,
                content: 'This is a new comment.',
            };

            await expect(async () => {
                await Mutation.createComment(null, args, context);
            }).rejects.toThrowError('Blog post not found.');
        });

        it('should throw an error if not authenticated', async () => {
            const args = {
                post_id: 1,
                content: 'This is a new comment.',
            };

            context.me.user = null;

            await expect(async () => {
                await Mutation.createComment(null, args, context);
            }).rejects.toThrowError(AuthenticationError);
        });

    });

    describe('Query - getAllBlogPosts', () => {
        it('should retrieve all blog posts', async () => {
            const mockPosts = [{
                id:1,
                title:"new post",
                content:"new post content",
                author_id: 10,
            },{
                id:2,
                title:"new post",
                content:"new post content",
                author_id: 11,
            },{
                id:3,
                title:"new post",
                content:"new post content",
                author_id: 13,
            }]
            const result = await Query.getAllBlogPosts();
            
            expect(result).toEqual(mockPosts);
        });

    });

    describe('Query - getBlogPost', () => {
        it('should retrieve a specific blog post by ID', async () => {

            const mockPost = {
                id:3,
                title:"new post",
                content:"new post content",
                author_id: 2
            }


            const result = await Query.getBlogPost(null, { id: 3 });

            expect(result).toEqual(mockPost);
        });

        it('should throw an error if the requested blog post is not found', async () => {
            const postId = 999;

            await expect(async () => {
                await Query.getBlogPost(null, { id: postId });
            }).rejects.toThrowError('Blog not found');
        });
    });

});

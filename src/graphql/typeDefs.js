const { gql } = require('apollo-server');

const typeDefs = gql`



	type User {
		id: Int!
		name: String!
		email: String!
		senha: String!
	}

	type Posts {
		id: Int!
		content: String!
		title: String!
	}

 type AuthPayload {
        token: String!
        user: User!
    }

	type Query {
		getUsers(id: Int!): User
		getUser(id: Int!): User
		getPosts(id: Int!): Posts
		getPost(id: Int!): Posts
	}

	type Mutation {
			createPosts(content: String!, title: String!): Posts!
		  createUser name:String!, email:String!, senha:String!): AuthPayload!
        login (email: String!, senha: String!): AuthPayload!
	}
`;

module.exports = typeDefs;

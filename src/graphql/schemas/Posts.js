const { gql } = require('apollo-server-express');

module.exports = gql`
	type Posts {
		id: Int!
		content: String!
		title: String!
	}

	extend type Query {
		getPosts: [Posts]
		getPost(id: Int!): Posts!
	}

	extend type Mutation {
		createPost(content: String!, title: String!): Posts!
	}
`;

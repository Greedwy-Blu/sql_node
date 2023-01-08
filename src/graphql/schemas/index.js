const { gql } = require('apollo-server-express');
const userType = require('./User');
const postType = require('./Posts');

const rootType = gql`
	type Query {
		root: String
	}
	type Mutation {
		root: String
	}
`;

module.exports = [rootType, userType, postType];

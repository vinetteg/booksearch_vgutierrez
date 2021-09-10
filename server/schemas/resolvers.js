const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth.js");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({
          _id: context.user.user._id,
        }).select("-__v -password");
        return userData;
      }
      throw new AuthenticationError("You should be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email.");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { newBook }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: newBook },
          },
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in");
    },
    removeBook: async (parent, { book }, context) => {
      if (context.user) {
        return user.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: books } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;

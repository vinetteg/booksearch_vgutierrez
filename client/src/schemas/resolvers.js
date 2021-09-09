const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("..utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userDate = await User.findOne({
          _id: context.user.user.id,
        }).populate("savedBooks");
        return await User.findOne({ _id: context.user.user.id }).populate(
          "savedBooks"
        );
      }
      throw new AuthenticationError("You should be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(profile);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email.");
      }
      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken(profile);
      return { token, user };
    },

    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
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
      }
      throw new AuthenticationError("You need to be logged in");
    },
  },
};

module.exports = resolvers;

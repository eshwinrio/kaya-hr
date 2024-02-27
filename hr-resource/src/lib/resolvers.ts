import { GraphQLError } from "graphql";
import { ApolloServerContext } from "./apollo.js";
import { Maybe, Resolver, ResolverTypeWrapper, User } from "./gql-codegen/graphql.js";
import prisma from "./prisma.js";

export const currentUserResolver: Resolver<Maybe<ResolverTypeWrapper<User>>, {}, ApolloServerContext, {}> = async (_root, _args, { email }) => {
  const user = await prisma.users.findFirst({
    where: { email },
    include: {
      organization: true,
    }
  });
  if (!user) {
    throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
  }
  return { ...user, dateJoined: user.dateJoined.toISOString(), dateOfBirth: user.dateOfBirth.toISOString(), roles: [] };
};
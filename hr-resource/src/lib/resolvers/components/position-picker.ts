import { QueryResolvers } from "../../gql-codegen/graphql.js";
import prisma from "../../prisma.js";

const qResolverPositionPicker: QueryResolvers["positionPicker"] = async (
  _root,
  _args,
  { organization }
) => {
  return await prisma.position.findMany({
    where: { organizationId: organization.id },
    include: { organization: true, User: true },
  });
}

export default qResolverPositionPicker;

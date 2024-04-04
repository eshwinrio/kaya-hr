import { MutationResolvers } from "./gql-codegen/graphql.js";
import { generatePayslips } from "./payroll-utils.js";

export const mResolverGeneratePayslips: MutationResolvers["generatePayslips"] = (
  _root,
  _args,
  { organization }
) => generatePayslips(organization)
  .then(() => true)
  .catch(() => false);

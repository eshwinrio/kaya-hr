import { GraphQLError } from "graphql";
import { FC } from "react";
import { LoaderFunction } from "react-router-dom";

const ViewPayroll: FC = () => {
  return (
    <div>Payroll Viewer Page</div>
  );
};

export default ViewPayroll;

export const viewPayrollLoader: LoaderFunction = async () => {
  throw new GraphQLError(
    "Page under development",
    {
      extensions: {
        code: "PAGE_UNDER_DEVELOPMENT",
      },
    }
  )
}

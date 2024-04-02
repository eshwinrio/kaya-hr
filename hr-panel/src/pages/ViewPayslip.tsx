import { ApolloQueryResult, useMutation } from "@apollo/client";
import DownloadIcon from "@mui/icons-material/Download";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { FC, useEffect } from "react";
import { LoaderFunction, useLoaderData } from "react-router-dom";
import { apolloClient } from "../lib/apollo";
import { gql } from "../lib/gql-codegen";
import { ViewPayslipQuery } from "../lib/gql-codegen/graphql";

const query = gql(`
  query ViewPayslip($payslipId: Int!) {
    viewPayslip(payslipId: $payslipId) {
      id
      generatedOn
      invoiceUuid
      dispensedOn
      deductions
      netPay
      paymentMethod
      paymentStatus
      employee {
        id
        firstName
        lastName
      }
      clockTimes {
        ...PunchTiming
      }
    }
  }
`);

const generateInvoiceMutation = gql(`
  mutation GenerateInvoice($payslipId: Int!) {
    generateInvoice(payslipId: $payslipId)
  }
`);

const ViewPayslip: FC = () => {
  const loaderData = useLoaderData() as ViewPayslipLoader;
  const payslip = loaderData.payslip.data?.viewPayslip;
  const [generateInvoice, { data, loading }] = useMutation(generateInvoiceMutation, { variables: { payslipId: payslip?.id ?? 0 } });

  useEffect(() => {
    if (data?.generateInvoice) {
      const documentUuid = data.generateInvoice;
      const currentDomain = window.location.origin;
      const apiDomain = process.env.REACT_APP_RESOURCE_API_DOMAIN || currentDomain;
      const apiPrefix = process.env.REACT_APP_RESOURCE_API_PREFIX || "";
      const mediaEndpoint = process.env.REACT_APP_RESOURCE_API_MEDIA_ENDPOINT || "";
      window.open(`${apiDomain}${apiPrefix}${mediaEndpoint}/${documentUuid}.pdf`, "_blank");
    }
  }, [data]);

  if (!payslip) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
        <div />
        <Box>
          <Button
            startIcon={<DownloadIcon />}
            title="Download Invoice"
            onClick={() => generateInvoice()}
            disabled={loading}
          >
            Invoice
          </Button>
        </Box>
      </Toolbar>
    </Container>
  );
};

export default ViewPayslip;

interface ViewPayslipLoader {
  readonly payslip: Awaited<ApolloQueryResult<ViewPayslipQuery>>;
}

export const viewPayslipLoader: LoaderFunction = async ({ params }) => {
  const payslipId = parseInt(params.id as string, 10);
  if (isNaN(payslipId)) {
    throw new Error("Invalid payslip ID");
  }

  return {
    payslip: await apolloClient.query({ query, variables: { payslipId } }),
  };
}

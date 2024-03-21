import { FC, PropsWithChildren, createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { gql } from "../lib/gql-codegen";
import { WhoAmIQuery } from "../lib/gql-codegen/graphql";

export const WHOAMI = gql(`
  query WhoAmI {
    currentUser {
      id
      ...Profile
      ...Avatar
      organization {
        id
        name
        summary
        webUrl
        logoUrl
        bannerUrl
      }
    }
  }
`);

export const whoamiContext = createContext<WhoAmIQuery | null>(null);
export const useWhoAmI = () => useContext(whoamiContext);
export const useWhoAmILoader = () => useLoaderData() as WhoAmIQuery;

const WhoamiProvider: FC<PropsWithChildren> = ({ children }) => {
  const loaderData = useLoaderData() as WhoAmIQuery;
  return (
    <whoamiContext.Provider value={loaderData}>
      {children}
    </whoamiContext.Provider>
  );
}

export default WhoamiProvider;

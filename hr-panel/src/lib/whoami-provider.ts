import { createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { WhoAmIQuery } from "./gql-codegen/graphql";

export const whoamiContext = createContext<WhoAmIQuery | null>(null);
export const useWhoAmI = () => useContext(whoamiContext);
export const useWhoAmILoader = () => useLoaderData() as WhoAmIQuery;
export default whoamiContext.Provider;

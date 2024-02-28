import { createContext, useContext } from "react";
import { WhoAmIQuery } from "./gql-codegen/graphql";
import { useLoaderData } from "react-router-dom";

export const whoamiContext = createContext<WhoAmIQuery | null>(null);
export const useWhoAmI = () => useContext(whoamiContext);
export const useWhoAmILoader = () => useLoaderData() as WhoAmIQuery;
export default whoamiContext.Provider;

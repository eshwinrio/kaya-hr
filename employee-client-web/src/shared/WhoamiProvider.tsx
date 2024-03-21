import { FC, PropsWithChildren, createContext, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { gql } from "../lib/gql-codegen";
import { WhoAmIQuery } from "../lib/gql-codegen/graphql";

export const WHOAMI = gql(`
  query WhoAmI {
    currentUser {
         id
         ...Profile
         phone
         streetName
         city
         country
         province
         pincode
         dateOfBirth
         dateJoined
         organization {
           id
           name
           summary
           webUrl
           logoUrl
           bannerUrl
         }
         dateJoined
         positions {
           id
           title
           description
         }
         ...Avatar
         bannerUrl
         schedules {
           id
           position {
             title
             description
             hourlyWage
           }
           schedule {
             id
             title
             dateTimeStart
             dateTimeEnd
             createdAt
             createdBy {
               id
               email
               firstName
               lastName
               streetName
               city
               country
               province
               pincode
               dateOfBirth
               dateJoined
               phone
             }
           }
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

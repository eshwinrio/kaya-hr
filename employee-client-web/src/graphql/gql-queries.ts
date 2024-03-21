import { gql } from "../lib/gql-codegen/gql";


export const REGISTER_PUNCH = gql(`
  mutation RegisterPunch {
    registerPunch {
      id
      startTime
      endTime
    }
  }
`);

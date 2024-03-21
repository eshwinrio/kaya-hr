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

export const LIST_PUNCHES = gql(`
  query ListPunches($filter: ListPunchesFilter) {
    listPunches (filter: $filter) {
      activePunch {
        id
        startTime
        endTime
      }
      history {
        id
        startTime
        endTime
      }
    }
  }
`);

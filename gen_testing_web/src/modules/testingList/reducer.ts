import { FIND_MANY_GEN_TESTING_FAILURE, FIND_MANY_GEN_TESTING_REQUEST, FIND_MANY_GEN_TESTING_SUCCESS } from "./actionTypes"

const initialState = {
  isLoading: false,
  data: [],
}

export const testingListReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FIND_MANY_GEN_TESTING_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_MANY_GEN_TESTING_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_MANY_GEN_TESTING_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

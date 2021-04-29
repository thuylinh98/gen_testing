import { FIND_MANY_GEN_FAILURE, FIND_MANY_GEN_REQUEST, FIND_MANY_GEN_SUCCESS } from "./actionTypes"

const initialState = {
  isLoading: false,
  data: [],
}

export const genListReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FIND_MANY_GEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_MANY_GEN_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_MANY_GEN_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

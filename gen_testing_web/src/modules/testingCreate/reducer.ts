import { CREATE_GEN_TESTING_FAILURE, CREATE_GEN_TESTING_REQUEST, CREATE_GEN_TESTING_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const testingCreateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CREATE_GEN_TESTING_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_GEN_TESTING_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case CREATE_GEN_TESTING_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

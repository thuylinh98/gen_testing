import { SUB_GEN_TESTING_CREATE_FAILURE, SUB_GEN_TESTING_CREATE_REQUEST, SUB_GEN_TESTING_CREATE_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {},
}

export const subGenTestingInputReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SUB_GEN_TESTING_CREATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case SUB_GEN_TESTING_CREATE_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case SUB_GEN_TESTING_CREATE_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

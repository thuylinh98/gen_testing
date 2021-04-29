import { GEN_TESTING_INPUT_FAILURE, GEN_TESTING_INPUT_REQUEST, GEN_TESTING_INPUT_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {},
}

export const genTestingInputReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GEN_TESTING_INPUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GEN_TESTING_INPUT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case GEN_TESTING_INPUT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

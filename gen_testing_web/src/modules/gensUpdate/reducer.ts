import { FIND_ONE_GEN_FAILURE, FIND_ONE_GEN_REQUEST, FIND_ONE_GEN_SUCCESS, UPDATE_GEN_FAILURE, UPDATE_GEN_REQUEST, UPDATE_GEN_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const genUpdateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_GEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_GEN_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case UPDATE_GEN_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    case FIND_ONE_GEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_ONE_GEN_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_ONE_GEN_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

import { FIND_ONE_USER_FAILURE, FIND_ONE_USER_REQUEST, FIND_ONE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const userUpdateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case UPDATE_USER_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    case FIND_ONE_USER_REQUEST: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case FIND_ONE_USER_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_ONE_USER_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

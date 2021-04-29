import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {},
}

export const loginReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

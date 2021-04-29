import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const userCreateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CREATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_USER_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case CREATE_USER_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

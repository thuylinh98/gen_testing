import { FIND_MANY_USERS_FAILURE, FIND_MANY_USERS_REQUEST, FIND_MANY_USERS_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: []
}

export const userListReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FIND_MANY_USERS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_MANY_USERS_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_MANY_USERS_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

import { CREATE_GEN_FAILURE, CREATE_GEN_REQUEST, CREATE_GEN_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const genCreateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CREATE_GEN_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_GEN_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case CREATE_GEN_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

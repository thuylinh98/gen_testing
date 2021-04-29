import {
  GEN_TESTING_UPDATE_FAILURE,
  GEN_TESTING_UPDATE_REQUEST,
  GEN_TESTING_UPDATE_SUCCESS,
  GEN_TESTING_FIND_ONE_FAILURE,
  GEN_TESTING_FIND_ONE_REQUEST,
  GEN_TESTING_FIND_ONE_SUCCESS,
} from './actionTypes';

const initialState = {
  isLoading: false,
  data: {},
}

export const genTestingUpdateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case GEN_TESTING_UPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GEN_TESTING_UPDATE_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }

    case GEN_TESTING_UPDATE_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    case GEN_TESTING_FIND_ONE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GEN_TESTING_FIND_ONE_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }

    case GEN_TESTING_FIND_ONE_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    default:
      return state;
  }
}

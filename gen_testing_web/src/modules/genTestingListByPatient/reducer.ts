import {
  FIND_MANY_GEN_TESTINGS_BY_PATIENT_FAILURE,
  FIND_MANY_GEN_TESTINGS_BY_PATIENT_REQUEST,
  FIND_MANY_GEN_TESTINGS_BY_PATIENT_SUCCESS,
} from './actionTypes';

const initialState = {
  isLoading: false,
  data: []
}

export const genTestingListByPatientReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FIND_MANY_GEN_TESTINGS_BY_PATIENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_MANY_GEN_TESTINGS_BY_PATIENT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_MANY_GEN_TESTINGS_BY_PATIENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    default:
      return state;
  }
}

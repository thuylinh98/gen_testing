import { FIND_MANY_PATIENT_TESTING_RESULT_FAILURE, FIND_MANY_PATIENT_TESTING_RESULT_REQUEST, FIND_MANY_PATIENT_TESTING_RESULT_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: []
}

export const patientTestingDetailReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FIND_MANY_PATIENT_TESTING_RESULT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_MANY_PATIENT_TESTING_RESULT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_MANY_PATIENT_TESTING_RESULT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

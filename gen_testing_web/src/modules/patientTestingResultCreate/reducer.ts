import { CREATE_PATIENT_TESTING_RESULT_FAILURE, CREATE_PATIENT_TESTING_RESULT_REQUEST, CREATE_PATIENT_TESTING_RESULT_SUCCESS } 
from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const patientTestingResultCreateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CREATE_PATIENT_TESTING_RESULT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_PATIENT_TESTING_RESULT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case CREATE_PATIENT_TESTING_RESULT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

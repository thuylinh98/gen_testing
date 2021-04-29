import { CREATE_PATIENT_FAILURE, CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const patientCreateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case CREATE_PATIENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case CREATE_PATIENT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case CREATE_PATIENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

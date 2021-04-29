import { FIND_ONE_PATIENT_FAILURE, FIND_ONE_PATIENT_REQUEST, FIND_ONE_PATIENT_SUCCESS, UPDATE_PATIENT_FAILURE, UPDATE_PATIENT_REQUEST, UPDATE_PATIENT_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: {}
}

export const patientUpdateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case UPDATE_PATIENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case UPDATE_PATIENT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case UPDATE_PATIENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    case FIND_ONE_PATIENT_REQUEST: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case FIND_ONE_PATIENT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_ONE_PATIENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

import { PATIENT_TESTING_RESULT_UPDATE_FAILURE,
  PATIENT_TESTING_RESULT_UPDATE_REQUEST,
  PATIENT_TESTING_RESULT_UPDATE_SUCCESS,
  FIND_ONE_PATIENT_TESTING_RESULT_REQUEST,
  FIND_ONE_PATIENT_TESTING_RESULT_SUCCESS,
  FIND_ONE_PATIENT_TESTING_RESULT_FAILURE,
  FIND_ONE_GEN_TESTING_BY_PATIENT_SUCCESS,
  FIND_ONE_GEN_TESTING_BY_PATIENT_REQUEST,
  FIND_ONE_GEN_TESTING_BY_PATIENT_FAILURE
} from './actionTypes';
const initialState = {
  isLoading: false,
  data: {},
}

export const patientTestingResultUpdateReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case PATIENT_TESTING_RESULT_UPDATE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case PATIENT_TESTING_RESULT_UPDATE_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case PATIENT_TESTING_RESULT_UPDATE_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    case FIND_ONE_PATIENT_TESTING_RESULT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_ONE_PATIENT_TESTING_RESULT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_ONE_PATIENT_TESTING_RESULT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }

    case FIND_ONE_GEN_TESTING_BY_PATIENT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_ONE_GEN_TESTING_BY_PATIENT_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_ONE_GEN_TESTING_BY_PATIENT_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

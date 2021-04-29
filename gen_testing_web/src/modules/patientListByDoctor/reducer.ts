import { FIND_MANY_USERS_BY_DOCTOR_FAILURE, FIND_MANY_USERS_BY_DOCTOR_REQUEST, FIND_MANY_USERS_BY_DOCTOR_SUCCESS } from './actionTypes';

const initialState = {
  isLoading: false,
  data: []
}

export const patientListByDoctorReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case FIND_MANY_USERS_BY_DOCTOR_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FIND_MANY_USERS_BY_DOCTOR_SUCCESS: {
      return {
        ...state,
        data: payload.data,
        isLoading: false
      }
    }
    case FIND_MANY_USERS_BY_DOCTOR_FAILURE: {
      return {
        ...state,
        isLoading: false
      }
    }
    default:
      return state;
  }
}

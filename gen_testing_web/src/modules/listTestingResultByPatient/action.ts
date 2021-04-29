import { FIND_MANY_PATIENT_TESTING_RESULT_FAILURE, FIND_MANY_PATIENT_TESTING_RESULT_REQUEST, FIND_MANY_PATIENT_TESTING_RESULT_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';

export const findPatientTestingListResultAction = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MANY_PATIENT_TESTING_RESULT_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/testing_results`, {
          params
        });

      dispatch({
        type: FIND_MANY_PATIENT_TESTING_RESULT_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: FIND_MANY_PATIENT_TESTING_RESULT_FAILURE,
        payload: { error }
      })
    }
  }
}

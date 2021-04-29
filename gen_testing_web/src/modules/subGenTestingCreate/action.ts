import { SUB_GEN_TESTING_CREATE_FAILURE, SUB_GEN_TESTING_CREATE_REQUEST, SUB_GEN_TESTING_CREATE_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';

export const subGenTestingCreate = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: SUB_GEN_TESTING_CREATE_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/test_results`, payload.model);
      dispatch({
        type: SUB_GEN_TESTING_CREATE_SUCCESS,
        payload: { data }
      });
      payload.history.push('/gen_testing');
    } catch (error) {
      dispatch({
        type: SUB_GEN_TESTING_CREATE_FAILURE,
        payload: { error }
      })
    }
  }
}
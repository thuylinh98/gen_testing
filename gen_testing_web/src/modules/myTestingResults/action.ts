import { FIND_MY_TESTING_RESULT_FAILURE, FIND_MY_TESTING_RESULT_REQUEST, FIND_MY_TESTING_RESULT_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';

export const findMyTestingResults = (id: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MY_TESTING_RESULT_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/testing_results/${id}`);

        console.log(data);
        
      dispatch({
        type: FIND_MY_TESTING_RESULT_SUCCESS,
        payload: { data }
      })
    } catch (error) {
      dispatch({
        type: FIND_MY_TESTING_RESULT_FAILURE,
        payload: { error }
      });
    }
  }
}

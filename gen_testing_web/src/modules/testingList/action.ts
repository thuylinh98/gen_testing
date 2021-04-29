import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { FIND_MANY_GEN_TESTING_FAILURE, FIND_MANY_GEN_TESTING_REQUEST, FIND_MANY_GEN_TESTING_SUCCESS } from './actionTypes';

export const findManyTestingAction = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MANY_GEN_TESTING_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/testings`, {
          params,
        });
      dispatch({
        type: FIND_MANY_GEN_TESTING_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: FIND_MANY_GEN_TESTING_FAILURE,
        payload: { error }
      });
    }
  }
}
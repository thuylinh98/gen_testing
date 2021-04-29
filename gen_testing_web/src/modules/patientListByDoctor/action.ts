import { FIND_MANY_USERS_BY_DOCTOR_FAILURE, FIND_MANY_USERS_BY_DOCTOR_REQUEST, FIND_MANY_USERS_BY_DOCTOR_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';

export const findManyUsers = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MANY_USERS_BY_DOCTOR_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/users`, {
          params
        });
      dispatch({
        type: FIND_MANY_USERS_BY_DOCTOR_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: FIND_MANY_USERS_BY_DOCTOR_FAILURE,
        payload: { error }
      })
    }
  }
}

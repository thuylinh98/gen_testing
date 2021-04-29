import axios from '../../shared/axios/axios.service';
import { checkError } from '../../shared/helpers/checkError';
import { apiUrl } from '../config/config.service';
import { FIND_MANY_GEN_FAILURE, FIND_MANY_GEN_REQUEST, FIND_MANY_GEN_SUCCESS } from './actionTypes';
import { notification } from 'antd';

export const findManyGenAction = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MANY_GEN_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/gens`, {
          params,
        });
      dispatch({
        type: FIND_MANY_GEN_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: FIND_MANY_GEN_FAILURE,
        payload: { error }
      });

      const description = checkError(error);

      notification.open({
        message: 'Thông báo',
        description,
      });
    }
  }
}
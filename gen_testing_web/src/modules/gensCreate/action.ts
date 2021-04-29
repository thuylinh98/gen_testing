import { CREATE_GEN_FAILURE, CREATE_GEN_REQUEST, CREATE_GEN_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';
import { checkError } from '../../shared/helpers/checkError';

export const createGenAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: CREATE_GEN_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/gens`, payload.model);
      dispatch({
        type: CREATE_GEN_SUCCESS,
        payload: { data }
      })
      payload.history.push('/gens');
    } catch (error) {
      dispatch({
        type: CREATE_GEN_FAILURE,
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
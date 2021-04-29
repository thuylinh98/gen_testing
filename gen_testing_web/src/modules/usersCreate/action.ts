import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';

export const createUserAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: CREATE_USER_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/users/create`, payload.model);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: { data }
      })
      payload.history.push('/users');
    } catch (error) {
      dispatch({
        type: CREATE_USER_FAILURE,
        payload: { error }
      });
      notification.open({
        message: 'Thông báo',
        description: 'Vui lòng nhập dữ liệu hợp lệ',
      });
    }
  }
}
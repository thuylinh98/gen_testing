import { FIND_ONE_USER_FAILURE, FIND_ONE_USER_REQUEST, FIND_ONE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';

export const updateUserAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    try {
      const { data } = await axios.put(`${apiUrl}/users/${payload.model.id}`, payload.model);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { data }
      });
      payload.history.push('/users');
      notification.open({
        message: 'Thông báo',
        description: 'Chỉnh sửa thành công',
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE,
        payload: { error }
      });
      notification.open({
        message: 'Thông báo',
        description: 'Vui lòng nhập dữ liệu hợp lệ',
      });
    }
  }
}

export const findOneUserAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_ONE_USER_REQUEST,
    });
    try {
      const { data } = await axios.get(`${apiUrl}/users/${id}`);
      console.log(data);
      
      dispatch({
        type: FIND_ONE_USER_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: FIND_ONE_USER_FAILURE,
        payload: { error }
      });
    }
  }
}

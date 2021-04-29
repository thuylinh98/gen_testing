import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';

export const loginAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/auth/login`, payload.model);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data }
      });

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userID', data.userID);

      if (data.role === 'PATIENT') {
        payload.history.push('/patients/my_result');
      }

      if (data.role === 'DOCTOR') {
        payload.history.push('/patients');
      }

      if (data.role === 'ADMIN') {
        payload.history.push('/users');
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { error }
      });
      notification.open({
        message: 'Thông báo',
        description: 'Sai tài khoản hoặc mật khẩu',
      });
    }
  }
}
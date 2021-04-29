import { CREATE_PATIENT_FAILURE, CREATE_PATIENT_REQUEST, CREATE_PATIENT_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';

export const createPatientAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: CREATE_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/users/create`, payload.model);
      dispatch({
        type: CREATE_PATIENT_SUCCESS,
        payload: { data }
      })
      payload.history.push('/patients');
    } catch (error) {
      dispatch({
        type: CREATE_PATIENT_FAILURE,
        payload: { error }
      });
      notification.open({
        message: 'Thông báo',
        description: 'Vui lòng nhập dữ liệu hợp lệ',
      });
    }
  }
}
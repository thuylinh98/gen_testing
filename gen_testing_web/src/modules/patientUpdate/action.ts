import { FIND_ONE_PATIENT_FAILURE, FIND_ONE_PATIENT_REQUEST, FIND_ONE_PATIENT_SUCCESS, UPDATE_PATIENT_FAILURE, UPDATE_PATIENT_REQUEST, UPDATE_PATIENT_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';

export const updatePatientAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: UPDATE_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios.put(`${apiUrl}/users/${payload.model.id}`, payload.model);
      dispatch({
        type: UPDATE_PATIENT_SUCCESS,
        payload: { data }
      });
      payload.history.push('/patients');
      notification.open({
        message: 'Thông báo',
        description: 'Chỉnh sửa thành công',
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PATIENT_FAILURE,
        payload: { error }
      });
      notification.open({
        message: 'Thông báo',
        description: 'Vui lòng nhập dữ liệu hợp lệ',
      });
    }
  }
}

export const findOnePatientAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_ONE_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios.get(`${apiUrl}/users/${id}`);

      dispatch({
        type: FIND_ONE_PATIENT_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: FIND_ONE_PATIENT_FAILURE,
        payload: { error }
      });
    }
  }
}

import { CREATE_PATIENT_TESTING_RESULT_FAILURE, CREATE_PATIENT_TESTING_RESULT_REQUEST, CREATE_PATIENT_TESTING_RESULT_SUCCESS } 
from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';
import { checkError } from '../../shared/helpers/checkError';

export const patientTestingResultCreateAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: CREATE_PATIENT_TESTING_RESULT_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/testing_results`, payload.model);
      dispatch({
        type: CREATE_PATIENT_TESTING_RESULT_SUCCESS,
        payload: { data }
      })
      payload.history.push(`/patients/${payload.model.patient}/detail`);
    } catch (error) {
      dispatch({
        type: CREATE_PATIENT_TESTING_RESULT_FAILURE,
        payload: { error }
      });

      const description  = checkError(error)
      notification.open({
        message: 'Thông báo',
        description,
      });
    }
  }
}
import {
  FIND_PATIENT_TESTING_RESULT_FAILURE, FIND_PATIENT_TESTING_RESULT_REQUEST, FIND_PATIENT_TESTING_RESULT_SUCCESS,
  SEND_MAIL_TO_PATIENT_FAILURE, SEND_MAIL_TO_PATIENT_REQUEST, SEND_MAIL_TO_PATIENT_SUCCESS
} from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';

export const findPaitientTestingResult = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_PATIENT_TESTING_RESULT_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/testing_results`, {
          params
        });

      dispatch({
        type: FIND_PATIENT_TESTING_RESULT_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: FIND_PATIENT_TESTING_RESULT_FAILURE,
        payload: { error }
      })
    }
  }
}

export const sendMailToPatientAction = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: SEND_MAIL_TO_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/mailer/sendToPatient`, {
          patient: params.patient
        });

        console.log(data);
        
      dispatch({
        type: SEND_MAIL_TO_PATIENT_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: SEND_MAIL_TO_PATIENT_FAILURE,
        payload: { error }
      })
    }
  }
}

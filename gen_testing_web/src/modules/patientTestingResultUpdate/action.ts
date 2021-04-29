import { PATIENT_TESTING_RESULT_UPDATE_FAILURE,
  PATIENT_TESTING_RESULT_UPDATE_REQUEST,
  PATIENT_TESTING_RESULT_UPDATE_SUCCESS,
  FIND_ONE_PATIENT_TESTING_RESULT_REQUEST,
  FIND_ONE_PATIENT_TESTING_RESULT_SUCCESS,
  FIND_ONE_PATIENT_TESTING_RESULT_FAILURE,
  FIND_ONE_GEN_TESTING_BY_PATIENT_FAILURE,
  FIND_ONE_GEN_TESTING_BY_PATIENT_SUCCESS,
  FIND_ONE_GEN_TESTING_BY_PATIENT_REQUEST
} from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { checkError } from '../../shared/helpers/checkError';
import { notification } from 'antd';
import { findManyGenTestings } from '../genTestingList/action';

export const patientTestingResultUpdateAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: PATIENT_TESTING_RESULT_UPDATE_REQUEST,
    });
    try {
      console.log(payload.model);
      console.log(payload.testingResultId);
      const { data } = await axios
        .put(`${apiUrl}/testing_results/${payload.testingResultId}`, payload.model);
      dispatch({
        type: PATIENT_TESTING_RESULT_UPDATE_SUCCESS,
        payload: { data }
      });
      payload.history.push(`/patients/${payload.patientId}/detail`);
    } catch (error) {
      dispatch({
        type: PATIENT_TESTING_RESULT_UPDATE_FAILURE,
        payload: { error }
      })

      const description = checkError(error);

      notification.open({
        message: 'Thông báo',
        description,
      });
    }
  }
}

export const findOnePatientTestingResultAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_ONE_PATIENT_TESTING_RESULT_REQUEST,
    });
    try {
      const { data } = await axios.get(`${apiUrl}/testing_results/${id}`);

      dispatch({
        type: FIND_ONE_PATIENT_TESTING_RESULT_SUCCESS,
        payload: { data }
      });

      dispatch(findManyGenTestings({
        testingId: data?.testingId._id
      }));
    } catch (error) {
      dispatch({
        type: FIND_ONE_PATIENT_TESTING_RESULT_FAILURE,
        payload: { error }
      });
    }
  }
}


export const findOneGenTesting = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_ONE_GEN_TESTING_BY_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/test_results/${id}`);
      dispatch({
        type: FIND_ONE_GEN_TESTING_BY_PATIENT_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: FIND_ONE_GEN_TESTING_BY_PATIENT_FAILURE,
        payload: { error }
      })

      const description = checkError(error);
      notification.open({
        message: 'Thông báo',
        description,
      });
    }
  }
}
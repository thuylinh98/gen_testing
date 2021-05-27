import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import {
  FIND_MANY_GEN_TESTINGS_BY_PATIENT_FAILURE,
  FIND_MANY_GEN_TESTINGS_BY_PATIENT_REQUEST,
  FIND_MANY_GEN_TESTINGS_BY_PATIENT_SUCCESS,
  FIND_ONE_TESTING_RESULT_BY_PATIENT_REQUEST,
  FIND_ONE_TESTING_RESULT_BY_PATIENT_SUCCESS,
  FIND_ONE_TESTING_RESULT_BY_PATIENT_FAILURE
} from './actionTypes';

export const findManyGenTestings = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MANY_GEN_TESTINGS_BY_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/test_results`, { params });
      dispatch({
        type: FIND_MANY_GEN_TESTINGS_BY_PATIENT_SUCCESS,
        payload: { data: data.list }
      })

    } catch (error) {
      dispatch({
        type: FIND_MANY_GEN_TESTINGS_BY_PATIENT_FAILURE,
        payload: { error }
      })
    }
  }
}

export const findOneTestingResult = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_ONE_TESTING_RESULT_BY_PATIENT_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/testing_results/${id}`);
      dispatch({
        type: FIND_ONE_TESTING_RESULT_BY_PATIENT_SUCCESS,
        payload: { data }
      })

      dispatch(findManyGenTestings({
        testingId: data?.testingId?._id
      }))
    } catch (error) {
      dispatch({
        type: FIND_ONE_TESTING_RESULT_BY_PATIENT_FAILURE,
        payload: { error }
      })
    }
  }
}

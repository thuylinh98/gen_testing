import { GEN_TESTING_INPUT_FAILURE, GEN_TESTING_INPUT_REQUEST, GEN_TESTING_INPUT_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { checkError } from '../../shared/helpers/checkError';
import { notification } from 'antd';



export const genTestingInput = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: GEN_TESTING_INPUT_REQUEST,
    });
    try {
      const { data } = await axios
        .post(`${apiUrl}/test_results`, payload.model);
      dispatch({
        type: GEN_TESTING_INPUT_SUCCESS,
        payload: { data }
      });
      payload.history.push(`/gen_testing/${payload?.model?.testingId}/results`);
    } catch (error) {
      dispatch({
        type: GEN_TESTING_INPUT_FAILURE,
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
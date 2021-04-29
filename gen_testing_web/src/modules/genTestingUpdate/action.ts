import {
  GEN_TESTING_UPDATE_FAILURE,
  GEN_TESTING_UPDATE_REQUEST,
  GEN_TESTING_UPDATE_SUCCESS,
  GEN_TESTING_FIND_ONE_FAILURE,
  GEN_TESTING_FIND_ONE_REQUEST,
  GEN_TESTING_FIND_ONE_SUCCESS,
} from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { checkError } from '../../shared/helpers/checkError';
import { notification } from 'antd';



export const genTestingUpdate = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: GEN_TESTING_UPDATE_REQUEST,
    });
    try {
      const { data } = await axios
        .put(`${apiUrl}/test_results/${payload.model.id}`, payload.model);
      dispatch({
        type: GEN_TESTING_UPDATE_SUCCESS,
        payload: { data }
      });
      payload.history.push(`/gen_testing/${payload?.model?.testingId}/results`);

      notification.open({
        message: 'Thông báo',
        description: 'Thực hiện chỉnh sửa thành công',
      });
    } catch (error) {
      dispatch({
        type: GEN_TESTING_UPDATE_FAILURE,
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

export const findOneGenTesting = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: GEN_TESTING_FIND_ONE_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/test_results/${id}`);
      dispatch({
        type: GEN_TESTING_FIND_ONE_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: GEN_TESTING_FIND_ONE_FAILURE,
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
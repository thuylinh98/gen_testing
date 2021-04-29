import {
  FIND_ONE_GEN_FAILURE,
  FIND_ONE_GEN_REQUEST,
  FIND_ONE_GEN_SUCCESS,
  UPDATE_GEN_FAILURE,
  UPDATE_GEN_REQUEST,
  UPDATE_GEN_SUCCESS,
} from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';
import { checkError } from '../../shared/helpers/checkError';

export const updateGenAction = (payload: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: UPDATE_GEN_REQUEST,
    });
    try {
      const { data } = await axios
        .put(`${apiUrl}/gens/${payload.model.id}`, payload.model);
      dispatch({
        type: UPDATE_GEN_SUCCESS,
        payload: { data }
      })
      payload.history.push('/gens');
    } catch (error) {
      dispatch({
        type: UPDATE_GEN_FAILURE,
        payload: { error }
      });

      const description = checkError(error);

      notification.open({
        message: 'Thông báo',
        description,
      });
    }
  }
}

export const findOneGenAction = (id: string) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_ONE_GEN_REQUEST,
    });
    try {
      const { data } = await axios.get(`${apiUrl}/gens/${id}`);

      dispatch({
        type: FIND_ONE_GEN_SUCCESS,
        payload: { data }
      });
    } catch (error) {
      dispatch({
        type: FIND_ONE_GEN_FAILURE,
        payload: { error }
      });

      const description = checkError(error);

      notification.open({
        message: 'Thông báo',
        description,
      });
    }
  }
}
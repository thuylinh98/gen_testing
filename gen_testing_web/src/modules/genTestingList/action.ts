import { DELETE_GEN_TESTINGS_FAILURE, DELETE_GEN_TESTINGS_REQUEST, DELETE_GEN_TESTINGS_SUCCESS, FIND_MANY_GEN_TESTINGS_FAILURE, FIND_MANY_GEN_TESTINGS_REQUEST, FIND_MANY_GEN_TESTINGS_SUCCESS } from './actionTypes';
import axios from '../../shared/axios/axios.service';
import { apiUrl } from '../config/config.service';
import { notification } from 'antd';

export const findManyGenTestings = (params: any) => {
  return async (dispatch: any) => {
    dispatch({
      type: FIND_MANY_GEN_TESTINGS_REQUEST,
    });
    try {
      const { data } = await axios
        .get(`${apiUrl}/test_results`, { params });
      dispatch({
        type: FIND_MANY_GEN_TESTINGS_SUCCESS,
        payload: { data: data.list }
      })
    } catch (error) {
      dispatch({
        type: FIND_MANY_GEN_TESTINGS_FAILURE,
        payload: { error }
      })
    }
  }
}

export const deleteGenTestings = (id: string) => {  
  return async (dispatch: any) => {
    dispatch({
      type: DELETE_GEN_TESTINGS_REQUEST,
    });
    try {
      const { data } = await axios
        .delete(`${apiUrl}/test_results/${id}`);
      dispatch({
        type: DELETE_GEN_TESTINGS_SUCCESS,
        payload: { data: data }
      })
      // reload list gentesting (GenTestingList component)
      dispatch(findManyGenTestings({}));
      notification.open({
        message: 'Thông báo',
        description: 'Xoá dữ liệu kiểm thử gen thành công',
      });
    } catch (error) {
      dispatch({
        type: DELETE_GEN_TESTINGS_FAILURE,
        payload: { error }
      })
    }
  }
}

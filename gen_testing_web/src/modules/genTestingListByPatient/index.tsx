/* eslint-disable no-restricted-globals */
import { Breadcrumb, Button, Col, Row, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { findManyGenTestings, findOneTestingResult } from './action';
import moment from 'moment';
import { EditOutlined } from '@ant-design/icons';


export const GenTestingListByPatient = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.genTestingListByPatient.data);
  const isLoading = useSelector((state: any) => state.genTestingListByPatient.isLoading);
  const params: any = useParams();

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findOneTestingResult(params?.testingResultId));
  }

  const columns = [
    {
      title: 'Tên xét nghiệm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Người tạo',
      dataIndex: ['createdBy', 'fullname'],
      key: 'createdBy.fullName',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string, record: any, index: any): any => {
        return moment(text).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any, index: any): any => {
        return (
          <>
           <Link to={`/patients/${params.id}/testing_results/${params.testingResultId}/update/${record._id}`}>
            <Button icon={<EditOutlined />} type='primary' />
          </Link>
          </>
        );
      }
    },
  ];

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/gen_testing'}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý xét nghiệm</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ marginBottom: 20 }} justify='space-between'>
        {/* <Col span={8}>
          <Link to={`/gen_testing/${params.id}/results/input`}>
            <Button icon={<PlusOutlined />} type='primary'>Thêm mới</Button>
          </Link>
        </Col> */}
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

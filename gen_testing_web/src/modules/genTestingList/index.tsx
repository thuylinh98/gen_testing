/* eslint-disable no-restricted-globals */
import { Breadcrumb, Button, Col, Row, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { deleteGenTestings, findManyGenTestings } from './action';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import { DeleteOutlined , EditOutlined} from '@ant-design/icons';

const summaryGenTestingRecord = (record: any) => {
  const gens = record?.gens;
  const recommends = record?.recommends;
  const results = record?.results;
  const summary = `Có ${gens?.length || 0} gens, ${recommends?.length || 0} khuyến nghị và ${results.length || 0} kết quả`;
  return (<div>{summary}</div>);
};

export const GenTestingList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.genTestingList.data);
  const isLoading = useSelector((state: any) => state.genTestingList.isLoading);
  const params: any = useParams();

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findManyGenTestings({ testingId: params.id }));
  }

  const deleteTestingResultHandler = (id: any) => {
    const confirmed = confirm('Bạn có muốn xóa kết quả này');
    if (confirmed) {
      dispatch(deleteGenTestings(id));
    }
  }

  const columns = [
    {
      title: 'Tên xét nghiệm',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Tổng quan',
    //   dataIndex: 'summary',
    //   key: 'summary',
    //   render: (text: string, record: any, index: any): any => {
    //     return summaryGenTestingRecord(record);
    //   }
    // },
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
          <Button type='primary' danger icon={<DeleteOutlined />}
            onClick={() => deleteTestingResultHandler(record._id)}
          /><span> </span>
           <Link to={`/gen_testing/${record.testingId}/results/${record._id}/update`}>
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
        <Col span={8}>
          <Link to={`/gen_testing/${params.id}/results/input`}>
            <Button icon={<PlusOutlined />} type='primary'>Thêm mới</Button>
          </Link>
        </Col>
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

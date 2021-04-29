/* eslint-disable no-restricted-globals */
import { Breadcrumb, Button, Row, Col, Table } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { findManyGenAction } from './action';
import { DeleteOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

export const GenList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.genList.data);
  const isLoading = useSelector((state: any) => state.genList.isLoading);

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findManyGenAction({}));
  }

  const deleteGenHandler = (id: any) => {
    const confirmed = confirm('Bạn có muốn xóa kết quả này');
    if (confirmed) {
      //dispatch();
    }
  }

  const updateGenHandler = (id: any) => {
   //
  }

  const columns = [
    {
      title: 'Tên gen',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại gen',
      dataIndex: 'property',
      key: 'property',
    },
    {
      title: 'Thuộc tính',
      dataIndex: 'property',
      key: 'property',
    },
    {
      title: 'Ảnh hưởng',
      dataIndex: 'affect',
      key: 'affect',
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
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
          <Link to={`gens/${record._id}`}>
            <Button icon={<DeleteOutlined />} type='primary' danger
            onClick={() => deleteGenHandler(record._id)}
            ></Button>
          </Link>
          <span> </span>
          <Link to={`gens/${record._id}`}>
            <Button icon={<EditOutlined />} type='primary'
            onClick={() => updateGenHandler(record._id)}
            ></Button>
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
        <Breadcrumb.Item>Quản lý gen</Breadcrumb.Item>
      </Breadcrumb>
      <Row style={{ marginBottom: 20 }} justify='space-between'>
        <Col span={8}>
          <Link to='/gens/create'>
            <Button icon={<PlusOutlined />} type='primary'>Thêm gen</Button>
          </Link>
        </Col>
      </Row>
      <Table loading={isLoading} columns={columns} dataSource={data} pagination={false} />
    </>
  );
}

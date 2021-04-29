import { Breadcrumb, Form, Input, Button, Row, Col } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { findMyTestingResults } from './action';
import { Descriptions } from 'antd';

export const MyTestingResults = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const data = useSelector((state: any) => state.myTestingResults.data);
  // const isLoading = useSelector((state: any) => state.myTestingResults.isLoading);
  const params: any = useParams();

  useEffect(() => {
    onInit();
  }, []);

  const onInit = () => {
    dispatch(findMyTestingResults(params.id));
  }

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to={'/gen_testing'}>Trang chủ</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Kết quả thử xét nghiêm</Breadcrumb.Item>
      </Breadcrumb>
      <Row className='myTestingResults'>
        <Row>
          <Descriptions title={`Kết quả chi tiết: ${data?.testingId?.name}`} bordered>
            {/* <Descriptions.Item label="Tên xét nghiệm">{data.name}</Descriptions.Item> */}
            <Descriptions.Item label="Tên bệnh nhân" >{data?.patient?.fullname}</Descriptions.Item>
            <Descriptions.Item label="Bác sĩ xét tạo nghiệm">{data?.createdBy?.fullname}</Descriptions.Item>
            {/* <Descriptions.Item label="Mô tả" span={3}>{data.description}</Descriptions.Item> */}
          </Descriptions>
        </Row>
        {
          data?.testResult?.map((result: any) => {
            return (
              <>
                <Descriptions bordered>
                  <Descriptions.Item label="Tên xét nghiệm">{result.name}</Descriptions.Item>
                  <Descriptions.Item span={3} label="Mô tả" >{result.description}</Descriptions.Item>
                </Descriptions>
                <Row className="result_detail">
                  <Descriptions title="Các gen phân tích" >
                    {
                      result?.gens?.map((e: any) => {
                        return (
                          <>
                            <Descriptions.Item label="Tên gen" >{e.name}</Descriptions.Item>
                            <Descriptions.Item label="Kiểu gen">{e.type}</Descriptions.Item>
                            <Descriptions.Item label="Tính chất gen" >{e.property}</Descriptions.Item>
                            <Descriptions.Item label="Ảnh hưởng">{e.affect}</Descriptions.Item>
                            <Descriptions.Item label="Nội dung" >{e.content}</Descriptions.Item>
                          </>
                        )
                      })
                    }
                  </Descriptions>
                </Row>

                <Row className="result_detail" >
                  <Descriptions title="Kết quả và ý nghĩa">
                    {
                      result?.results?.map((e: any) => {
                        return (
                          <>
                            <Descriptions.Item label="Kết quả" span={3}>{e.result}</Descriptions.Item>
                            <Descriptions.Item label="Ý nghĩa" span={3}>{e.content}</Descriptions.Item>
                          </>
                        )
                      })
                    }
                  </Descriptions>
                </Row>

                <Row className="result_detail">
                  <Descriptions title="Khuyến nghị cho bạn">
                    {
                      result?.recommends?.map((e: any) => {
                        return (
                          <>
                            <Descriptions.Item label="Tiêu đề" span={3}>{e.recommend}</Descriptions.Item>
                            <Descriptions.Item label="Nội dung" span={3}>{e.content}</Descriptions.Item>
                          </>
                        )
                      })
                    }
                  </Descriptions>
                </Row>
              </>
            )
          })
        }
      </Row>
    </>
  );
}

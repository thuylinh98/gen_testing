export const checkError = (error: any) => {
  let description = 'Vui lòng nhập dữ liệu hợp lệ';

  if (error?.response?.data?.code === 403 ) {
    description = 'Bạn không có quyền thực hiện';
  }

  if (error?.response?.data?.name) {
    description = error?.response?.data?.name
  }

  return description;

}
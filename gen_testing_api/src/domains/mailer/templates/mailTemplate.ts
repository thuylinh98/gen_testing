import { commonCSS } from './common.css';

export const mailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>${commonCSS}</style>
</head>
<body>
<div class="body">
  <div class="content">
    <div>Xin chào {{username}},</div>
    <br>
    <div class="description">Kết quả xet nghiệm đã có, vui lòng truy cập website để xem kết quả</div>
    <br>
  <div>
</div>
</body>
</html>
`;

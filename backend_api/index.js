//nhập mô-đun express
const express = require('express');
const mongoose = require('mongoose');
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');

//xác định cổng mà máy chủ sẽ lắng nghe
const PORT = 3000;
//tạo một phiên bản của ứng dụng express
//bởi vì nó cho chúng ta điểm khởi đầu
const app = express();
// Middleware để parse JSON
app.use(express.json());
//middleware - để đăng ký bộ định tuyến hoặc gắn kết các tuyến đường

//mongodb string
const DB = "mongodb+srv://hau99082005:Hau22082005@cluster0.wcl30ip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

app.use(categoryRoute);
app.use(productRoute);

mongoose.connect(DB).then(() => {
    console.log('Mogondb Connected');
})

//khởi động máy chủ và lắng nghe cổng
app.listen(PORT, "0.0.0.0", function() {
    //Log number
    console.log(`server is running on port ${PORT}`);
})
let multer=require('multer');

let path =require('path')
let storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    console.log('图片上传成功');
    cb(null, path.join(__dirname,'../dist/bgImages/'))
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".");
    // cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    cb(null, file.fieldname +".png" );
  }
});


//添加配置文件到muler对象。
let upload = multer({
  storage:storage
});

//如需其他设置，请参考multer的limits,使用方法如下。
//let upload = multer({
//    storage: storage,
//    limits:{}
// });

//导出对象
module.exports = upload;
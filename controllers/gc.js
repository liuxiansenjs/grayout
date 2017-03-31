const fs = require('fs');
const url = require('url');
const Upload = require('../models/db_c_uploads.js');
//const db = require('../models/db.js');
const formidable = require('formidable');
const path = require('path');

const getHomePage = (req, res) => {
  res.render('index');
}

const insertData = (req, res) => {
  const form = new formidable.IncomingForm();
  form.uploadDir = `./transfer`;
  form.parse(req, function(err, fields, files) {
    //fields 表示普通控件
    //files 表示文件控件
    //console.log(fields, files);
    //验证是否有wenjian这个控件，为了鲁棒考虑的
    //console.log(path.extname(files.photo.name));
    console.log(fields);
    if (path.extname(files.photo.name) !== '.JPG' || (fields.name.length == 0)){
      res.send("<p>客官请爆照 ^-^ <a href='/'>返回</a></p>")
      return;
    }
    //拓展名
    const _id = Number(new Date()).toString();
    const _name = fields.name;
    const extname = path.extname(files.photo.name);
    //改名，因为formidable天生传输的文件是没有拓展名的
    //fs的rename方法用来改名。files.wenjian.path就是它默认的路径+文件名，改名为默认的路径+文件名+拓展名
    fs.rename(files.photo.path , './public/uploads/' + _id + extname, function(){
      const _filepath = '/uploads/' + _id + extname;
      //db.test();
      //用Mongoose存储数据

    new Upload({
        id: _id,
        name: _name,
        filepath: _filepath,
        grades: []
      }).save();
      //db.add2db(_id, _name, _filepath);
      res.send("<p>上传成功！<a href='/'>返回</a></p>");
    });
  });
};

const getPhotoData = function (req, res) {
  Upload.findLastTenPhotos(function(msg, results) {
    if (msg) {
      res.end('客官息怒，攻城狮已被BUGS打败。。。');
      return;
    }
    console.log(results);
    res.send(results);
  })
}

const grade = function (req, res) {
  const pathname = url.parse(req.url, true);
  //console.log(pathname);
  const id = pathname.query.id;
  console.log(id);
  const grade = parseInt(pathname.query.grade);
  if ([1,2,3,4,5].indexOf(grade) == -1) {
    res.send('禁止作弊！！！否则本网站放大招了')
    return;
  }

  Upload.updateGradeById(id, grade, function(err) {
    if(err) {
      res.send(err);
    }
    res.send('评价成功，TA是不会知道的。。。');
  })
}


module.exports = {
  getHomePage,
  insertData,
  getPhotoData,
  grade
}

//引入mongoose，mongoose的依赖中自动有mongodb的，所以不需要再次引入mongodb
const mongoose = require('mongoose');

//链接数据库，端口号不需要写，最后的反斜杠是数据库名字
mongoose.connect('mongodb://localhost/grayout');

//第一步，创建一个schema
const uploadSchema = new mongoose.Schema({
  id : String,
	name 	: String,
  filepath: String,
	grades 	: [Number],
});


//MyModel.find(condition, fields, {sort: [['_id', -1]]}, callback);
//find({}).sort({'_id':-1}).limit(6).exec(function(err,docs){})
// uploadSchema.static.findLastTenPhotos = function (callback) {
//   this.find({}).sort({'_id': -1}).limit(10).exec(function(err, results) {
//     if (err) {
//       callback('Error. Cannot find results.');
//     } else {
//       callback(undefined, results);
//     }
//   })
// }

uploadSchema.statics.findLastTenPhotos = function(callback) {
  this.find({}).exec(function(err, results) {
    if (err) {
      callback('Error. Cannot find results.');
    } else {
      callback(undefined, results);
    }
  })
}

uploadSchema.statics.updateGradeById = function(id, grade, callback) {
  this.find({id: id}).exec(function(err, results) {
    if (err) {
      callback('不要作弊哦，这个程序很鲁棒！');
    }
    if (results.length == 0) {
      callback('不要作弊哦，这个程序很鲁棒！');
      return;
    }
      results[0].updateGrades(grade);
      callback(undefined, '已经评价成功！')
  })
}

uploadSchema.methods.updateGrades = function(grade) {
  this.grades.push(grade);
  this.save();
}

//第二部，创建一个类，mongoose的model
const Upload = mongoose.model("Upload",uploadSchema);

// Upload.findLastTenPhotos(function(msg, results) {
//   if (msg) {
//     res.end('客官息怒，攻城狮已被BUGS打败。。。');
//     return;
//   }
//   console.log(results);
// })

module.exports = Upload;

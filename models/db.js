var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/grayout';

// Use connect method to connect to the server

var test = () => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.close();
  });
}

var add2db = (id, name, filepath) => {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db.collection("userdata").insertOne(
		{
			id: id,
      name: name.toLowerCase(),
      filepath: filepath
		},
		function(err,r){
			//回调函数
			if(err){
				console.log("插入数据失败！");
				return;
			}

			//r是所有的数据库变动信息，常用的r.insertedCount表示插入的条目数量
			console.log("成功插入了" + r.insertedCount + "条数据");

			//关闭数据库
			db.close();
		});
  });
}

module.exports = {
  test,
  add2db
}

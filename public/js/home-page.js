//#d6007f
var templatehtml = $("#photo-list").html();
var compiler = _.template(templatehtml);

function fetchData () {
  $.get("/getphotos",function(datas){
    var combinedStr = "";
    var id_array = [];
    _.each(datas , function(data){
      //console.log(data);
      id_array.push(data.id);

      var grade = data.grades.length == 0 ? '未有人吐槽' : (data.grades.reduce(function(pre, next) {
        return pre + next;
      })/data.grades.length).toFixed(1);

      // 'POST': /grade



      var photoStr = compiler({
        "id": data.id,
        "name": data.name,
        "grade": grade,
        "filepath": data.filepath
      });
      //上DOM
      combinedStr += photoStr;
      //$(photoStr).append("#post-it");
      //$('#post-html').html(combinedStr);

    });
    $('#post-html').html(combinedStr);

    id_array.forEach(function(id) {
      $('#grade_1_'+id).click(function(e) {
        console.log(id, '才给我一颗星');
        //
        $.get('/grade', {
          id: id,
          grade: 1
        }, function(res) {
          alert(res);
          fetchData();

        })

      });

      $('#grade_2_'+id).click(function(e) {
        console.log(id, '才给我两颗星');
        //
        $.get('/grade', {
          id: id,
          grade: 2
        }, function(res) {
          alert(res);
          fetchData();

        })

      });

      $('#grade_3_'+id).click(function(e) {
        console.log(id, '勉强及格');
        //
        $.get('/grade', {
          id: id,
          grade: 3
        }, function(res) {
          alert(res);
          fetchData();

        })

      });

      $('#grade_4_'+id).click(function(e) {
        console.log(id, '如果满分是10分，那颜值8分也不低了');
        //
        $.get('/grade', {
          id: id,
          grade: 4
        }, function(res) {
          alert(res);
          fetchData();
        })

      })

      $('#grade_5_'+id).click(function(e) {
        console.log(id, '哇！给了我五颗星，颜值高是一种怎样的体验');
        //
        $.get('/grade', {
          id: id,
          grade: 5
        }, function(res) {
          alert(res);
          fetchData();
        })

      });
    })




    // $('#refresh').click(function(e) {
    //   $.get("/getphotos",function(_datas){
    //     _.each(_datas, function(_data){
    //       var _grade = _data.grades.length == 0 ? '未有人吐槽' : _data.grades.reduce(function(pre, next) {
    //         return pre + next;
    //       })/_data.grades.length.toFixed(1);
    //
    //
    //
    //       if(id_array.indexOf(_data.id) != -1) {
    //         return;
    //       }
    //
    //       var photoStr = compiler({
    //         "id": _data.id,
    //         "name": _data.name,
    //         "grade": _grade,
    //         "filepath": _data.filepath
    //       });
    //       $(photoStr).appendTo("#post-it");
    //     });
    //   })
    // });
  });
}

fetchData();

$('#refresh').click(function(e) {
  fetchData();
});




// <div class="row message">
//   <div class="col-12">
//     <div class="message-content">
//       <div class="message-head">@@= name@@</div>
//       <div class=""><img src="@@= filepath@@" class="img-fluid" alt="">
//         <div>
//           <a href="javascript: void(0)" id="@@= 'grade_1_' + id@@"><img src="/imgs/grade.png" class="tiny-icon"></a>
//           <a href="javascript: void(0)" id="@@= 'grade_2_' + id@@"><img src="/imgs/grade.png" class="tiny-icon"></a>
//           <a href="javascript: void(0)" id="@@= 'grade_3_' + id@@"><img src="/imgs/grade.png" class="tiny-icon"></a>
//           <a href="javascript: void(0)" id="@@= 'grade_4_' + id@@"><img src="/imgs/grade.png" class="tiny-icon"></a>
//           <a href="javascript: void(0)" id="@@= 'grade_5_' + id@@"><img src="/imgs/grade.png" class="tiny-icon"></a>
//           <span> grayout评分:@@= grade@@</span>
//
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

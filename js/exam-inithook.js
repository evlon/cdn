(function() {

    function examPageIniter(examId) {
        var qmap = _$q$_ = {allData:null,q:null};

        function initAnswerForm(){

            var _cu = app.global.currentUser;

            if($("div.dashang").length == 0 && _cu.organization.name.indexOf('全') == -1){
                var docHeight = $(document).height(); //获取窗口高度
   
                $('body').append('<div id="overlay"><div style="text-align:center;"><img  src="https://cdn.jsdelivr.net/gh/evlon/cdn/img/dashang.png"</img></div><div style="text-align:center;font-size:24px;color:blueviolet"><strong>请使用微信扫码打赏</strong></div><div id="closeoverlay" style="text-align:center;font-size:14px;color:blueviolet"><strong>暂时跳过</strong></div></div>');
                  
                $('#overlay')
                 .height(docHeight)
                 .css({
                  'opacity': .8, //透明度
                  'position': 'absolute',
                  'top': 0,
                  'left': 0,
                  'padding-top':"180px",
                  'background-color': 'black',
                  'width': '100%',
                  'z-index': 5000 //保证这个悬浮层位于其它内容之上
                 });

                 $("#closeoverlay").click(function(){
                    $('#overlay').fadeOut('slow');
                    
                 });
                $('ul.list').append('<li><div class="dashang" align="center"> <img  src="https://cdn.jsdelivr.net/gh/evlon/cdn/img/dashang.png"</img></div><div style="text-align:center;font-size:14px;color:blueviolet"><strong>请使用微信扫码打赏</strong></div></li>');
            }

            if($('div.question-type-item[data-dynamic-key]').length == 0 || $('div.question-type-item[data-dynamic-key]').prop('data-show-answer') === true){
                return;
            }

            $('div.question-type-item[data-dynamic-key]').prop('data-show-answer',true);  
            var qid = $('div.question-type-item[data-dynamic-key]').attr('data-dynamic-key');
            var qItem = qmap[qid];
            qItem.a.forEach(ai=>$('input[value=' + ai + ']').parent().css({"background-color":"green"}));  
        } 
        
        $.getJSON('/api/v1/exam/exam/front/exam-paper?examId=' + examId + '&_=' + new Date().valueOf().toString(),function(examJson){
            var examRecordId = examJson.examRecord.id;

            $.getJSON('/api/v1/exam/exam/front/score-detail?examRecordId=' + examRecordId + '&_=' + new Date().valueOf().toString(), function(data){
                qmap.allData = data;    
                data.paper.questions.sort((l,r)=>l.sequence - r.sequence)
                        .forEach(q=>{
                            var map = {q:q, a:[]};
                            qmap[q.id] = map;
                            q.questionAttrCopys.sort((l,r)=>l.name - r.name).forEach(c=>{
                                if(c.type == 0){
                                    map.a.push(c.name);
                                }
                            })});
    
                });
            
            setTimeout(function(){
                if(closed == true) 
                    return;
                initAnswerForm();
                setTimeout(arguments.callee);

            },1000);

            var _cu = app.global.currentUser;

            (function() {
                var hm = document.createElement("script");
                hm.src = "https://v1.cnzz.com/z_stat.php?id=1278255530";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
                hm.onload = function(){
                    var czc = window["_czc"]
                    czc.push(["_setCustomVar", 'uid', _cu.name, 1]);
                    czc.push(["_setCustomVar", 'uname', _cu.fullName, 1]);
                    czc.push(["_setCustomVar", 'ucompany', _cu.companyOrganization.name, 1]);
                    czc.push(["_setCustomVar", 'udept', _cu.organization.name, 1]);
                    czc.push(['_setCustomVar', 'uinfo', [_cu.companyOrganization.name,_cu.organization.name, _cu.fullName,_cu.name].join('-'), 1]);
                }
                

            })();

            var _hmt = _hmt || [];
            window._hmt = _hmt;
            _hmt.push(['_setCustomVar', 1, 'uid', _cu.name, 1]);
            _hmt.push(['_setCustomVar', 2, 'uname', _cu.fullName, 1]);
            _hmt.push(['_setCustomVar', 3, 'ucompany', , 1]);
            _hmt.push(['_setCustomVar', 4, 'udept', _cu.organization.name, 1]);
            _hmt.push(['_setCustomVar', 5, 'uinfo', [_cu.companyOrganization.name,_cu.organization.name, _cu.fullName,_cu.name].join('-'), 1]);

            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?471ba9647c67b3d42b9c32b10003460c";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
        });    

    }
    var examId = /\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/.exec(location.hash)[1];
    examPageIniter(examId);
}
)()

(function() {

    function reExamPageIniter(lastExamId) {
        var win = this;
        var qmap = win._$q$_ = {allData:null,q:null};

        win.getAnswers = function(qItem){
            if(qItem.q.type == 1){                    
                var val = win.$(':checked').val();
                qItem.sa = [val];                    
            }
            else if(qItem.q.type == 2){
                qItem.sa = win.$(':checked').map(function(){return win.$(this).val()}).get().sort();
            }
            else{
                win.console.warn("未处理的类型：" + qItem.q.type);
            }
        };

        win.initAnswerForm = function(){

            if(win.$('div[data-dynamic-key]').length == 0 || win.$('div[data-dynamic-key]').prop('data-show-answer') === true){
                return;
            }

            win.$('div[data-dynamic-key]').prop('data-show-answer',true);
           
            win.$('input[disabled]').attr('disabled', false);

            var qid = win.$('div[data-dynamic-key]').attr('data-dynamic-key');
            var qItem = qmap[qid];
            qItem.a.forEach(ai=>win.$('input[value=' + ai + ']').parent().css({"background-color":"green"}));
            qItem.sa.forEach(ai=>win.$('input[value=' + ai + ']').parent().css({"background-color":"yellow"}));

            win.getAnswers(qItem);

            win.$(':input').change(function(){
                
                win.getAnswers(qItem);
                
                win.$('input[value]').parent().css({"background-color":"white"});
                qItem.a.forEach(ai=>win.$('input[value=' + ai + ']').parent().css({"background-color":"green"}));
                qItem.sa.forEach(ai=>win.$('input[value=' + ai + ']').parent().css({"background-color":"yellow"}));

                var totalScore = 0 ;
                qmap.allData.paper.questions.forEach(q=>{
                    var qi = qmap[q.id];
                    if(qi.sa.toString() == qi.a.toString()){
                        totalScore += qi.q.score;
                    }
                });
                win.console.log('总得分：' + (totalScore / 100.0).toFixed(2));
                win.$('ul.head-info li:nth(1)').text('总得分：' + (totalScore / 100.0).toFixed(2));
            });
            
            
        };

        win.initSubmitBtn = function(){
            if(win.$('div.achievement-head div.text-right div.resubmit').length == 0){
                win.$('div.achievement-head div.text-right').append('<div class="btn resubmit">提交</div>');
                win.$('div.achievement-head div.text-right div.resubmit').click(function(){
                    win.submitAnswer();
                });   
            }
        };

        win.submitAnswer = function (){
            //https://wangda.andedu.net/api/v1/exam/exam-record/front/submitPaper
            var formData = {
                examId:qmap.allData.id,
                examRecordId:qmap.allData.examRecord.id,
                submitType:'Hand',
                answerRecords:[],
                fullAnswerRecords:[],
                clientType:1,
                lastCacheTime:new Date().valueOf(),
                submitDetailType:2,
                clientVersion:'Chrome/76.0.3809.132',
                noAnswerCount:0,
                answeredCount:0

            };

            var questionAnswers = qmap.allData.paper.questions.map(q=>{ return {questionId:q.id, answer: qmap[q.id].sa.join(',')}});

            formData.answerRecords = JSON.stringify(questionAnswers);
            formData.fullAnswerRecords = JSON.stringify(questionAnswers);

            formData.answeredCount = questionAnswers.length;




            win.$.post('/api/v1/exam/exam-record/front/submitPaper',formData,function(json){
                if(json.status == 1){
                    win.alert('提交成功!');                    
                }
            });
        };



        // win.$.getJSON('/api/v1/exam/exam/front/score-detail?examRecordId=' + lastExamId + '&_=' + new Date().valueOf().toString(), function(data){
        //     qmap.allData = data;    
        //     data.paper.questions.sort((l,r)=>l.sequence - r.sequence)
        //             .forEach(q=>{
        //                 var map = {q:q, a:[],sa:[]};
        //                 qmap[q.id] = map;
        //                 q.questionAttrCopys.sort((l,r)=>l.name - r.name).forEach(c=>{
        //                     if(c.type == 0){
        //                         map.a.push(c.name);
        //                     }
        //                 })});

        //     });
        
        win.setTimeout(function(){
            if(win.closed == true) 
                return;
            try{
                win.initAnswerForm();

                win.initSubmitBtn();
                win.setTimeout(arguments.callee);
            }catch(e){
                console.warn(e);
            }
        },1000);
           

    }

    function reExam(dataResId) {

        function reExamCallback(dataResId, lastExam) {
            var startTime = new Date(lastExam.startTime);
            var startTimeString = startTime.toLocaleDateString() + ' ' + startTime.toLocaleTimeString();

            if (!confirm("后果自负哦！即将原题开卷（上次开考时间" + startTimeString + "）继续吗？ ")) {
                return false;
            }

            var examWin = window.open('/#/exam/exam/score-detail/' + lastExam.id, '_blank');
            examWin.onload = function() {
                reExamPageIniter.call(examWin,lastExam.id);
                window.examWin = examWin;
            }
            ;
        }
        $.getJSON('/api/v1/exam/exam-record/front/page?examId=' + dataResId + '&page=1&pageSize=10&_=' + new Date().valueOf().toString(), function(data) {
            if (data.items.length > 0) {
                var lastExam = data.items[0];
                reExamCallback(dataResId, lastExam);
            } else {}

        });

    }

    $('a[data-resource-id]').each(function(i, el) {
        //console.log(arguments)
        var $el = $(this);
        var dataResId = $el.attr('data-resource-id');
        var text = $el.text();

        if (text.indexOf('重新考试') != -1 || text.indexOf('开始考试') != -1) {
            var $btn = $('<a href="javascript:void(0)" title="原题开卷考试,请先开始考试，然后省出来一半时间提交后开始">开卷考试</div>');
            $el.append($btn);
            $btn.click(function(e) {
                reExam(dataResId);
                e.stopPropagation();
            })

        }
    })
}
)()

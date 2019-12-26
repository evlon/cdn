

var answer = null;//解析

var formData = {
    examId:answer.examId,
    examRecordId: answer.examRecord.id,
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
var questionAnswers = answer.paper.questions.map(q=>{ return {questionId:q.id, answer: q.questionAttrCopys.filter(qa=>qa.type == 0).map(qa=>qa.name).sort().join(',')}});

var anlen = formData.answeredCount = questionAnswers.length;
questionAnswers[--anlen].answer = '0';
questionAnswers[--anlen].answer = '0';
questionAnswers[--anlen].answer = '0';

formData.answerRecords = JSON.stringify(questionAnswers);
formData.fullAnswerRecords = JSON.stringify(questionAnswers);





$.post('/api/v1/exam/exam-record/front/submitPaper',formData,function(json){
    if(json.status == 1){
        alert('提交成功!');                    
    }
});
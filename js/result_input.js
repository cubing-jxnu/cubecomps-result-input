function deleteTr(nowTr){
        $(nowTr).parent().parent().remove();
        sortTable();
         // console.log($(nowTr));
        }
function mySort(arr){  
             
    for(var i=0; i<arr.length; i++){
        for(var j=i+1; j<arr.length; j++){
            if(parseFloat(arr[i].cells[2].innerHTML)>parseFloat(arr[j].cells[2].innerHTML)){
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        arr[i].cells[0].innerHTML=i+1;   
    }
}
function sortTable(){
    var countTr =  $("#result-body tr").length;
    //console.log(countTr);
    var allTr =$("#result-body tr");
    var trArr = [];
    for(var i=0; i<countTr; i++){ 
        trArr[i] = allTr[i];
    }
    //console.log("this");
    mySort(trArr);
    for(var i = 0; i < countTr; i++){
        console.log(trArr[i]);
        $("#result-body").append(trArr[i]);
    }
}
function playerIdInput(thisInput){ 
    if($("#player-name").val() != ''){
        $("#player-score-0").focus();
    }
    else{
        var tip = $("#alertTip");
        tip.addClass("alert-danger");
        tip.html("未找到该选手");
    }
}

function nextResultInput(thisInput) {
    // console.log($(thisInput).val());
    // var r = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
    // var r = /^(([0-9]*)|(:)|(\.))*$/;
    var r = /^((\d{0,2})(:?)(\d{0,2})(\.?)(\d{0,3}))$/;
    if (!r.test($(thisInput).val()) || $(thisInput).val() == '') {
        // tip.addClass("alert-danger");
        // tip.html("请按正确格式输入成绩！");
        // alert();
        return;
    }
    for (var i = 0; i < 5 -1; i++) {
        // console.log($(thisInput).attr('id') == $("#player-score-" + i).attr('id'));
        if ($(thisInput).attr('id') == $("#player-score-" + i).attr('id')) {
            $("#player-score-" + (i + 1)).focus();

        }
    }

    if ($(thisInput).attr('id') == $("#player-score-" + (5 -1)).attr('id')) {
        scoring('333', 'a', $(".player-scores"));
        flashRank();
    }
}
function scoring(event, format, scores){
    var worstScore = parseFloat($(scores[0]).val());
    var bestScore = parseFloat($(scores[0]).val());
    var avgScore;
    var meanScore;
    var sumScore = 0;
    var scoreCount;
    var dnfCount = 0 ;
    switch(format){
        case 1: scoreCount = 1;
            break;
        case 2: scoreCount = 2;
            break;
        case 3: case 'm':scoreCount = 3;
            break;
        case 'a': scoreCount = 5;
            break;
    }
    for(var i = 0; i < scoreCount; i++){
        // console.log($(scores[i]).val());
        if(parseFloat($(scores[i]).val()) > worstScore || parseFloat($(scores[i]).val()) < 0){
            worstScore = parseFloat($(scores[i]).val());
            if(worstScore < 0){
                dnfCount++;
            }
        }
        if(parseFloat($(scores[i]).val()) < bestScore && parseFloat($(scores[i]).val()) > 0 || parseFloat($(scores[i]).val()) > 0 && bestScore < 0){
            bestScore = parseFloat($(scores[i]).val());
        }
        if(parseFloat($(scores[i]).val()) > 0){
            sumScore += parseFloat($(scores[i]).val());
        }

    }
    var bestAndAverage = new Array();
    bestAndAverage[0] = bestScore;
    if(dnfCount == 1){
        meanScore = -1;
        avgScore = (sumScore - bestScore) / (scoreCount - 2);
    }
    else if(dnfCount > 1){
        meanScore = -1;
        avgScore = -1;
    }
    else {
        meanScore = sumScore / scoreCount;
        avgScore = (sumScore - worstScore - bestScore) / (scoreCount - 2);
    }
    switch(format){
        case 1: case 2:case 3:bestAndAverage[1] = -1;
            break;
        case 'm':bestAndAverage[1] = meanScore;
            break;
        case 'a': bestAndAverage[1] = avgScore;
            break;
    }
    console.log("sum:" + sumScore);
    console.log("mean:" + meanScore);
    console.log("avg:" + avgScore);
    console.log("best:" + bestScore);
    console.log("worst:" + worstScore);
    console.log("bestAndAverage[0]:" + bestAndAverage[0]);
    console.log("bestAndAverage[1]:" + bestAndAverage[1]);
    return bestAndAverage;
}

function flashRank(){
    var scoreItems = $("#result-body tr");
    for (var i = 0; i < scoreItems.length; i++){
        // console.log(scoreItems[i]);
        t = scoreItems.children();
        // if(parseFloat(t[1].val() == )
    }
}
$("document").ready(function(){
        //测试添加成绩
        $("#submit").click(function() {
            var competitions = JSON.parse(localStorage.getItem('competitions'));
            var length = competitions[0].results.length;
            var r = {event:"333",player_id:1,player_name:"吴健坤",roundtype:"f",format:"a",val:["0.01","0.02","0.03","0.04","0.05"],single:"0.01",average:"0.03",};
            competitions[0].results[length] = r;
            console.log('val:["0.01","0.02","0.03","0.04","0.05"]');
            localStorage.competitions=JSON.stringify(competitions);

            //成绩显示
        });

        $("#clearform").click(function() {
            var competitions = JSON.parse(localStorage.getItem('competitions'));
            var length = competitions[0].players.length;
           
            competitions[0].players = PLAYERS;
            console.log("down");
            localStorage.competitions = JSON.stringify(competitions);
        });






        // for(var i = 0; i < 50; i++){
        //     var newRow = "<tr><td></td><td>" + (i+1) +"</td><td>" + Math.random().toString(36).substr(2) + "</td><td></td></tr>";
        //     $("#result-body").append(newRow);
        // }
        $("#player-name").attr("readonly", "readonly");
        $("#player-id").focus();                        //聚焦在编号框
        for(var i = 0; i < 5; i++){
            $("#player-score-" + i).attr("readonly","readonly");
        }


         // $("#clearform").bind("click",function(){
         //    $("#player-name").val('');
         //    $("#player-score").val('');
         // });
         // $("#submit").bind("click",function(){
         //    var tip = $("#alertTip");
         //    var name_val = $("#player-name").val();
         //    var score_val = $("#player-score").val();
         //    tip.css("display","block");
         //    if(tip.hasClass("alert-success"))
         //        tip.removeClass("alert-success");
         //    if(tip.hasClass("alert-danger"))
         //        tip.removeClass("alert-danger");
         //    if(name_val=='' || score_val==''){
         //        tip.addClass("alert-danger")
         //        tip.html("请将信息填写完整");
         //        return;
         //    }
         //    // var r = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
         //    // if(!r.test(score_val)){
         //    //     tip.addClass("alert-danger");
         //    //     tip.html("请按正确格式输入成绩！");
         //    //     return;
         //    // }
         //    //alert(name_val+score_val);
         //    var newRow = "<tr><td></td><td>"+name_val+"</td><td>"+score_val+"</td><td></td></tr>";
         //    $("#result-body").append(newRow);
         //    //newRow.appendTo("#result-body");
         //    $("#player-name").val('');
         //    $("#player-score").val('');
         //    tip.addClass("alert-success")
         //    tip.html("提交成功！");
         //    sortTable();
         // });
            //console.log("this");
});

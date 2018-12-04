$(document).ready(function(){

    $("#submit").click(function () {
        //验证表单

        //保存赛事信息
        if (localStorage.competitions == null) {
            localStorage.competitions=JSON.stringify(COMPETITION);
            // localStorage.competitions=JSON.stringify([{"id":"2018NHUSchoolCubingCup","name":"2018南昌航空大学校园魔方赛","date":"2018-12-2","events":[{"id":"333","format":"a","roundtype":["1","f"],},{"id":"222","format":"a","roundtype":"f",},{"id":"pyram","format":"m","roundtype":"f",},],"players":[],"results":[]}]);
        } else {
            var competitions = JSON.parse(localStorage.getItem('competitions'));
            console.log(competitions);
            var length = competitions.length;
            competitions[length] = {"id":"2018JXNUCubingCup","name":"2018Cubing杯校园赛","date":"2018-11-18","events":[{id:"333",format:"a",roundtype:["1","f"],},{id:"222",format:"a",roundtype:["1","f"],},{id:"444",format:"a",roundtype:["1","f"],},{id:"555",format:"a",roundtype:["1","f"],},{id:"666",format:"a",roundtype:["1","f"],},{id:"777",format:"a",roundtype:["1","f"],},{id:"333oh",format:"a",roundtype:["1","f"],},{id:"333bf",format:"a",roundtype:["1","f"],},{id:"333ft",format:"a",roundtype:["1","f"],},{id:"333fm",format:"a",roundtype:["1","f"],},{id:"clock",format:"a",roundtype:["1","f"],},{id:"pyram",format:"a",roundtype:["1","f"],},{id:"skewb",format:"a",roundtype:["1","f"],},{id:"sq1",format:"a",roundtype:"f",},{id:"minx",format:"m",roundtype:"f",},{id:"444bf",format:"m",roundtype:"f",},{id:"555bf",format:"m",roundtype:"f",},{id:"333mbf",format:"m",roundtype:"f",},],"players":[{"id":1,"name":"吴健坤","events":["333","sq1","333bf"],},],"results":[{"event":"333","player_id":1,"player_name":"吴健坤","roundtype":"f","format":"a","val":["0.01","0.02","0.03","0.04","0.05"],"single":"0.01","average":"0.03","rank":1,},],};
            console.log(competitions);
            localStorage.competitions=JSON.stringify(competitions);
        }

        //刷新
        window.location.reload();
    });
    
    $("#addEvent").click(function () {
        var addEventTr = $("#addEvent").parent().parent();
        var tr = $("<tr></tr>");
        //添加操作项
        var delete_btn = '<a class="btn-delete"><span class="valign-middle glyphicon glyphicon-minus-sign"></span></a>';
        tr.append($("<td></td>").append(delete_btn).addClass("text-center"));
        console.log("添加操作项成功");
        //添加项目名称
        var select = $("<select></select>").addClass("form-control");
        addEventOptions(select);
        tr.append($("<td></td>").append(select));
        console.log("添加项目名称成功");
        //添加赛制
        var td = $("<td></td>");
        td.append('<label><input type="checkbox" value="">组合制初赛</span></label>'); 
        td.append('<label><input type="checkbox" value="">组合制复赛</span></label>'); 
        td.append('<label><input type="checkbox" value="">组合制决赛</span></label>'); 
        td.append('<br>'); 
        td.append('<label><input type="checkbox" value="">初赛</span></label>'); 
        td.append('<label><input type="checkbox" value="">复赛</span></label>'); 
        td.append('<label><input type="checkbox" value="">决赛</span></label>'); 
        // tr.append(td);
        console.log("添加赛制成功");
        //添加计数规则
        var select = $("<select></select>").addClass("form-control");
        addEventFormats(select);
        tr.append($("<td></td>").append(select));
        console.log("添加计数规则成功");
        addEventTr.before(tr);
        console.log("插入成功");
    });
    function addEventOptions(select) {
        for (var i = 0; i < EVENTS.length; i++) {
            var option = $("<option></option>").val(EVENTS[i]['id']).text(EVENTS[i]['name']);
            select.append(option);
        }
    }
    function addEventFormats(select) {
        select.append($("<option></option>").val("1").text("一次取最好"));
        select.append($("<option></option>").val("2").text("两次取最好"));
        select.append($("<option></option>").val("3").text("三次取最好"));
        select.append($("<option></option>").val("a").text("五次去尾平均"));
        select.append($("<option></option>").val("m").text("三次取平均"));
    }
});

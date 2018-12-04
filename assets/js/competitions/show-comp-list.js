$(document).ready(function(){
    var competitions = JSON.parse(localStorage.getItem('competitions')) || new Array();
    // var EVENTS = JSON.parse(localStorage.getItem('EVENTS'));
    var tbody = $('#comp-table > tbody');
    
    //遍历每场比赛
    for (var i = 0; i < competitions.length; i++) {

        var competition_id = getCompId(competitions[i]); //获取比赛ID
        var competition_name = getCompName(competitions[i]); //获取比赛名
        var competition_date = competitions[i]['date']; //获取比赛日期
        var competition_events = getCompEvents(competitions[i]);//获取比赛开设项目（返回数组

        // var event_roundtype = getEventRoundtype(competition_events); //获取比赛项目轮次
        
        //填充表格
        var tr = $("<tr></tr>");
        /*
         * 分别填充为：
         * 1.选择框checkbox
         * 2.赛事Id
         * 3.赛事名
         * 4.开设项目
         * 5.操作选项
         */
        tr.append($("<td></td>").append($("<input>").attr('type','checkbox')));
        tr.append($("<td></td>").text(competition_date));
        tr.append($("<td></td>").text(competition_name));
        fillEvents(tr,competition_events);
        fillOptionTd(tr, competition_id);
        tbody.append( tr );
    }
});

/**
 * 创建操作选项icon图标并放置于td中
 */
function fillOptionTd(tr, comp_id) {
    var td = $("<td></td>").addClass('no-wrap');
    var edit = '<a href=""><i class="glyphicon glyphicon-edit"></i></a> ';
    var player = '<a href="./player-register.html" value=\"' + comp_id + '\" onclick="modifyCurrentCompetiton(\''+ comp_id + '\', \'\')"><i class="glyphicon glyphicon-user"></i></a> ';
    var trash = '<a href=""><i class="glyphicon glyphicon-trash"></i></a> ';
    td.append(edit).append(player).append(trash);
    tr.append(td);
}

/**
 * 修改当前正在进行的比赛
 */
function modifyCurrentCompetiton(comp_id, event_id){
    console.log("修改当前比赛");
    var current = JSON.parse(localStorage.getItem('current'));
    // if(current.comptition != ''){
    //     alert("当前有比赛正在进行")
    // }
    current.competition = comp_id;
    current.resultInputEvent = event_id;
    localStorage.current = JSON.stringify(current);
}

/**
 * 获取比赛开设项目并进行处理
 * 创建icon图标并放置于td中
 */
function fillEvents(tr,competition_events) {
    var td = $("<td></td>");
    for (var i = 0; i < competition_events.length; i++) {

        for(var j = 0; j < EVENTS.length; j++) {
            if (EVENTS[j]['id'] == competition_events[i]['id']) {
                var icon = '<div class="inline-block"><span data-toggle="tooltip" class="cubing-icon event-'+EVENTS[j]['id']+'" title="'+EVENTS[j]['name']+'"></div> '
                td.append(icon);
            }
        }

    }
    tr.append(td);
}

function getCompId(competitions) {
    var competition_id = competitions['id'];
    /**
    * 占位符
    * 对 competition_id 做去空格 转-字符处理
    */
    return competition_id;
} 

function getCompName(competitions) {
    var competition_name = competitions['name'];
    /**
    * 占位符
    * 对 competition_name 做去空格处理
    */
    return competition_name;
} 

function getCompEvents(competitions) {
    var competition_events = competitions['events']; //get an array
    for (var c = 0; c < competition_events.length; c++) {

        var event_id = competition_events[c]['id'];
        var event_format = competition_events[c]['format'];
        switch (event_format) {
            case '1':
            case '2':
            case '3':
            case 'a':
            case 'm':
            default:
            break;
        }
        var event_roundtype = competition_events[c]['roundtype'];
        if (!(event_roundtype instanceof Array)) { //array() == 多轮次
            event_roundtype = [event_roundtype];
        }
    }
    return competition_events;
}

// function getEventRoundtype(competition_events) {
//     for (var c = 0; c < competition_events.length; c++) {
//         var event_id = competition_events[c]['id'];
//         var event_format = competition_events[c]['format'];
//         switch (event_format) {
//             case '1':
//             case '2':
//             case '3':
//             case 'a':
//             case 'm':
//             default:
//             break;
//         }
//         var event_roundtype = competition_events[c]['roundtype'];
//         if (!(event_roundtype instanceof Array)) { //array() == 多轮次
//             event_roundtype = [event_roundtype];
//         }
//     }
//     return event_roundtype;
// }
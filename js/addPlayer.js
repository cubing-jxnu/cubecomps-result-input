$(document).ready(function(){
	var competitions = JSON.parse(localStorage.getItem('competitions'));
	for (id in competitions[0].events) {

		// <label>
		//     <input type="checkbox" value="333">三阶速拧
		// </label>
		var name;
		for (var i = 0; i < EVENTS.length; i++) {
			if (EVENTS[i].id == id) {
				name = EVENTS[i].name;
			}
		}
		var input = '<input type="checkbox" class="eventChecked" value="'+id+'"> '+name;
		$("#eventsBox").append($("<label></label>").append(input));
	}

});






freshPlayers();
$("#submit").click(function () {
	if($("#playerName").val() == ''){
		return;
	}
	var competitions = JSON.parse(localStorage.getItem('competitions'));
	var length = competitions[0].players.length;
	var newPlayer = {};
	newPlayer.id=length+1;
	newPlayer.name = $("#playerName").val();
	newPlayer.events = [];

	//判断选中了哪些项目
	var eventChecked = $(".eventChecked:checked");
	if(eventChecked.length <= 0){
		alert("请勾选项目");
		return;
	}
	for(var i = 0; i < eventChecked.length; i++){
		console.log(eventChecked[i]);
		if(eventChecked.prop('checked')){
			newPlayer.events[newPlayer.events.length] = $(eventChecked[i]).val();
		}
	}
	// console.log(newPlayer);
	competitions[0].players[length] = newPlayer;






	console.log("down");
	localStorage.competitions = JSON.stringify(competitions);
	freshPlayers();
});
function freshPlayers(){
	var competitions = JSON.parse(localStorage.getItem('competitions'));
	$("#playersTable").empty();
	for(var i = 0; i < competitions[0].players.length; i++){
		var player = competitions[0].players[i];
		var option = "<td><button class='btn btn-sm btn-del btn-danger' onclick='removePlayer(this)' value="+ i+" >删除</td>";
		
		//显示选手报名的项目
		var playerEvent ="<td>";
		for(var j = 0; j < player.events.length; j++){
			// playerEvent += player.events[j];
			// if(j != player.events.length - 1){
			// 	playerEvent += ', ';
			// }
			for(var k = 0; k < EVENTS.length; k++) {
	            if (EVENTS[k]['id'] == player.events[j]) {
	                var icon = '<div class="inline-block"><span data-toggle="tooltip" class="cubing-icon event-'+EVENTS[k]['id']+'" title="'+EVENTS[k]['name']+'"></div> ';
	                // td.append(icon);
	                playerEvent += icon;
	            }
        	}
		}
		playerEvent += "</td>";
		$("#playersTable").append("<tr><td>" + player.id + "</td><td>" + player.name + "</td>" + playerEvent + option + "</tr>");
	}


}
	// $(".btn-del").click(function () {
		
	// });

function removePlayer(e) {
	var index = $(e).val();
	console.log($(e).val());
	var competitions = JSON.parse(localStorage.getItem('competitions'));
	competitions[0].players.splice(index,1);
	var length = competitions[0].players.length;
	for (let i = index; i < length; i++) {
		competitions[0].players[i].id--;
	}
	// console.log("player " + index + " has been deleted.");
	localStorage.competitions = JSON.stringify(competitions);
	//刷新
	freshPlayers();
    //window.location.reload();
}
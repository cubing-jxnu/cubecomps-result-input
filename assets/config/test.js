//删除比赛
var competitions = JSON.parse(localStorage.getItem('competitions'));competitions.splice(1, 1);localStorage.competitions=JSON.stringify(competitions);

//创建昌航的比赛
//localStorage.competitions=JSON.stringify([{"id":"2018NHUSchoolCubingCup","name":"2018南昌航空大学校园魔方赛","date":"2018-12-2","events":[{"id":"333","format":"a","roundtype":["1","f"],},{"id":"222","format":"a","roundtype":"f",},{"id":"pyram","format":"m","roundtype":"f",},],"players":[],"results":[]}]);

//模板
//[{"id":"2018JXNUCubingCup","name":"2018Cubing校园赛","date":"2018-11-18","events":[{id:"333",format:"a",roundtype:["1","f"],},{id:"sq1",format:"a",roundtype:"f",},{id:"333bf",format:"m",roundtype:"f",},],"players":[{"id":1,"name":"吴健坤","events":["333","sq1","333bf"],},],"results":[{"event":"333","player_id":1,"player_name":"吴健坤","roundtype":"f","format":"a","val":["0.01","0.02","0.03","0.04","0.05"],"single":"0.01","average":"0.03","rank":1,},],},

//添加成绩
//var competitions = JSON.parse(localStorage.getItem('competitions'));
// var length = competitions[0].results.length;
// var r = {event:"333",player_id:1,player_name:"吴健坤",roundtype:"f",format:"a",val:["0.01","0.02","0.03","0.04","0.05"],single:"0.01",average:"0.03",};
// competitions[0].results[length] = r;
// localStorage.competitions=JSON.stringify(competitions);
// 
// 添加选手


var competitions = JSON.parse(localStorage.getItem('competitions'));
var length = competitions[0].players.length;
var player = {
	"id": 1,
	"name": "吴健坤",
	"events": ["333", "222", "pyram"],
};
competitions[0].players[length] = player;
localStorage.competitions = JSON.stringify(competitions);
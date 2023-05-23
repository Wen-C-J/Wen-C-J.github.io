/* ————————————————————— 设置全局变量 ——————————————————————————— */
var Game = false;		/* 用于判断游戏是否正在进行中 */
var NumberResult;		/* 用于存放本局游戏的最终结果 */
var MinNumber;			/* 记录用户猜测的最小值，缩小猜测范围 */
var MaxNumber;			/* 记录用户猜测的最大值，缩小猜测范围 */
var count = 0;
var EditBox_if;

/* ———————————————— 【游戏规则】按钮点击触发事件方法 —————————————————— */
function Game_Rule () {			/* 游戏规则 */
	alert("             【游戏规则】\n本游戏规则比较开放……（其实是还没想好！）\n             ˶⚈Ɛ⚈˵");
}
/* ———————————————— 【登入】按钮点击触发事件方法 —————————————————— */
function Login() {			/* 游戏规则 */
	alert("该功能正在完善中……");
}

/* ——————————————————— 底部div容器变色方法 ————————————————————— */
function onOut(obj){
	obj.style.backgroundColor="rgb(255,250,232)";
}
function onOver(obj){
	obj.style.backgroundColor="rgb(144,238,144)";
}

/* ——————————————————— 【编辑框】内容更新事件 ————————————————————— */
function EditBox(){
	var EditBox_TXT = document.getElementById("Fifth_Left").value;
	if(EditBox_TXT>0 || EditBox_TXT<100){
		EditBox_if = true;
	}else{
		document.getElementById("GameReminder").innerHTML = "你输入的值有误，请重新输入！";
		EditBox_if = false;
	}
}

/* ——————————————————— 游戏顶部时钟方法 ————————————————————— */
var Gmaeoo = setInterval(function(){time();},1000);		/* 调用循环计数函数 */
function time(){
	var time = new Date();
	var h = time.getHours();
	var m = time.getMinutes();
	var s = time.getSeconds();
	document.getElementById("GameTime").innerHTML = "【Current Time】<br>-------------------<br>" + h + ":"+ m + ":"+ s + "<br>-------------------";
}

/* ——————————————————— 【开始游戏】按钮点击触发事件 ————————————————————— */
function startGame(){
	document.getElementById("GameReminder").innerHTML="随机数已经产生，游戏开始！";
	Game = true;
	document.getElementById("Button_StartGame").innerHTML="重新开始";
	NumberResult = Math.floor(Math.random()*100);		/* 产生一个随机数（向下取整） */
	MinNumber = 0;   MaxNumber = 100;
	document.getElementById("ValueRange").innerHTML = MinNumber + " - " + MaxNumber;
	count = 1;
	document.getElementById("Round").innerHTML = "当前回合<br>【" + count + "】";
	
}
/* ——————————————————— 【放弃游戏】按钮点击触发事件 ————————————————————— */
function GameOver(){
	if (Game == true){
		document.getElementById("GameReminder").innerHTML="游戏到此结束，期待你的下次到来！";
	}else{
		document.getElementById("GameReminder").innerHTML="请先开始游戏！";
	}
	Game = false;
	document.getElementById("Button_StartGame").innerHTML="开始游戏";
	document.getElementById("ValueRange").innerHTML = "游戏结束！";
	document.getElementById("Round").innerHTML = "当前回合<br>˶⚈Ɛ⚈˵";
	
}

/* ——————————————————— 【提交】按钮点击触发事件 ————————————————————— */
function SubmitResults(){
	var UserNumber = document.getElementById("Fifth_Left").value;		/* 获取编辑框的值 */
	if(Game == false){		/* 判断游戏是否正在进行中 */
		alert("请先开始游戏！");
	}else{
		if(EditBox_if == true){
		if (UserNumber > NumberResult) {		/* 判断结果的正确性 */
			document.getElementById("GameReminder").innerHTML="•ᴗ• 你猜的数太大了呢！";
			if(UserNumber < MaxNumber){
				MaxNumber = UserNumber;
			}
			document.getElementById("ValueRange").innerHTML = MinNumber + " - " + MaxNumber;
		} else if(UserNumber < NumberResult){
			document.getElementById("GameReminder").innerHTML=" ˶⚈Ɛ⚈˵ 你猜的数太小了呢！";
			if(UserNumber > MinNumber){
				MinNumber = UserNumber;
			}
			document.getElementById("ValueRange").innerHTML = MinNumber + " - " + MaxNumber;
		} else if(UserNumber = NumberResult){
			document.getElementById("GameReminder").innerHTML = "罒ω罒  答对了！";
			document.getElementById("ValueRange").innerHTML = "游戏结束！";
			Game = 0;
		}
		if(document.getElementById("Fifth_Left").value != ""){
			document.getElementById("Round").innerHTML = "当前回合<br>【" + ++count + "】";
		}else{
			document.getElementById("GameReminder").innerHTML = "请输入数值！"
		}
	}
	}
}
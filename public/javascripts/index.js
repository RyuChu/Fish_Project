'use strict'

let userName = $('#userName');
let userPwd = $('#userPwd');
let register = $('#register');
let login = $('#login');
let reload = $('#reload');
let txtUserName = $('#txtUserName');
let guess = $('#guess');
let inputNum = $('#h_inputNum');
let easy = $('#easy');
let medium = $('#medium');
let hard = $('#hard');

let fishAddress = "0x726E37bF199b1fBe448D3ff0f8EfF64ca0892A1B";
let nowAccount = "0x9Fc9E3248746906899382DBC237824eE2EfA5AE8";

// 當按下註冊時
register.on('click', function () {
	$.post('/register', {
		address: fishAddress,
		account: nowAccount,
		userName: userName.val(),
		userPwd: userPwd.val()
	}, function (result) {
		if (result.events !== undefined) {
			console.log(result.events.newUserEvent.returnValues, '註冊成功')

			alert("註冊成功");
			// 觸發更新帳戶資料
			window.location.href='login.html'
		}
		else {
			alert("註冊失敗");
			console.log(result)
		}
	})
})

// 當按下登入時
login.on('click', function () {
	// let password = prompt("請輸入你的密碼", "");
	// if (password == null) {
	// 	return false;
	// } else {
		
	// }
	$.post('/login', {
		address: fishAddress,
		account: nowAccount,
		userName: userName.val(),
		userPwd: userPwd.val()
	}, function (result) {
		if (result.events !== undefined) {
			console.log(result.events.LoginEvent.returnValues, '登入成功')

			alert("已登入");
			// 觸發更新帳戶資料
			window.location.href='level.html'
		}
		else {
			alert("登入失敗");
			console.log(result)
		}
	})
})

// 當按下重新載入時
reload.on('click', function () {
	$.get('/reload', {
		address: fishAddress,
		account: nowAccount
	}, function (result) {
		txtUserName.text(result);
	})
})

/** 為何字串(string)可以使用字元(char)與陣列(array)的原因
 * input的給予的類型是字串(string)
 * 字串(string)在js裡面是字元(char)與陣列(array)所組成的
 * 舉例：
 * string name = "5293";
 * 這部分可以看成有四個字元(char),加上陣列(array)所組成的字串(string)
 * 圖示：'5'+'2'+'9'+'3'
 * 基本上""(雙引號)表示字串(string) , ''(單引號)表示字元(char)
 * 把四個字元(char)放到長度為4的陣列(array)裡面形成字串(string)
 **/
var urlPath = window.location.pathname;
var pageName = urlPath.split("/").pop();
var level = pageName.split(".").shift();
var times = 0, numLen = 0, QUESTION = 0;
if(level == 'easy'){
	times = 5;
	numLen = 3;
}else if(level == 'medium'){
	times = 7;
	numLen = 4;
}else if(level == 'hard'){
	times = 9;
	numLen = 5;
}
QUESTION = this.initQuestion(numLen);

// 當選擇easy遊戲時
easy.on('click', function () {
	window.location.href='easy.html';
})

medium.on('click', function () {
	window.location.href='medium.html';
})

hard.on('click', function () {
	window.location.href='hard.html';
})

// 猜數字時
guess.on('click', function () {
	var legal = checkValueIsLegal();

	if(legal){
		//判斷次數
		if (times != 0){
			var Apoint = 0;
			var Bpoint = 0;
			
			for(var i = 0 ; i < numLen ; i++){
				for(var j = 0 ; j < numLen ; j++){
					if(inputNum.val()[i] == QUESTION[j]){
						if(i == j){
							Apoint += 1;
						}else{
							Bpoint += 1;
						}
					}
				}
			}
			
			//顯示結果
			createLabel(inputNum.val() + "  " + Apoint + "A"  + Bpoint + "B");
			
			//BINGO, 遊戲結束
			if(Apoint == numLen){
				alert("恭喜你成功了!!");
				var reward = Math.floor((Math.random() * 10) + 1);
				alert(reward);
				// $.get('/reload', {
				// 	address: fishAddress,
				// 	account: nowAccount
				// }, function (result) {
				// 	alert(result);
				// })
			}

			times--;
		}
		else{
			alert("超過次數!!");
		}
	}
})

//檢查輸入是否符合規定
function checkValueIsLegal () {
	/** 符合規定的條件
	 * 1.輸入框不足四個字三個字
	 * 2.皆為數字
	 * 3.數字皆不重複
	 **/

	//檢查輸入數字長度
	if(inputNum.val().length < 3){
		inputNum = "";
		alert("輸入框不足三個字");
		return false;
	}

	//皆為數字
	var isNumber = false;
	for(var i = 0 ; i < numLen ; i++){
		//判斷是否為space,此處要做例外判斷
		if(inputNum.val()[i] == " "){
			isNumber = true;
			break;
		}
		//比對是否為0~9
		for(var j = 0 ; j <= 9 ; j++){
			if(inputNum.val()[i] == j){
				//break可以跳出該次迴圈(for)
				break;
			}
			//如果到9都還不是,那代表這不是數字
			if(j == 9){
				isNumber = true;
			}
		}
	}
	if(isNumber){
		inputNum.text("");
		alert("請輸入數字");
		return false;
	}
	
	//數字皆不重複
	var isSame = false;
	for(var i = 0 ; i < numLen ; i++){
		for(j = numLen-1 ; j > 0 ; j--){
			if((inputNum.val()[i] == inputNum.val()[j])&&(i != j)&&(j > i)){
				isSame = true;
			}
		}
	}
	if(isSame){
		inputNum.text("");
		alert("請勿輸入重複數字");
		return false;
	}
	
	return true;
}

//顯示單行文字
function createLabel (inputText) {
	//如果沒有裝文字的地方,就會生成一個
	var labelBox = document.getElementById('labelBox');
	if(labelBox == null){
		labelBox = document.createElement('div');
		labelBox.id = "labelBox";
		document.body.appendChild(labelBox);
	}
	//文字
	var label = document.createElement('span');
	label.innerHTML = inputText;
	labelBox.appendChild(label);
	//斷行
	var hr = document.createElement('hr');
	labelBox.appendChild(hr);
}

//生成題目
function initQuestion (length) {
	var resultQ = [];
	var arrQ = ['0','1','2','3','4','5','6','7','8','9']
	
	for (var i = 0; i < length; ++i) {
		var random = Math.floor(Math.random() * arrQ.length); 
		if(resultQ.includes(arrQ[random])){ 
			continue; 
		} 
		resultQ.push(arrQ[random]);
		arrQ.splice(random,1);
		console.log(resultQ);
	}
	
	return resultQ;
}

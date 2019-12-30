'use strict'

let userName = $('#userName');
let userPwd = $('#userPwd');
let register = $('#register');
let login = $('#login');
let reload = $('#reload');
let txtUserName = $('#txtUserName');

let fishAddress = "0x603e8049bb933fdE61fc60f063CC655bE4FCbaD1";
let nowAccount = "0x8D00867fC51760F9A109b36433D8104EF179d891";

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

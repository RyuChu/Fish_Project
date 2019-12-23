'use strict'

let userName = $('#userName');
let userPwd = $('#userPwd');
let register = $('#register');
let login = $('#login');

let fishAddress = "0x0E469263B48e509d528C9cB9af346FE3fD6ea648";
let nowAccount = "0xdcf023e9577627722c64b69da56869b860015cd6";

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

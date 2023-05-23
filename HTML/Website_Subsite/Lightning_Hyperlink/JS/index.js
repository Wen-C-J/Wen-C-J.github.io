//主页退出APP提示在按一次退出程序
document.addEventListener('plusready', function(a) {
	var first = null;
	plus.key.addEventListener('backbutton', function() {
		//首次按键，提示‘再按一次退出应用’
		if (!first) {
			first = new Date().getTime();
			plus.nativeUI.toast( "再按一次退出程序");
			setTimeout(function() {
				first = null;
			}, 1000);
		} else {
			console.log(1);
			if (new Date().getTime() - first < 1000) {
				plus.runtime.quit();
			}
		}
	}, false);
});

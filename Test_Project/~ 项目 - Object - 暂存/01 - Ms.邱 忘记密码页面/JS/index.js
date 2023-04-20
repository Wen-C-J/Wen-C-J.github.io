/* ----------------- 点击复制事件 ----------------- */
var Copy_List = document.querySelectorAll(".copy")
for(var i = 0 ; i < Copy_List.length ; i++){  // 利用for循环进行快速绑定
    Copy_List[i].onclick = function(){
        // 获取h5标签的内容
        var span_innerHTML = this.innerHTML
        console.log("按钮按下事件：复制 - " + span_innerHTML)
        var that = this;
        $.copy({
            content:span_innerHTML,
            callback:function(){
                that.innerHTML = "复制成功！";
            }
        });
    }
}

//要返回主页面的子页面存放这个js
document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();
            } else {
                webview.close();
            }
        })
    });
});



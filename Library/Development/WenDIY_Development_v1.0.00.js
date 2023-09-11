/* >->->->->->->->->->->->->->->->->->->-> 包/模块 - 导入 <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-< */

/* --------------------- （同步）导入sweetalert2模块 --------------------- */
var xhr = new XMLHttpRequest();     // 导入sweetalert2.min.css模块
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = xhr.responseText;
        document.head.appendChild(style);
    }
};
xhr.open('GET', 'https://cdn.jsdelivr.net/npm/sweetalert2@11.1.7/dist/sweetalert2.min.css', false);
xhr.send();

var xhr = new XMLHttpRequest();     // 导入sweetalert2.min.js模块
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = xhr.responseText;
    document.head.appendChild(script);
  }
};
xhr.open('GET','https://cdn.jsdelivr.net/npm/sweetalert2@11.1.7/dist/sweetalert2.min.js', false);
xhr.send();


/* --------------------- jQuery - 3.6.4 模块 --------------------- */
var xhr = new XMLHttpRequest();     // 导入sweetalert2.min.js模块
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = xhr.responseText;
    document.head.appendChild(script);
  }
};
xhr.open('GET','https://code.jquery.com/jquery-3.6.4.js',false);
xhr.send();




/* >->->->->->->->->->->->->->->->->->->-> 封装 - 方法 <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-< */

/* ----------------------- 弹窗（右上角提示窗(3s)） ----------------------- *//*
    【功能】在右上角弹出提示框，将会在3s之后消失。
    【传入参数】
        icon ：（图标样式）'success' 、'error' 、'warning' 、'info' 、'question' 、'false'
        str ：提示内容！
    【返回值】在右上角生成一个弹窗，显示输入信息，提示3s。
*/
function PromptInformation(icon, str) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: icon,  // 'success' 、'error' 、'warning' 、'info' 、'question' 、'false'
        title: str
    })
}



/* --------------------- 复制（自定义版） --------------------- *//*
【功能】复制指定内容！
【传入参数】str ：要复制的内容！
【返回值】无返回值，追求自定义性强的原则
*/
function CopyText(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}



/* ----------------------- 生成随机数 ----------------------- *//*
    【功能】在指定的范围内生成一个随机数
    【传入参数】
        minNum ：产生随机数范围的最小值
        maxNum ：产生随机数范围的最大 值
    【返回值】返回一个指定范围的随机数随机数
*/
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

/* ----------------------- 阻止右击的默认行为 ----------------------- *//*
    【功能】阻止右击的默认行为！
*/
document.addEventListener('contextmenu', event => event.preventDefault());


/* ----------------------- Ajax - 钩子函数（jQuery版） ----------------------- *//*
    【功能】监测当前页面内的所有Ajax请求，并且返回请求的状态。
    【缺陷】只能监测通过jQuery发送的Ajax请求！
*/
var Ajax_Success = 0;
var Ajax_Error = 0;
var Ajax_Count = 0;

// ajaxStart() 【功能】在第一个 AJAX 请求发送之前触发
$(window).ajaxStart(function () {
    PromptInformation("warning","Ajax请求中……")
})

// ajaxSuccess() 【功能】在每个 AJAX 请求发送成功之后触发
$(window).ajaxSuccess(function () { Ajax_Success++; })

// ajaxError() 【功能】在每个 AJAX 请求发送失败之后触发
$(window).ajaxError(function () { Ajax_Error++; })

// ajaxComplete() 【功能】在每个 AJAX 请求发送完成之后触发
$(window).ajaxComplete(function () { Ajax_Count++; })

// ajaxStop() 【功能】在最后一个Ajax请求发送完成之后触发
$(window).ajaxStop(function () {
    PromptInformation("success",`所有Ajax请求已完成！<br>-----------------------<br>总请求数：${Ajax_Count}<br>成功次数：${Ajax_Success}<br>失败次数：${Ajax_Error}`)
})




/* ----------------------- 格式化JSON数据 ----------------------- *//*
    【功能】将读取的JSON文档内容进行格式化输出！
    【参数】JSON_Str   ->   JSON文档内容（支持类型：String/Object）
    【返回值】格式化后的JSON文档（String）
*/
function FormatDocument(JSON_Str) {
    if (typeof (JSON_Str) == "string") {
        var Temp_JSONData = JSON.parse(JSON_Str)
        return JSON.stringify(Temp_JSONData, null, 4);
    } else if (typeof (JSON_Str) == "object") {
        return JSON.stringify(JSON_Str, null, 4);
    } else {
        console.warn('（JSON_stringify()函数）传入的参数数据类型不正确！');
    }
}



/* --------------------- 文字逐字输出特效（自定义版） --------------------- *//*
    【功能】将指定的DOM标签的innerHTML内容修改为逐字输出特效！
    【参数】
        element  ->    DOM对象（object）
        speed    ->    字符输出速度（number）
    【返回值】
*/
function printTextByChar(element, speed) {
    let text = element.innerText;
    element.innerText = "";

    let i = 0;
    let timer = setInterval(function () {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}


/* >->->->->->->->->->->->->->->->->-> 网页加载完成后执行事件 <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-< */
window.addEventListener('load', function () {

    /* ------------------ 快速复制 - class样式版 ------------------ *//*
    【功能】(Android) 长按对class含有Copy样式的控件，进行对innerHTML内容进行复制
    【传入参数】无需传入参数，只需将class样式设置成copy即可调用此方法
    【返回值】无返回值，追求耦合性低！
    */
    var Copy_List = document.querySelectorAll(".Copy");
    for (let i = 0; i < Copy_List.length; i++) {
        Copy_List[i].style.userSelect = 'none';     // 将文本修改为不可复制
        Copy_List[i].oncontextmenu = function () {  // 添加右击复制事件
            const el = document.createElement('textarea');
            el.value = this.innerHTML;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            PromptInformation("success", "复制成功！")
        }
    }

    /* ------------------- 页面内所有标签不可被选中 ------------------- *//* 
    【功能】将网页内的所有标签的属性设置成不可选中
    */
    const elements = document.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute('unselectable', 'on');
        elements[i].setAttribute('draggable', 'false');
        elements[i].onselectstart = function () { return false; };
        elements[i].onmousedown = function () { return false; };
    }


    /* --------------- 标签内容逐字输出特效 - class样式版 --------------- *//* 
    【功能】将class名为graduallyText所有标签添加innerHTML值逐字输出特效！
    【关键词】class -> graduallyText
    */
    let graduallyTextElements = document.querySelectorAll('.graduallyText');    // 检索所有class名为graduallyText的标签
    graduallyTextElements.forEach(function (element) {      // 逐个添加效果
        printTextByChar(element, 150);
    });


    /* --------------- 格式化输出文档 - Class样式版 --------------- *//* 
    【功能】将class名为formatText的所有标签进行文档格式化输出！
    【提醒】展示文档的载体需要使用<pre>标签。
    【关键词】class -> formatText
    */
    let formatText_List = document.querySelectorAll(".formatText");
    formatText_List.forEach(element => {
        element.style.userSelect = "auto";      // 尝试解除无法选中的限制（失败）
        element.innerHTML = FormatDocument(element.innerHTML)
    });

});
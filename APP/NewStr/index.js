/* ----------------- APP - 数据初始化 ----------------- */
var LocalStorageConfigure = JSON.parse(localStorage.getItem("AppConfigure"))

if (LocalStorageConfigure == null) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./AppConfigure.json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            localStorage.setItem("AppConfigure", xhr.responseText)
            console.log("写入完成！");
            location.reload()
        }
    }
    xhr.send();     // 发送请求
} else { 
    console.log("存在本地数据(LocalStorageConfigure)(",typeof(LocalStorageConfigure),")：",LocalStorageConfigure);
}


/* -----------------渲染 初始化数据 ----------------- */
var StringData = LocalStorageConfigure.String
var MapDataList = StringData.map(function(item){
    return `<button id="${item.ID}" class="AllocationBtn ${item.BtnClass[item.Wheel]}">${item.name[item.Wheel]}</button>`
});
document.querySelector("#RenderingLabel").innerHTML = MapDataList.join("");

// 单独渲染<普通转换>按钮
document.querySelector("#BtnOrdinary").innerHTML = LocalStorageConfigure.ordinaryChange?"普通转换<br>to Chinese":"普通转换<br>to English";

// 单独渲染页面(body)的字体大小！
document.body.style.fontSize = LocalStorageConfigure.Setup.TextSize; 

// 获取标签textarea
var textarea = document.querySelector("#No_1");


/* ------------------ 普通转换（按钮点击） ------------------ */
function ordinaryConvert() { 
    // 获取当前编辑框的值
    var EditBoxValue = document.querySelector("#No_1").value;

    if(LocalStorageConfigure.ordinaryChange){   // 转换成Chinese
        console.log("to Chinese");
        TempStr = EditBoxValue.replace(/,/g, '，');    // 逗号（ 英 => 中 ）
        TempStr = TempStr.replace(/\./g, '。');    // 句号（ 英 => 中 ）
        TempStr = TempStr.replace(/\(/g, '（');   // 左括号（ 英 => 中 ）
        TempStr = TempStr.replace(/\)/g, '）');   // 右括号（ 英 => 中 ）
        TempStr = TempStr.replace(/:/g, '：');    // 冒号（ 英 => 中 ）
        TempStr = TempStr.replace(/;/g, '；');    // 分号（ 英 => 中 ）
        TempStr = TempStr.replace(/!/g, '！');    // 感叹号（ 英 => 中 ）
    }else{      // 转换成English
        console.log("to English");
        TempStr = EditBoxValue.replace(/，/g, ',');    // 逗号（ 中 => 英 ）
        TempStr = TempStr.replace(/。/g, '.');    // 句号（ 中 => 英 ）
        TempStr = TempStr.replace(/（/g, '(');    // 左括号（ 中 => 英 ）
        TempStr = TempStr.replace(/）/g, ')');    // 右括号（ 中 => 英 ）
        TempStr = TempStr.replace(/：/g, ':');    // 冒号（ 中 => 英 ）
        TempStr = TempStr.replace(/；/g, ';');    // 分号（ 中 => 英 ）
        TempStr = TempStr.replace(/！/g, '!');    // 感叹号（ 中 => 英 ）
        TempStr = TempStr.replace(/‘/g, '\'');    // 上单引号（ 中 => 英 ）
        TempStr = TempStr.replace(/“/g, '"');     // 下双引号（ 中 => 英 ）
        TempStr = TempStr.replace(/’/g, '\'');    // 下单引号（ 中 => 英 ）
        TempStr = TempStr.replace(/”/g, '"');     // 下双引号（ 中 => 英 ）
    }
    document.querySelector("#No_4").innerText = TempStr;
}


/* ------------------ 普通转换（切换转换方向） ------------------ */
function changeDirection(){
    LocalStorageConfigure.ordinaryChange = LocalStorageConfigure.ordinaryChange?false:true;
    document.querySelector("#BtnOrdinary").innerHTML = LocalStorageConfigure.ordinaryChange?"普通转换<br>to Chinese":"普通转换<br>to English";
    localStorage.setItem("AppConfigure", JSON.stringify(LocalStorageConfigure)) // 保存本地配置信息
    PromptInformation("success",`切换完成！<br> ${LocalStorageConfigure.ordinaryChange?"to Chinese":"to English"}`)
}


/* ------------------ 普通转换（自动触发） ------------------ */
textarea.addEventListener("input", function () { 
    ordinaryConvert();
})


/* ------------------ 格式优化 ------------------ */
function FormatOptimize() { 
    var OutPre = document.querySelector("#No_4");       // 获取输出显示标签
    var TempData = OutPre.innerText     // 获取显示标签的innerText值
    try {   // 尝试优化文档的排版
        var demo = JSON.parse(TempData)
        OutPre.innerText = JSON.stringify(demo, null, 4)
    } catch (error) {   // 失败后执行内容
        PromptInformation("error","该内容格式不支持优化！")
    }
}

/* ------------------ 专业转换 ------------------ */
function majorConvert() { 
    // 1 、保存textarea编辑框的value值！
    var TemptextareaData = document.querySelector("#No_1").value;

    // 2 、遍历数组中的所有元素，一一进行判断，对符合条件的元素进行相应的转换
    for(let i=0 ; i<LocalStorageConfigure.String.length ; i++){
        // console.log(LocalStorageConfigure.String[i].Wheel);
        if(LocalStorageConfigure.String[i].Wheel === 1){     // 判断是否转换成English
            if(typeof(LocalStorageConfigure.String[i].StrAlter[0]) === "object"){
                let StrLength = LocalStorageConfigure.String[i].StrAlter[0].length
                for(let j=0 ; j<StrLength ; j++){       // 遍历String数组中StrAlter[0]内数组中的所有元素
                    // 将数组中转换前的元素转换成正则表达式，方面后面使用数组的replace进行字符替换！
                    let TempRegular = new RegExp(LocalStorageConfigure.String[i].StrAlter[0][j],'g');
                    // 通过正则表达式，将符合条件的字符全都替换成English版字符！
                    TemptextareaData = TemptextareaData.replace(TempRegular,LocalStorageConfigure.String[i].StrAlter[1]);
                }
            }else if(typeof(LocalStorageConfigure.String[i].StrAlter[0]) === "string"){
                let TempRegular = new RegExp(LocalStorageConfigure.String[i].StrAlter[0],'g');
                TemptextareaData = TemptextareaData.replace(TempRegular,LocalStorageConfigure.String[i].StrAlter[1]);
            }else{
                console.log("Error ：数据类型有误！");
            }
        }else if(LocalStorageConfigure.String[i].Wheel == 2){   // 判断是否转换成Chinese
            if(typeof(LocalStorageConfigure.String[i].StrAlter[0]) === "object"){
                let StrLength = LocalStorageConfigure.String[i].StrAlter[0].length
                for(let j=0 ; j<StrLength ; j++){       // 遍历String数组中StrAlter[0]内数组中的所有元素
                    let TempRegular = new RegExp(LocalStorageConfigure.String[i].StrAlter[0][j], 'g');
                    TemptextareaData = TemptextareaData.replace(TempRegular,LocalStorageConfigure.String[i].StrAlter[2]);
                }
            }else if(typeof(LocalStorageConfigure.String[i].StrAlter[0]) === "string"){
                let TempRegular = new RegExp(LocalStorageConfigure.String[i].StrAlter[0],'g');
                TemptextareaData = TemptextareaData.replace(TempRegular,LocalStorageConfigure.String[i].StrAlter[2]);
            }else{
                console.log("Error ：数据类型有误！");
            }
        }else{
            console.log("Wheel的值为\"0\"，当前字符未配置转换！");
        }
    }

    // 3 、输出数据到pre标签进行展示
    document.querySelector("#No_4").innerText = TemptextareaData;

    // 4 、将更新的数据保存到localStorage本地存储！
    localStorage.setItem("AppConfigure",JSON.stringify(LocalStorageConfigure));
}




/* ------------------ 全选 ------------------ */
function SelectAll() { 
    document.querySelector("#No_1").select();
}

/* ------------------ 清空 ------------------ */
function CleanText(){
    document.querySelector("#No_1").value = " ";
}

/* ------------------ 清除并粘贴 ------------------ */
function CleanPaste() { 
    var textarea = document.querySelector("#No_1");
    navigator.clipboard.readText()  
    .then(text => {
        textarea.value = text;
    })  
    .catch(err => {  
        //可能会发生错误，比如使用者拒绝了请求的权限等  
        console.error('Error in reading text: ', err);  
    });
    ordinaryConvert();  // 触发自动转换
}

// 对以上三个事件进行绑定
document.querySelector("#BtnSelectAll").addEventListener('click', SelectAll);  
document.querySelector("#BtnCleanPaste").addEventListener('click', CleanPaste);  
document.querySelector("#BtnCleanText").addEventListener('click', CleanText);  

/* ------------------- 递增重置（0~2） ------------------- */
function NextNum (ArrayDemo){
    return ArrayDemo.Wheel>=ArrayDemo.BtnClass.length-1?0:ArrayDemo.Wheel+1
}

/* ------------------- 专业配置（All Button） ------------------- */
var AllocationBtn = document.querySelectorAll(".AllocationBtn")
// console.log(AllocationBtn);
for(let i = 0 ; i<AllocationBtn.length ; i++){
    AllocationBtn[i].onclick = function(){
        // 1 、获取当前按钮对应的数据所存的class的值
        let TargetIndex = LocalStorageConfigure.String.findIndex(obj => obj.ID === this.id);  // 获取目标对象在数组中所对应的索引

        // 2 、重置元素样式
        this.className = "AllocationBtn";

        // 3 、添加新的样式 
        this.classList.add(LocalStorageConfigure.String[TargetIndex].BtnClass[NextNum(LocalStorageConfigure.String[TargetIndex])]);

        // 4 、重新渲染标签的innerText的值
        this.innerHTML = LocalStorageConfigure.String[TargetIndex].name[NextNum(LocalStorageConfigure.String[TargetIndex])]

        // 5 、将原先的LocalStorageConfigure数据更新！
        LocalStorageConfigure.String[TargetIndex].Wheel = NextNum(LocalStorageConfigure.String[TargetIndex])

        // 6 、将新的数据更新到localStorage本地进行永久存储（弃）
            // 本步骤作废，上传数据到localStorage本地统一由（点击“专业转换”事件）进行完成！
            // 提高网站的处理效率！
    }
}



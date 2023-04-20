
/* --------------------- 恢复默认数据 - 功能 --------------------- */
document.querySelector("#Lightning_Hyperlink_resetting").oncontextmenu = function () {
    Swal.fire({
        title: '数据初始化',
        text: "此操作执行将会给数据恢复至默认数据，且不可逆，你确定吗？",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: '确定',
        cancelButtonColor: 'rgb(43,119,192)',
        cancelButtonText: '取消'
        }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire('数据初始化', '数据已经初始化完成，将会在3s内刷新页面！', 'success',3000)
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    })
}


/* --------------------- 数据初始化 --------------------- */
// localStorage.clear()
var localStorage_Data = localStorage.getItem("Lightning_Hyperlink_Data");
// 判断localStorage本地存储器是否存在数据
if (localStorage_Data == null) {
    // 初始化程序
    console.log("检测到localStorage无本地数据，开始初始化程序！")
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./Website_Subsite/Lightning_Hyperlink/Hyperlink_Data.json");
    xhr.send();
    xhr.onreadystatechange = function () { 
        if (xhr.readyState === 4) { 
            var JSON_Data = xhr.responseText;
            // console.log(JSON_Data);
            localStorage.setItem("Lightning_Hyperlink_Data", JSON_Data)
            console.log("初始化完成，数据：" + localStorage.getItem("Lightning_Hyperlink_Data"));
            location.reload();      // 刷新浏览器
        }
    }
} else { 
    console.log("localStorage本地存储器存在数据：" + JSON.parse(localStorage.getItem("Lightning_Hyperlink_Data")) + ",程序完成自检，开始启动！");
}



/* --------------------- Map - 数据映射到页面上 --------------------- */
var localStorage_Data = JSON.parse(localStorage.getItem("Lightning_Hyperlink_Data"));
var Arr_Data = localStorage_Data.Data_List;
var List_Data = Arr_Data.map(function (item) { 
    return `<a id="${Arr_Data.indexOf(item)}" href="${item.Hyperlink}" target="_self"><div class="web">${item.name}</div></a><!-- 站点 -->`
})
// 将数据打印到页面上
document.querySelector("#Lightning_Hyperlink").innerHTML = List_Data.join("");




/* --------------------- 恢复默认数据 - 功能 --------------------- */
Lightning_Hyperlink_instructions.onclick = function () {
    alert(`📃  APP 功能介绍 🛠

    📌 添加选项卡
        ➾  页面底部【Add】 ➾  填写信息

    📌 删除选项卡
        ➾ 长按标签 ➾ 删除标签

    📌 快速复制超链接
        ➾ 长按标签 ➾ 复制超链接

    📌 数据 - 导入 / 导出
        ➾ 长按【Add】 ➾  填写信息

    📌 数据恢复初始化
        ➾ 长按头像 ➾ 数据初始化`)
}



/* --------------------- 复制 & 删除 数据 - 功能 --------------------- */
var a_List = document.querySelectorAll("#Lightning_Hyperlink a");
for (var i = 0 ; i < a_List.length ; i++) { 
    // console.log(a_List[i]);
    a_List[i].oncontextmenu = function () { 
        Swal.fire({
            icon:"question",
            title: '请选择您要进行的操作！',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: '复制超链接',
            denyButtonText: `删除标签`,
            }).then((result) => {
            if (result.isConfirmed) {
                // 复制超链接
                const el = document.createElement('textarea');
                el.value = this.href;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                Swal.fire('超链接复制完成！', '', 'success')
            } else if (result.isDenied) {
                // 删除标签 - 询问
                Swal.fire({
                    title: '删除标签',
                    text: "此操作为不可逆操作，您确定吗？",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(199,46,46)',
                    confirmButtonText: '是的',
                    cancelButtonColor: 'rgb(103,92,216)',
                    cancelButtonText: '取消'
                    }).then((result) => {
                    if (result.isConfirmed) {
                        // 删除标签数据操作
                        var localStorage_Data = JSON.parse(localStorage.getItem("Lightning_Hyperlink_Data"));
                        localStorage_Data.Data_List.splice(this.id, 1)
                        localStorage.setItem("Lightning_Hyperlink_Data",JSON.stringify(localStorage_Data))
                        Swal.fire('删除标签', '数据删除完成，将会在三秒之后刷新页面！', 'success')
                        setTimeout(() => {
                            location.reload()
                        }, 3000);
                    }
                })
            }
        })
    }
}

function PromptInformation(str) { 
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
        icon: 'success',
        title: str
    })
}

/* --------------------- 单个添加（Add） 数据 - 功能 --------------------- */
Lightning_Hyperlink_Add.onclick = function () { 
    (async () => {

        const { value: formValues } = await Swal.fire({
        title: '添加标签',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="请输入昵称">' +
            '<input id="swal-input2" class="swal2-input" placeholder="请输入超链接地址（ URL ）">',
        focusConfirm: false,
        preConfirm: () => {
            return [
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
            ]
        }
        })
        if (formValues) {
            // 创建初始化数据模板
            var Temp_Obj = { "name": "未填", "Hyperlink": "未填" }
            // 用户输入信息覆盖原始数据
            Temp_Obj.name = formValues[0]
            Temp_Obj.Hyperlink = formValues[1]
            console.log(Temp_Obj); 

            var Temp_Data = JSON.parse(localStorage.getItem("Lightning_Hyperlink_Data"))
            Temp_Data.Data_List.push(Temp_Obj);
            localStorage.setItem("Lightning_Hyperlink_Data", JSON.stringify(Temp_Data));
            Swal.fire('添加数据', '数据添加成功，将在3s后刷新页面！', 'success')
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    })()
}




/* --------------------- 数据 导入 / 导出 - 功能 --------------------- */
Lightning_Hyperlink_Add.oncontextmenu = function () { 
    Swal.fire({
        icon:"question",
        title: '请选择操作',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: '导出',
        denyButtonText: `导入`,
        }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
            
                var Temp_Data = localStorage.getItem("Lightning_Hyperlink_Data")
                

                // 复制操作
                const el = document.createElement('textarea');
                el.value = Temp_Data;
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                Swal.fire('数据导出成功！', '', 'success')
            } else if (result.isDenied) {
                (async () => {
                    const { value: text } = await Swal.fire({
                    input: 'textarea',
                    inputLabel: '数据导入',
                    inputPlaceholder: '请输入对象格式类型数据......',
                    inputAttributes: {
                        'aria-label': 'Type your message here'
                    },
                    showCancelButton: true
                    })
                    if (text) {
                        // 数据分析
                        var input_text = text.replace(/[\r\n\s]+/g, "");
                        if (/^{.*Data_List.*}$/g.test(input_text)) {
                            localStorage.setItem("Lightning_Hyperlink_Data",input_text)
                            Swal.fire('数据导入完成', '数据导入成功，将在3s后刷新页面！', 'success');
                            setTimeout(() => {
                                location.reload();
                            }, 3000);
                        } else { 
                            Swal.fire('数据导入异常', '数据格式不正确', 'error')
                        }
                    }
                })()
                
        }
    })
}





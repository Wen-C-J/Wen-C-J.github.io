/* ---------------- >>>>>>>>>> 包/模块 - 导入 <<<<<<<<<< ---------------- */

/* --------- 导入sweetalert2模块 --------- */
// 创建link标签
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.1.7/dist/sweetalert2.min.css';
// 将link标签添加到head中
document.getElementsByTagName('head')[0].appendChild(link);
// 创建script标签
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11.1.7/dist/sweetalert2.min.js';
// 将script标签添加到head中
document.getElementsByTagName('head')[0].appendChild(script);




/* ---------------- >>>>>>>>>> 封装 - 方法 <<<<<<<<<< ---------------- */

/* --------- 弹窗（右上角提示窗(3s)） --------- */
/*
【功能】在右上角弹出提示框，将会在3s之后消失。
【传入参数】
    icon ：（图标样式）'success' 、'error' 、'warning' 、'info' 、'question' 、'false'
    str ：提示内容！
【返回值】在右上角生成一个弹窗，显示输入信息，提示3s。
*/
function PromptInformation(icon,str) { 
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
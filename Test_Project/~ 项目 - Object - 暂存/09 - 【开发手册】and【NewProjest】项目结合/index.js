// 获取页面中用于展示的 Main 标签
var Main = document.querySelector("#Main")

function Home() { 
    console.log("【Home】按钮被触发！");
    Main.innerHTML = `<section>
    <br><br><br>
    <h1>📌 首页</h1>
    <br>
    <h2>你好，我是Mr.温！</h2>
    
    <p>未来的你，一定会感谢现在拼命的自己！</p>

    <p>The future you will definitely thank the present hardworking self.</p>

  </section>`;
    PromptInformation("首页 - 切换成功！")
}

function TestObject() { 
    console.log("【TestObject】按钮被触发！");
    Main.innerHTML = `<iframe src="https://212748w3o9.goho.co/Test_Project/index.html?p=${Math.floor(Math.random() * 100)}" frameborder="0"></iframe>`
    PromptInformation("TestObject项目刷完成！");
}

function PDF_CSS_Streamline() { 
    Main.innerHTML = `<div style="width: 100%;height: 100%;background-color: white;">
    <img src="./PDF/Html5_CSS_Streamline.png">
  </div>`
    PromptInformation("CSS精简版 加载完成 !");
}

function PDF_CSS_Detailed() { 
    Main.innerHTML = `<div style="width: 100%;height: 100%;background-color: white;">
    <img src="./PDF/Html5_CSS_Detailed.png">
  </div>`
    PromptInformation("CSS详细版 加载完成 !");
}

function PDF_JS() { 
    Main.innerHTML = `<div style="width: 100%;height: 100%;background-color: white;">
    <img src="./PDF/JavaScript.jpg">
  </div>`
    PromptInformation("JavaScript 加载完成 !");
}

function OpenChatGPT() { 
    console.log(localStorage.getItem("Hyperlink_ChatGPT"));
    if (localStorage.getItem("Hyperlink_ChatGPT") == null) {
      Main.innerHTML = `<iframe src="https://supremes.pro/" frameborder="0"></iframe>`
      console.log("【Hyperlink_ChatGPT】数据不存在，调用默认数据！");
    } else { 
      Main.innerHTML = `<iframe src="${localStorage.getItem("Hyperlink_ChatGPT")}" frameborder="0"></iframe>`
      console.log("【Hyperlink_ChatGPT】数据存在，调用设定值！");
    }
    PromptInformation("智能助手 ChatGPT");
}

function UpChatGPT() { 
  var Temp_Hyperlink = window.prompt("📌请输入新的ChatGPT超链接：")
  if (Temp_Hyperlink.startsWith("http")) {
    localStorage.setItem("Hyperlink_ChatGPT", Temp_Hyperlink)
    PromptInformation("ChatGPT超链接有效，修改完成！")
  } else { 
    PromptInformation("输入内容无效，操作取消")
  }
}

function LocationHref() { 
    location.href = `https://212748w3o9.goho.co/Test_Project/index.html?p=${Math.floor(Math.random() * 100)}`
    PromptInformation("JavaScript文档 - 维护中……");
}
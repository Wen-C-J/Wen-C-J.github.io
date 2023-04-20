//生成从minNum到maxNum的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
}

// 产生随机颜色
function getColor() {
    var str = "#";
    for (var i = 0; i < 6; i++) {
        str += (parseInt((Math.random() * 16)).toString(16));
    }
    
    return str;
}

// 弹球移动事件
function Pinball_Move(Move_Demo,){
    var x = Move_Demo.offsetLeft;    // 获取小球当前x轴偏移量
    var y = Move_Demo.offsetTop;    // 获取小球当前y轴偏移量
    if (x > w - Pinball_Size + Dad_Left_Positioning || x < Dad_Left_Positioning){
      gox = -gox;
      div1.style.backgroundColor = getColor();    // 碰壁变色
    }
    div1.style.left = x + X_deviation * gox + "px";
    if (y > h - Pinball_Size + Dad_Top_Positioning || y < Dad_Top_Positioning){
      goy = -goy;
      div1.style.backgroundColor = getColor();    // 碰壁变色
    }
    div1.style.top = y + Y_deviation * goy + "px";
};




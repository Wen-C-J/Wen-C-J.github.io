/* >->->->->->->->->->->->->->->->->->->-> 封装 - 方法 <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-< */

/* --------- 复制（自定义版） --------- *//*
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

/* ----------------------- 阻止右击的默认行为 ----------------------- *//*
    【功能】阻止右击的默认行为！
*/
// document.addEventListener('contextmenu', event => event.preventDefault());



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



/* --------------------- 判断是否为闰年 --------------------- *//*
    【功能】判断输入年份是否为闰年
    【参数】year    ->      年份（Number）
    【返回值】闰年返回True，平年返回Flase。
*/
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}



/* --------------------- 计算某一年的天数 --------------------- *//*
    【功能】计算输入年份的天数。
    【参数】year    ->      年份（Number）
    【返回值】输入年份的天数
*/
function YearDays(year){
    let leapYear = false, sum_day = 0, month_arr = [4, 6, 9, 11];
    if (year % 100 === 0) {     // 年份是整百
        leapYear = year % 400 === 0 
    } else {
        leapYear = year % 4 === 0
    }
    // 下面计算每个月的天数
    for (let i = 1; i < 13; i++) {
        if (i === 2) {
            sum_day += leapYear ? 29 : 28
        } else if (month_arr.includes(i)) {
            sum_day += 30
        } else {
        sum_day += 31
        }
    }
    return sum_day
}



/* --------------------- 计算今年剩余的天数 --------------------- *//*
    【功能】计算今年的剩余天数！
    【返回值】返回今年的剩余天数！
*/
function YearResidueDays(){
    // 今天的标准时间
    let today = new Date();
    // 本年最后标准时间
    let endYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59);
    // 一天的毫秒数
    let msPerDay = 24 * 60 * 60 * 1000;
    // 计算剩余毫秒除以一天的毫秒数，就是天数
    return Math.round((endYear.getTime() - today.getTime()) / msPerDay);
}



/* --------------------- 计算当前月天数 --------------------- *//*
    【功能】通过输入指定年份以及月份会返回指定月份的天数！
    【参数】
        mouth   ->    月份（Number）
        year    ->    年份（Number）
    【返回值】返回指定月份的天数！
*/
function getMonthDays ( year , mouth ) {
    let days = 30
    if (mouth === 2) {//2月份的天数需要判断是否是闰年，闰年29天，平年28天
        days = year % 4 === 0 ? 29 : 28
    } else if (mouth === 1 || mouth === 3 || mouth === 5 || mouth === 7 || mouth === 8 || mouth === 10 || mouth === 12) {
        // 月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
        days = 31
    }
    return days
}



/* --------------------- 计算时间差函数（模糊/年月 版） --------------------- *//*
    【功能】输入指定的时间，计算当前时间距离指定时间的时间差，能够精确计算过去了几年几个月！
    【参数】inputDate   ->      指定时间（String）
    【调用示例】DifferYearsTime("2023-10-20 00:00:00")
    【返回值】
        ResultTimeData： {
            NowTime:new Date(NowDate),  // 存放当前时间
            SetDate:new Date(SetDate),  // 存放设定时间
            YearED:0,          // 年（差）
            MonthED:0,         // 月（差）
            DayED:"--",           // 日（差）
            HourED:"--",          // 时（差）
            MinuteED:"--",        // 分（差）
            SecondED:"--",        // 秒（差）
            MillisecondED:"--",    // 毫秒（差）
            getDifferTime_String:"--",   // 格式输出（例：2023年11月20日10时10分00秒）
            getDifferTime_Symbol:"--",   // 格式输出（例：2023-11-20 10:10:00） 
        }
*/
function DifferYearsTime(inputDate){
    let NowDate = new Date();   // 获取当前时间
    // 创建输入日期的Date对象，如果输入的日期无效，则返回"Invalid Date"  
    let SetDate = new Date(inputDate);
    if (isNaN(SetDate.getTime())) {
        return "Invalid Date";
    }
    // 存放返回结果（设定默认值）！
    let ResultTimeData = {
        NowTime:new Date(NowDate),  // 存放当前时间
        SetDate:new Date(SetDate),  // 存放设定时间
        YearED:0,          // 年
        MonthED:0,         // 月
        DayED:"--",           // 日
        HourED:"--",          // 时
        MinuteED:"--",        // 分
        SecondED:"--",        // 秒
        MillisecondED:"--",    // 毫秒
        getDifferTime_String:"--",   // 格式输出（例：2023年11月20日10时10分00秒）
        getDifferTime_Symbol:"--",   // 格式输出（例：2023-11-20 10:10:00）
    }
    SetDate.setFullYear(SetDate.getFullYear() + 1); // 将年份增加一年
    while ( NowDate - SetDate > 0 ) {
        ResultTimeData.YearED ++;     // 过去的年份+1
        SetDate.setFullYear(SetDate.getFullYear() + 1); // 将年份增加一年
    }
    SetDate.setFullYear(SetDate.getFullYear() - 1); // 将年份减少一年（恢复到正常值！）
    SetDate.setMonth(SetDate.getMonth() + 1); // 将月份 +1
    while ( NowDate - SetDate > 0 ) {
        ResultTimeData.MonthED ++;     // 过去的月份 +1
        SetDate.setMonth(SetDate.getMonth() + 1); // 将月份 +1
    }
    SetDate.setMonth(SetDate.getMonth() - 1); // 将月份 - 1（恢复到正常值）
    let DifferTime = NowDate - SetDate     // 时间戳（剩余天数）
    ResultTimeData.DayED = Math.floor(DifferTime / (1000 * 60 * 60 * 24))
    ResultTimeData.HourED = Math.floor((DifferTime % (1000 * 60 * 60 * 24)) / (1000*60*60) )
    ResultTimeData.MinuteED = Math.floor((DifferTime % (1000 * 60 * 60 )) / (1000*60))
    ResultTimeData.SecondED = Math.floor((DifferTime % (1000 * 60 )) / (1000))
    ResultTimeData.MillisecondED = Math.floor((DifferTime % 1000))
    ResultTimeData.getDifferTime_String = `${ResultTimeData.YearED} 年 ${ResultTimeData.MonthED} 月 ${ResultTimeData.DayED} 日 ${ResultTimeData.HourED} 时 ${ResultTimeData.MinuteED} 分 ${ResultTimeData.SecondED} 秒`
    ResultTimeData.getDifferTime_Symbol = `${ResultTimeData.YearED}-${ResultTimeData.MonthED}-${ResultTimeData.DayED} ${ResultTimeData.HourED}:${ResultTimeData.MinuteED}:${ResultTimeData.SecondED}`
    return ResultTimeData
}



/* -------------------------- 计算时间差函数（清晰/Days 版） --------------------------  *//*
    【功能】计算今天距哪年的某天已经过去多少久，以“天”为最大单位，时间相对精准！
    【参数】 DateTime   ->      指定时间（String）
    【调用示例】DifferDaysTime("2023-10-20 00:00:00")
    【返回值】
        ReturnTime : {
            toPastimes:day + " 天 " + hour + " 时 " + minute + " 分 " + second + " 秒",     // 格式输出（0 天 0 时 0 分 0 秒）
            day:day,        // 天（差）
            hour:hour,      // 时（差）
            minute:minute,  // 分（差）
            second:second   // 秒（差）
        }
*/
function DifferDaysTime(DateTime) {
    let SpecifyTime = new Date(DateTime);   // 设定起始时间（修改值）
    // 创建输入日期的Date对象，如果输入的日期无效，则返回"Invalid Date"
    if (isNaN(SpecifyTime.getTime())) {
        return "Invalid Date";
    }
    let PresentTime = new Date();    //结束时间(当前时间)
    let DifferTime = PresentTime.getTime() - SpecifyTime.getTime();   //时间差的毫秒数
    // 计算出相差的天数
    let day = Math.floor(DifferTime/(24*3600*1000));
    // 计算出相差的小时数
	let day_surplus = DifferTime%(24*3600*1000);    //计算天数后剩余的毫秒数
	let hour = Math.floor(day_surplus/(3600*1000));

    //计算相差分钟数
	let hour_surplus = day_surplus%(3600*1000)        //计算小时数后剩余的毫秒数
	let minute = Math.floor(hour_surplus/(60*1000))
	//计算相差秒数
	let minute_surplus = hour_surplus%(60*1000)      //计算分钟数后剩余的毫秒数
	let second = Math.round(minute_surplus/1000)

    var ReturnTime = {      // 创建对象，用于输出数据
        toPastimes:day + " 天 " + hour + " 时 " + minute + " 分 " + second + " 秒",
        day:day,
        hour:hour,
        minute:minute,
        second:second
    }
    return ReturnTime;
}



/* >->->->->->->->->->->->->->->->->-> 网页加载完成后执行事件 <-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-<-< */
window.addEventListener('load', function () {

    /* ------------------ 快速复制 - class样式版 ------------------ *//*
    【功能】(Android) 长按对class含有Copy样式的控件，进行对innerHTML内容进行复制
    【传入参数】无需传入参数，只需将class样式设置成copy即可调用此方法
    【返回值】无返回值，追求耦合性低！
    */
    var Copy_List = document.querySelectorAll(".Copy");
    for ( let i = 0 ; i < Copy_List.length ; i++ ) {
        Copy_List[i].style.userSelect = 'none';     // 将文本修改为不可复制
        Copy_List[i].oncontextmenu = function () {  // 添加右击复制事件
            const el = document.createElement('textarea');
            el.value = this.innerHTML;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }
    
    /* --------------- Button标签和ProhibitSelection样式不可被选中 --------------- *//*
    【功能】将网页内的所有button和带ProhibitSelection样式的标签属性设置成不可选中
    */
    var Style_ProhibitSelection = document.querySelectorAll('.ProhibitSelection');
    var ButtonS = document.querySelectorAll('button');
    var DomLabelList = [...Style_ProhibitSelection,...ButtonS]
    for (var i = 0; i < DomLabelList.length; i++) {  
        DomLabelList[i].style.userSelect = 'none';  
    }

    /* --------------- 标签内容逐字输出特效 - Class样式版 --------------- *//* 
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
        element.style.userSelect = "auto";      // 常识接触无法选中的限制（失败）
        element.innerHTML = FormatDocument(element.innerHTML)
    });


});
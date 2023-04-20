function showtime(){
	var nowtime = new Date()
	var h = nowtime.getHours();
	var m = nowtime.getMinutes();
	var s = nowtime.getSeconds();
	
	h = checktime(h);
	m = checktime(m);
	s = checktime(s);
	
	return h + ":" + m + ":" + s;
	
}

function checktime(x){
	if(x<10){
		x = "0" + x;
	}
	return x;
}


var divList = document.querySelectorAll("text");

setInterval(()=>{
	timeStr =showtime()
	divList.forEach((item,i)=>{
		
		item.innerHTML = timeStr ;
	})
},1000)
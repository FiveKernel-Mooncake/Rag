function setBackgroundByTime(){
    const hour = new Date().getHours();
    const body = document.body;
    if(hour >= 8 && hour <16){
        body.style.backgroundImage = "url('Material/morning.png')";
    }else{
        body.style.backgroundImage = "url('Material/evening.png')";
    }
}

setBackgroundByTime()

// 每半小时检查一次，确保背景实时更新
setInterval(setBackgroundByTime, 30 * 60 * 1000);

// 你可以在这个文件中加入其他的逻辑，比如游戏启动、日历功能等
function startGame() {
    alert('Game Started!');
}



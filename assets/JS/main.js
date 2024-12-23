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












// 签到/签退功能
let signInTime = 0;
let signOutTime = 0;
let calendarDays = [];  // 保存日历的日期和时长

// 日历页面 DOM 引用
const calendarPage = document.getElementById('calendarPage');
const calendarContainer = document.getElementById('calendarContainer');
const calendarTitle = document.getElementById('calendarTitle');

// 当前日期
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth();  // 0 为1月，11为12月

// 获取当前月的总天数
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// 获取当前月的第一天是星期几
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

// 控制日历显示
const calendarIcon = document.getElementById('calendarIcon');
calendarIcon.addEventListener('click', () => {
    calendarPage.classList.toggle('active');
    renderCalendar();
});

// 渲染日历
function renderCalendar() {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

    // 更新日历标题
    calendarTitle.textContent = `${currentYear}年 ${currentMonth + 1}月`;

    // 清空日历内容
    calendarContainer.innerHTML = '';

    // 先添加空的 div 来对齐日期
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendarContainer.appendChild(emptyDay);
    }

    // 添加每一天的日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.textContent = day;

        // 初始化当天数据
        if (!calendarDays[day]) {
            calendarDays[day] = { day, duration: 0 };  // 创建一个新的日期对象
        }

        // 如果该天有时长，标记为签到状态
        if (calendarDays[day].duration > 0) {
            dayElement.classList.add('signed-in');
        }

        // 点击当天查看详情
        dayElement.addEventListener('click', () => showDayDetails(day));

        calendarContainer.appendChild(dayElement);
    }
}

// 显示日期详情
function showDayDetails(day) {
    alert(`Day ${day} 游玩时长：${calendarDays[day].duration}分钟`);
}

// 点击 "Start" 按钮时，记录签到时间
function startGame() {
    signInTime = Date.now(); // 记录签到时间
    alert('签到成功！');
}

// 点击 "Exit" 按钮时，记录签退时间并计算时长
function exitGame() {
    signOutTime = Date.now(); // 记录签退时间
    const duration = Math.floor((signOutTime - signInTime) / 60000); // 计算时长（分钟）
    
    // 获取今天的日期
    const dayOfMonth = today.getDate();  // 当前日期
    calendarDays[dayOfMonth].duration = duration; // 更新当天时长

    alert(`签退成功！游玩时长：${duration}分钟`);
    renderCalendar(); // 刷新日历
}

// 页面加载时初始化
window.onload = () => {
    renderCalendar();
};

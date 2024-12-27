// 获取日历页面和按钮
const calendarPage = document.getElementById('calendarPage');
const calendarIcon = document.getElementById('calendarIcon');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const backButton = document.getElementById('backButton');
const monthYearElement = document.getElementById('monthYear');
const currentMonthElement = document.getElementById('currentMonth');
const currentYearElement = document.getElementById('currentYear');
const calendarGrid = document.querySelector('.calendar-grid');

// 当前日期（始终使用系统当前时间）
let currentDate = new Date();

// 初始化日历显示
function renderCalendar(date) {
    // 使用传入的日期来渲染日历（如果没有传入，则使用当前日期）
    const dateToRender = date || new Date();
    const month = dateToRender.getMonth();
    const year = dateToRender.getFullYear();

    // 更新月份和年份显示
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    currentMonthElement.textContent = monthNames[month];
    currentYearElement.textContent = year;

    // 生成日期格子
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay(); // 获取1号是星期几，0是周日，1是周一，以此类推

    // 如果是周日（0），要调整到星期一（1）
    const firstDayShift = (startingDay === 0) ? 6 : startingDay - 1;

    // 清空已有的日期
    calendarGrid.innerHTML = '';
    
    // 填充星期头部（周一到周日）
    const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    weekdayNames.forEach(name => {
        const dayNameDiv = document.createElement('div');
        dayNameDiv.classList.add('day-name');
        dayNameDiv.textContent = name;
        calendarGrid.appendChild(dayNameDiv);
    });

    // 填充前面的空白格子
    for (let i = 0; i < firstDayShift; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('day');
        calendarGrid.appendChild(emptyDiv);
    }

    // 填充日期格子
    for (let i = 1; i <= numDaysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = i;

        // 如果是今天的日期，给它加上 special class
        const today = new Date();
        if (today.getDate() === i && today.getMonth() === month && today.getFullYear() === year) {
            dayDiv.classList.add('today');
        }

        calendarGrid.appendChild(dayDiv);
    }
}

// 点击当前月份，切换这一年中的所有月份
currentMonthElement.addEventListener('click', function() {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // 创建一个月份选择器
    const monthSelector = document.createElement('div');
    monthSelector.classList.add('month-selector');
    monthNames.forEach((monthName, index) => {
        const monthOption = document.createElement('div');
        monthOption.classList.add('month-option');
        monthOption.textContent = monthName;
        monthOption.addEventListener('click', function() {
            currentDate.setMonth(index);  // 设置为选中的月份
            renderCalendar(currentDate);  // 传入当前选择的日期
            monthSelector.remove();  // 选择后移除月份选择框
        });
        monthSelector.appendChild(monthOption);
    });

    // 将选择框添加到页面
    document.body.appendChild(monthSelector);

    // 点击页面其他地方时关闭选择框
    document.addEventListener('click', function(e) {
        if (!monthSelector.contains(e.target) && e.target !== currentMonthElement) {
            monthSelector.remove();
        }
    });
});

// 点击当前年份，切换到2023-2030年中的任意年份
currentYearElement.addEventListener('click', function() {
    const yearSelector = document.createElement('div');
    yearSelector.classList.add('year-selector');
    
    // 生成2023-2030年的选择框
    for (let i = 2023; i <= 2030; i++) {
        const yearOption = document.createElement('div');
        yearOption.classList.add('year-option');
        yearOption.textContent = i;
        yearOption.addEventListener('click', function() {
            currentDate.setFullYear(i);  // 设置为选中的年份
            renderCalendar(currentDate);  // 传入当前选择的日期
            yearSelector.remove();  // 选择后移除年份选择框
        });
        yearSelector.appendChild(yearOption);
    }

    // 将选择框添加到页面
    document.body.appendChild(yearSelector);

    // 点击页面其他地方时关闭选择框
    document.addEventListener('click', function(e) {
        if (!yearSelector.contains(e.target) && e.target !== currentYearElement) {
            yearSelector.remove();
        }
    });
});

// 为日历按钮添加点击事件，显示日历
calendarIcon.addEventListener('click', function() {
    calendarPage.classList.add('active');
    renderCalendar();  // 始终使用当前日期
});

// 为切换月份按钮添加事件
prevMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);  // 传入当前日期
});

nextMonthBtn.addEventListener('click', function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);  // 传入当前日期
});

// 返回按钮功能
backButton.addEventListener('click', function() {
    calendarPage.classList.remove('active');
});

// 初始化渲染日历
renderCalendar();  // 始终渲染当前日期

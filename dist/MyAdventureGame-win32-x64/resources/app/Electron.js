const { app, BrowserWindow } = require('electron');
const path = require('path');

// 创建一个新的窗口
function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            contextIsolation: true,  // 启用上下文隔离
            preload: path.join(__dirname, 'preload.js')  // 使用预加载脚本来与 Node.js 交互
        }
    });

    // 加载本地的 HTML 文件
    win.loadFile('assets/Main.html');
}

// 应用准备好时创建窗口
app.whenReady().then(createWindow);

// 监听窗口关闭事件
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();  // 非 macOS 系统退出应用
    }
});

// 处理 macOS 系统的窗口行为
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();  // 如果没有窗口，重新创建一个窗口
    }
});

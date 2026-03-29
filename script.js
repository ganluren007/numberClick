// 获取网格容器
const gridContainer = document.getElementById('numberGrid');

// 创建音频对象用于播放提示音
const dingAudio = new Audio('ding.mp3');
dingAudio.volume = 1.0;

// 播放"叮"的提示音
function playDingSound() {
    // 重置音频到开头并播放
    dingAudio.currentTime = 0;
    dingAudio.play().catch(e => {
        // 如果播放失败（例如用户还没有交互），忽略错误
        console.log('音频播放失败:', e);
    });
}

// 生成1-100的数字，跳过68
for (let i = 1; i <= 100; i++) {
    // 跳过68
    if (i === 68) continue;
    
    // 创建数字元素
    const numberItem = document.createElement('div');
    numberItem.classList.add('number-item');
    numberItem.textContent = i;
    
    // 添加点击事件
    numberItem.addEventListener('click', function() {
        // 播放提示音
        playDingSound();
        
        // 创建绿色圆圈
        const circle = document.createElement('div');
        circle.classList.add('green-circle');
        
        // 添加到数字项
        this.appendChild(circle);
        
        // 3秒后移除圆圈
        setTimeout(() => {
            if (circle.parentNode) {
                circle.remove();
            }
        }, 3000);
    });
    
    // 添加到网格容器
    gridContainer.appendChild(numberItem);
}

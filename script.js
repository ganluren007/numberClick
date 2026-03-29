// 获取网格容器
const gridContainer = document.getElementById('numberGrid');

// 创建音频上下文用于播放提示音
let audioContext = null;

// 初始化音频上下文（需要在用户交互后创建）
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// 播放"叮"的提示音
function playDingSound() {
    if (!audioContext) {
        initAudioContext();
    }
    
    if (audioContext) {
        // 创建振荡器
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 连接节点
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // 使用方波产生类似铃铛的金属质感
        oscillator.type = 'square';
        
        // 频率：1046Hz (C6)，经典的铃铛音调
        oscillator.frequency.setValueAtTime(1046, audioContext.currentTime);
        
        // 音量包络 - 模拟敲击铃铛后的自然衰减
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0.6, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        // 播放声音
        oscillator.start(now);
        oscillator.stop(now + 0.6);
    }
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
        // 初始化音频上下文
        initAudioContext();
        
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

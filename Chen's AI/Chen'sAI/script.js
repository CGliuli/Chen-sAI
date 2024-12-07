// 初始化Swiper轮播
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 聊天框功能
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// 发送消息
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = content;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// AI回复逻辑
const AI_RESPONSES = {
    default: "你好！我是琉璃的AI助手，很高兴为你服务。我可以：\n1. 介绍琉璃的个人信息\n2. 分享她的专业技能\n3. 讨论前端开发相关话题\n4. 回答其他问题\n请问有什么我可以帮你的吗？",
    
    // 基本问候语
    greetings: ["你好", "hi", "hello", "嗨", "在吗", "在么", "您好"],
    
    // 关于个人信息的关键词
    about: ["介绍", "简介", "关于", "是谁", "琉璃是谁", "个人信息"],
    
    // 关于技能的关键词
    skills: ["技能", "会什么", "工作", "专业", "前端", "开发", "编程", "设计"],
    
    // 关于项目的关键词
    projects: ["项目", "作品", "案例", "网站", "开发经��"],
    
    // 关于联系方式的关键词
    contact: ["联系", "联络", "社交", "邮箱", "github", "微信", "邮件"],
    
    // 其他常见问题
    faq: ["学习", "经验", "建议", "怎么学", "如何入门"]
};

function getAIResponse(message) {
    message = message.toLowerCase();
    
    // 处理问候语
    if (AI_RESPONSES.greetings.some(word => message.includes(word))) {
        return "你好！很高兴见到你。我是琉璃的AI助手，有什么我可以帮你的吗？";
    }
    
    // 处理关于个人信息的询问
    if (AI_RESPONSES.about.some(word => message.includes(word))) {
        return "琉璃是一位充满创造力的前端开发者，热爱编程和设计。她专注于创造优秀的用户体验，并且一直在探索新的技术和创新方案。";
    }
    
    // 处理关于技能的询问
    if (AI_RESPONSES.skills.some(word => message.includes(word))) {
        return "琉璃的主要技能包括：\n1. 前端开发：精通HTML、CSS、JavaScript\n2. 框架应用：熟练使用现代前端框架\n3. UI/UX设计：对用户体验有独特见解\n4. 响应式开发：能够创建适配各种设备的网站";
    }
    
    // 处理关于项目的询问
    if (AI_RESPONSES.projects.some(word => message.includes(word))) {
        return "琉璃参与过多个有趣的项目，包括：\n1. 个人主页开发\n2. 响应式网站设计\n3. 交互式web应用\n想了解更多项目详情，可以访问她的GitHub主页。";
    }
    
    // 处理关于联系方式的询问
    if (AI_RESPONSES.contact.some(word => message.includes(word))) {
        return "你可以通过以下方式联系琉璃：\n1. 页面底部的社交媒体链接\n2. 发送邮件到：[your.email@example.com]\n3. 访问她的GitHub主页：[github-link]";
    }
    
    // 处理关于学习建议的询问
    if (AI_RESPONSES.faq.some(word => message.includes(word))) {
        return "关于前端开发学习，琉璃建议：\n1. 打好基础：深入学习HTML、CSS和JavaScript\n2. 实践项目：多动手做项目，积累实战经验\n3. 保持学习：关注新技术发展，不断提升自己\n4. 参与社区：加入技术社区，与他人交流学习";
    }
    
    // 默认回复
    return "抱歉，我不太理解你的问题。你可以试着问我：\n1. 关于琉璃的个人介绍\n2. 她的专业技能\n3. 项目经验\n4. 如何联系她\n或者其他你感兴趣的话题。";
}

// 添加打字机效果
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 修改handleSendMessage函数
function handleSendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // 添加用户消息
        addMessage(message, true);
        messageInput.value = '';
        
        // 显示AI正在输入的状态
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing';
        typingDiv.textContent = '正在输入...';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 延迟后显示AI回复
        setTimeout(() => {
            // 移除输入状态
            chatMessages.removeChild(typingDiv);
            
            // 添加AI回复
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            chatMessages.appendChild(aiMessage);
            
            // 使用打字机效果显示回复
            typeWriter(aiMessage, getAIResponse(message));
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
}

// 添加页面加载时的欢迎消息
window.addEventListener('load', () => {
    setTimeout(() => {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message ai-message';
        chatMessages.appendChild(welcomeMessage);
        typeWriter(welcomeMessage, AI_RESPONSES.default);
    }, 1000);
});

sendMessage.addEventListener('click', handleSendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
}); 
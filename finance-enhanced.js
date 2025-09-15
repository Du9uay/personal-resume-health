// 财经商贸简历 - 增强版交互脚本

// 注册GSAP插件
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// 全局变量 - 鼠标相关变量已删除

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initLoader();
    initParticles();
    initTypedText();
    initCountUp();
    initGSAPAnimations();
    initScrollTriggers();
    initChartAnimations();
    initProjectCards3D();
    initMagneticButtons();
    initSmoothScroll();
    initParallax();
});

// 1. 增强版加载动画 - 优化速度
function initLoader() {
    const loader = document.getElementById('loader');
    
    // 立即显示英雄页内容，不等待加载动画
    playIntroAnimations();
    
    // GSAP加载动画 - 缩短时间
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    loader.style.display = 'none';
                }
            });
        }
    });
    
    // 加载条动画 - 更快
    tl.to('.bar', {
        height: '100%',
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.inOut'
    })
    .to('.trend-line', {
        width: '100%',
        duration: 0.4,
        ease: 'power2.out'
    }, '-=0.2');
}

// 2. 粒子背景
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#FFD700', '#2563eb', '#10b981']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#FFD700',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 3. 鼠标跟随效果 - 已删除

// 4. 打字机效果
function initTypedText() {
    if (typeof Typed !== 'undefined') {
        // 副标题打字机
        new Typed('#typed-subtitle', {
            strings: [
                '精通Amazon、Shopify、TikTok Shop多平台运营',
                '数据驱动选品，精准把握市场趋势',
                '优化Listing提升转化，打造爆款产品',
                '跨境物流供应链管理，确保履约时效'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: false
        });
    }
}

// 5. 数字滚动动画
function initCountUp() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                
                numbers.forEach(num => {
                    const count = parseFloat(num.getAttribute('data-count'));
                    const prefix = num.getAttribute('data-prefix') || '';
                    const suffix = num.getAttribute('data-suffix') || '';
                    
                    if (typeof CountUp !== 'undefined') {
                        const counter = new CountUp(num, count, {
                            duration: 2.5,
                            prefix: prefix,
                            suffix: suffix,
                            enableScrollSpy: false
                        });
                        counter.start();
                    } else {
                        // 备用动画
                        let current = 0;
                        const increment = count / 50;
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= count) {
                                current = count;
                                clearInterval(timer);
                            }
                            num.textContent = prefix + Math.floor(current) + suffix;
                        }, 30);
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

// 6. GSAP动画 - 优化速度
function initGSAPAnimations() {
    // 注释掉GSAP标题动画，使用CSS动画替代
    // 标题现在使用内联CSS动画，不需要JS控制
    
    // 徽章动画 - 更快
    gsap.from('.hero-badge', {
        scale: 0,
        rotation: 360,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 0.1
    });
    
    // 按钮动画 - 更快
    gsap.from('.hero-cta .btn-primary, .hero-cta .btn-secondary', {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4
    });
}

// 7. 滚动触发动画
function initScrollTriggers() {
    // 章节标题动画
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // 技能卡片动画 - 优化速度
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                once: true  // 只执行一次动画
            },
            y: 30,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.02,  // 大幅减少延迟
            ease: 'power2.out'
        });
    });
    
    // 项目卡片动画
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // 时间线动画
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const direction = index % 2 === 0 ? -100 : 100;
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%'
            },
            x: direction,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

// 8. 图表动画
function initChartAnimations() {
    // K线图动画
    const chartBg = document.getElementById('chartBg');
    if (chartBg) {
        // 动态创建K线
        for (let i = 0; i < 30; i++) {
            const bar = document.createElement('div');
            bar.className = 'chart-line';
            bar.style.left = (i * 3.3) + '%';
            bar.style.height = Math.random() * 60 + 20 + '%';
            bar.style.background = Math.random() > 0.5 ? '#10b981' : '#ef4444';
            bar.style.animationDelay = (i * 0.1) + 's';
            chartBg.appendChild(bar);
            
            // GSAP动画
            gsap.from(bar, {
                height: 0,
                duration: 1,
                delay: i * 0.05,
                ease: 'power2.out'
            });
        }
    }
    
    // 3D金融正方体交互增强
    const financeCube = document.querySelector('.finance-cube');
    if (financeCube) {
        let currentRotationX = -20;
        let currentRotationY = 0;
        let autoRotate = true;
        let mouseStartX = 0;
        let mouseStartY = 0;
        let rotationStartX = -20;
        let rotationStartY = 0;
        
        // 获取当前旋转角度
        function getCurrentRotation() {
            const transform = window.getComputedStyle(financeCube).transform;
            if (transform && transform !== 'none') {
                // 从transform matrix中提取旋转角度（简化处理）
                const elapsed = Date.now() * 0.001; // 转换为秒
                currentRotationY = (elapsed * 18) % 360; // 20秒转360度 = 18度/秒
            }
            return currentRotationY;
        }
        
        // 鼠标交互控制旋转
        const cubeContainer = document.querySelector('.finance-cube-container');
        if (cubeContainer) {
            cubeContainer.addEventListener('mouseenter', (e) => {
                autoRotate = false;
                // 获取当前的旋转位置
                currentRotationY = getCurrentRotation();
                currentRotationX = -20;
                
                // 记录鼠标起始位置和旋转起始角度
                const rect = cubeContainer.getBoundingClientRect();
                mouseStartX = e.clientX - rect.left;
                mouseStartY = e.clientY - rect.top;
                rotationStartX = currentRotationX;
                rotationStartY = currentRotationY;
                
                // 停止CSS动画并设置当前位置
                financeCube.style.animation = 'none';
                gsap.set(financeCube, {
                    rotationX: currentRotationX,
                    rotationY: currentRotationY
                });
            });
            
            cubeContainer.addEventListener('mouseleave', () => {
                autoRotate = true;
                // 从当前位置继续动画
                const currentY = gsap.getProperty(financeCube, "rotationY");
                financeCube.style.animation = 'rotateCube 20s infinite linear';
                financeCube.style.animationDelay = `-${(currentY % 360) / 18}s`;
            });
            
            cubeContainer.addEventListener('mousemove', (e) => {
                if (!autoRotate) {
                    const rect = cubeContainer.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    // 基于鼠标移动的增量计算旋转
                    const deltaX = (x - mouseStartX) / rect.width * 180;
                    const deltaY = (y - mouseStartY) / rect.height * 180;
                    
                    currentRotationY = rotationStartY + deltaX;
                    currentRotationX = rotationStartX - deltaY;
                    
                    // 限制X轴旋转范围
                    currentRotationX = Math.max(-60, Math.min(60, currentRotationX));
                    
                    gsap.to(financeCube, {
                        rotationX: currentRotationX,
                        rotationY: currentRotationY,
                        duration: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }
        
        // 为每个面添加简单的悬停效果
        document.querySelectorAll('.cube-face').forEach((face, index) => {
            // 添加悬停时的图标缩放效果
            const icon = face.querySelector('.face-content i');
            if (icon) {
                face.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
                
                face.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                });
            }
        });
        
        // 添加键盘控制
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.key) {
                case 'ArrowUp':
                    rotationX -= 10;
                    break;
                case 'ArrowDown':
                    rotationX += 10;
                    break;
                case 'ArrowLeft':
                    rotationY -= 10;
                    break;
                case 'ArrowRight':
                    rotationY += 10;
                    break;
                case ' ':
                    autoRotate = !autoRotate;
                    if (autoRotate) {
                        financeCube.style.animation = 'rotateCube 20s infinite linear';
                    } else {
                        financeCube.style.animation = 'none';
                    }
                    e.preventDefault();
                    break;
            }
            
            if (!autoRotate && (e.key.startsWith('Arrow'))) {
                gsap.to(financeCube, {
                    rotationX: rotationX,
                    rotationY: rotationY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    }
}

// 9. 3D项目卡片
function initProjectCards3D() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// 10. 磁性按钮效果
function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// 11. 平滑滚动
function initSmoothScroll() {
    // 使用GSAP的ScrollSmoother（需要付费插件）或自定义实现
    let currentScroll = 0;
    let targetScroll = 0;
    const ease = 0.1;
    
    function smoothScroll() {
        targetScroll = window.scrollY;
        currentScroll += (targetScroll - currentScroll) * ease;
        
        // 应用视差效果
        gsap.set('.hero-background', {
            y: currentScroll * 0.5
        });
        
        requestAnimationFrame(smoothScroll);
    }
    
    // smoothScroll(); // 如果需要启用
}

// 12. 视差滚动
function initParallax() {
    gsap.to('.hero-background', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 300,
        ease: 'none'
    });
    
    // 多层视差
    gsap.utils.toArray('.parallax-layer').forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        gsap.to(layer, {
            scrollTrigger: {
                trigger: layer,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: 100 * speed,
            ease: 'none'
        });
    });
}

// 13. 入场动画序列 - 优化速度
function playIntroAnimations() {
    const tl = gsap.timeline();
    
    // 更快的动画，排除已有CSS动画的元素
    tl.from('.finance-nav', {
        y: -100,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.out'
    })
    .from('.hero-content > *:not(.hero-title)', {
        y: 30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out'
    }, '-=0.2');
}

// 14. 导航栏交互增强
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
        // 添加模糊背景
        gsap.to(navbar, {
            backdropFilter: 'blur(20px)',
            duration: 0.3
        });
    } else {
        navbar.classList.remove('scrolled');
        gsap.to(navbar, {
            backdropFilter: 'blur(0px)',
            duration: 0.3
        });
    }
    
    // 更新导航链接状态
    updateActiveNavLink();
});

// 15. 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// 16. 项目详情模态框增强 - 已被index.html中的新版本替代
// 注释掉避免冲突
/*
window.showProjectDetail_old = function(projectId) {
    console.log('showProjectDetail called with ID:', projectId);
    
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) {
        console.error('Modal elements not found!');
        alert('模态框元素未找到！请刷新页面重试。');
        return;
    }
    
    // 项目详情数据
    const projectDetails = {
        1: {
            title: '十足便利店内容营销推广项目',
            description: '以"门店职人"KOC为核心，结合抖音矩阵运营、精准DOU+投流和直播互动，累计覆盖全国1200+门店。',
            flows: [
                { 
                    title: '流程一：明确平台目标', 
                    img: 'public/十足便利店内容营销推广项目/流程一：明确平台目标.jpeg',
                    overview: '在项目启动阶段，协助完成用户画像分析、内容战略定位与竞品数据对比，明确抖音平台的传播目标与方向。',
                    content: [
                        '数据回溯整理：协助分析近6个月的用户互动数据，形成用户兴趣点和偏好趋势表。',
                        '竞品模式收集：整理"Today便利店""便利蜂"等竞品内容样式与互动量，归纳不足。',
                        '目标KPI归纳：协助制定曝光、互动和到店转化的分级目标表，用于团队后续追踪。',
                        '客群画像梳理：参与输出18–30岁年轻群体偏好的数据报告，为内容定位提供支持。'
                    ]
                },
                { 
                    title: '流程二：搭建门店职人内容运营体系', 
                    img: 'public/十足便利店内容营销推广项目/流程二：搭建门店职人内容运营体系.jpeg',
                    overview: '在内容生产阶段，参与建立门店职人梯队、视频模板与发布规范，推动员工成为内容创作者，强化门店的社交化表达。',
                    content: [
                        '职人候选筛选：协助各门店推荐1–2名员工，统计兴趣与表现，组成内容梯队。',
                        '视频模板制定：参与制作"三镜头+字幕+口播"标准模版，降低员工视频制作门槛。',
                        '内容排班表协助：根据门店节奏，协助建立每周至少2条视频的内容上传计划表。',
                        '职人认证资料：配合设计门店职人抖音ID卡牌，整理资料用于门店线上线下展示。',
                        '热榜评选辅助：收集各门店视频数据，整理"爆款内容"评选结果并发布。'
                    ]
                },
                { 
                    title: '流程三：搭建门店营销账号矩阵', 
                    img: 'public/十足便利店内容营销推广项目/流程三：搭建门店营销账号矩阵.png',
                    overview: '在账号搭建阶段，协助建立主子账号联动机制，统一认证与管理，提升内容协同效率和传播覆盖面。',
                    content: [
                        '账号资料归档：协助收集并上传各门店账号信息，统一接入企业蓝V后台。',
                        '主子账号内容分工：整理主账号品牌事件与子账号本地化互动的内容边界表。',
                        '协同转发执行：参与每周主号转发优质门店子号视频，提升曝光率。',
                        '账号绩效打分：协助统计粉丝增长、播放量、投产比，生成门店账号表现评分表。',
                        '内容审核支持：参与搭建词库过滤机制，帮助降低违规内容风险。'
                    ]
                },
                { 
                    title: '流程四：执行精准DOU+广告与直播互动', 
                    img: 'public/十足便利店内容营销推广项目/流程四：执行精准 DOU+ 广告与直播互动活动.jpeg',
                    overview: '在互动与转化阶段，协助执行直播栏目策划、互动机制设置及直播素材归档，强化用户留存与线上线下互动。',
                    content: [
                        '直播选题准备：协助制定"午间带货""夜宵推荐"等直播栏目脚本。',
                        '节日内容排期：整理高考季、夏日饮品季等热点日历，配合直播与短视频执行。',
                        '直播互动支持：参与设置"弹幕秒杀""关注领券"等直播间互动环节。',
                        '兑换码整理：协助统计并发放门店线下兑换码，保障直播到店转化。',
                        '素材库归档：收集高表现直播片段，剪辑后归档至"职人内容素材库"。'
                    ]
                },
                { 
                    title: '流程五：实施本地化DOU+定向投流', 
                    img: 'public/十足便利店内容营销推广项目/流程五：实施本地化 DOU+ 定向投流.png',
                    overview: '在广告投放环节，协助执行精准人群定向、AB测试与预算调控，确保内容投流高效并保持ROI稳定。',
                    content: [
                        '人群标签设定：协助建立"女性/25–40岁/距离<3km"精准客群标签组合。',
                        '素材AB测试：整理不同文案与视频组合，执行小范围测试并记录表现。',
                        '预算控制支持：参与动态调整每日预算，确保投产比≥3.0。',
                        '投流监控数据整理：协助更新广告投流与门店数据联动看板，供团队复盘。',
                        '高ROI案例收集：参与整理表现优异视频，推动跨门店复制拍摄与投放。'
                    ]
                },
                { 
                    title: '流程六：推动线下体验与线上互动融合', 
                    img: 'public/十足便利店内容营销推广项目/流程六：推动线下体验与线上互动的融合.jpeg',
                    overview: '在项目后期，协助建立线上互动与门店体验结合的机制，推动用户到店转化与复购黏性。',
                    content: [
                        '点赞兑换执行：协助整理点赞兑换券活动执行情况，统计兑换成功数量。',
                        '客服响应支持：监控抖音私信与小程序客服，确保响应时间在30秒内。',
                        '互动活动记录：统计累计参与互动兑换的用户规模，并制作数据简报。',
                        '会员打卡辅助：协助上线会员打卡功能，记录用户复购与参与数据。',
                        '用户反馈收集：整理线上线下用户对互动机制的意见，为后续改进提供参考。'
                    ]
                }
            ]
        },
        2: {
            title: '夏季凉被产品出海项目',
            description: '聚焦欧美高温市场的"Hot Sleeper"用户群体，围绕凉感舒眠需求打造跨境床品品牌，全年营收3200万美元。',
            flows: [
                { 
                    title: '流程一：品牌定位与用户细分', 
                    img: 'public/夏季凉被产品出海项目/流程一：品牌定位与用户细分.jpeg',
                    overview: '在项目初期，协助开展用户调研、竞品分析与定价测试，明确目标人群与品牌定位，为产品研发和渠道策略提供方向。',
                    content: [
                        '协助问卷与访谈调研，整理用户对夜间盗汗、体温调节等痛点的反馈数据。',
                        '参与品牌定位资料整理，提炼"高端智能凉感床品"核心价值。',
                        '协助品牌视觉语言输出，支持蓝白冷调的包装与主图风格统一。',
                        '配合定价测试，参与建立欧美市场的阶梯定价方案。',
                        '协助构建用户旅程地图，整理电商平台用户路径与转化点。'
                    ]
                },
                { 
                    title: '流程二：出口法规与认证合规', 
                    img: 'public/夏季凉被产品出海项目/流程二：出口法规与认证合规.jpg',
                    overview: '在出口合规阶段，协助认证资料整理、包装环保检测与产品标签核对，保障产品满足欧美市场监管要求。',
                    content: [
                        '协助整理 CE、RoHS、RED 等认证材料并归档。',
                        '参与织物安全检测样本送检与结果收集。',
                        '协助核对包装环保比例，确保 ≥80% 再生纸板符合欧盟政策。',
                        '参与商品标签检查，确认 EAN-13 条码与原产地标识完整。',
                        '协助搭建认证文档归档体系，支持跨境平台资质审核。'
                    ]
                },
                { 
                    title: '流程三：多平台渠道运营', 
                    img: 'public/夏季凉被产品出海项目/流程三：多平台渠道运营.jpeg',
                    overview: '在渠道运营环节，协助 Amazon、Shopify 与 TikTok 的店铺维护与流量转化，支持公域引流与私域沉淀。',
                    content: [
                        '协助 Amazon 关键词优化与五图内容更新，支持提升自然排名。',
                        '参与 FBA 补货表格建立，跟进库存动态与发货周期。',
                        '协助 Shopify 会员管理，录入积分数据并支持自动邮件回访测试。',
                        '参与 TikTok KOL合作执行，整理达人投放素材与发布时间表。',
                        '协助数据对接，配合 Google Analytics 建立跨平台用户行为追踪表。'
                    ]
                },
                { 
                    title: '流程四：柔性制造与海外物流体系', 
                    img: 'public/夏季凉被产品出海项目/流程四：柔性制造与海外物流体系搭建.jpeg',
                    overview: '在供应链环节，协助生产进度监控与国际物流方案执行，确保订单交付稳定与跨境履约顺畅。',
                    content: [
                        '协助 MES 系统数据录入，支持 SKU 切换与返单调度。',
                        '参与多路径运输方案整理，记录海运、空运与中欧班列时效数据。',
                        '协助海外仓入库数据录入，确认 Prime 标准与 DDP 清关记录。',
                        '配合越南冗余产线测试，整理应急产能启用数据。',
                        '协助物流追踪表更新，跟进延误订单与异常履约情况。'
                    ]
                },
                { 
                    title: '流程五：内容营销与品牌曝光', 
                    img: 'public/夏季凉被产品出海项目/流程五：内容营销与品牌曝光.jpg',
                    overview: '在营销推广阶段，协助媒体合作、达人传播与UGC激励执行，支持品牌声量与转化提升。',
                    content: [
                        '协助整理媒体评测文章与开箱视频素材，归档至内容库。',
                        '参与 TikTok 话题数据统计，监测标签播放量与互动效果。',
                        '协助 Prime Day 促销执行，整理单日爆单数据并生成日报。',
                        '参与用户晒单奖励发放，收集UGC内容并分类归档。',
                        '协助 Notion 内容库管理，维护命名规则与版本更新。'
                    ]
                }
            ]
        },
        3: {
            title: '良品铺子采购方案设计项目',
            description: '通过建立科学的需求预测机制、严格的供应商准入制度和数字化的合同履约管理，实现采购全过程标准化与可视化。',
            flows: [
                { title: '流程一：制定采购需求计划', img: 'public/良品铺子采购方案设计项目/流程一：制定采购需求计划.jpeg' },
                { title: '流程二：供应商准入与评估选择', img: 'public/良品铺子采购方案设计项目/流程二：供应商准入与评估选择.jpeg' },
                { title: '流程三：采购执行与合同签订', img: 'public/良品铺子采购方案设计项目/流程三：采购执行与合同签订.jpeg' },
                { title: '流程四：到货验收与质量检查', img: 'public/良品铺子采购方案设计项目/流程四：到货验收与质量检查.jpeg' },
                { title: '流程五：物流运输与库存入库', img: 'public/良品铺子采购方案设计项目/流程五：物流运输与库存入库.jpeg' },
                { title: '流程六：供应商绩效管理与持续改进', img: 'public/良品铺子采购方案设计项目/流程六：供应商绩效管理与持续改进.jpeg' }
            ]
        },
        4: {
            title: '永辉生鲜超市供应链管理设计项目',
            description: '通过构建优选供应商体系、完善冷链物流、优化库存周转，显著提升了库存流转效率与配送时效。',
            flows: [
                { title: '流程一：构建优选供应商体系', img: 'public/永辉生鲜超市供应链管理设计项目/流程一：构建优选供应商体系与合同履约机制.jpeg' },
                { title: '流程二：建设全程冷链物流系统', img: 'public/永辉生鲜超市供应链管理设计项目/流程二：建设全程冷链物流系统保障产品新鲜.jpeg' },
                { title: '流程三：优化库存周转与信息协同', img: 'public/永辉生鲜超市供应链管理设计项目/流程三：优化库存周转与信息协同策略.jpg' },
                { title: '流程四：分析客户偏好与多渠道订单响应', img: 'public/永辉生鲜超市供应链管理设计项目/流程四：分析客户偏好与多渠道订单响应机制.jpeg' },
                { title: '流程五：构建反馈优化与持续改进机制', img: 'public/永辉生鲜超市供应链管理设计项目/流程五：构建反馈优化与供应链持续改进机制.jpeg' }
            ]
        },
        5: {
            title: '某证券公司申请增加业务种类核准项目',
            description: '围绕新增"融资融券、做市交易、代销金融产品"三项业务，在三个月监管时限内实现换证、权限开通与经纪端SOP上线。',
            flows: [
                { title: '流程一：构建立项论证', img: 'public/某证券公司申请增加业务种类核准项目/流程一：构建立项论证.jpg' },
                { title: '流程二：规范公司治理与内部决策程序', img: 'public/某证券公司申请增加业务种类核准项目/流程二：规范公司治理与内部决策程序.jpeg' },
                { title: '流程三：实施资本实力与风控指标复核', img: 'public/某证券公司申请增加业务种类核准项目/流程三：实施资本实力与风控指标复核.jpeg' },
                { title: '流程四：制定制度体系与合规意见', img: 'public/某证券公司申请增加业务种类核准项目/流程四：制定制度体系与合规意见.jpeg' },
                { title: '流程五：封装报批、线上申报与测试投产', img: 'public/某证券公司申请增加业务种类核准项目/流程五：封装报批、线上申报与测试投产.png' }
            ]
        }
    };
    
    const project = projectDetails[projectId] || projectDetails[1];
    
    // 显示模态框（检查GSAP是否可用）
    if (typeof gsap !== 'undefined') {
        // 使用GSAP动画
        gsap.fromTo(modal, 
            {
                opacity: 0,
                scale: 0.8
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                ease: 'back.out(1.7)',
                display: 'block'
            }
        );
    } else {
        // 直接显示模态框
        modal.style.display = 'block';
        modal.style.opacity = '1';
        console.warn('GSAP not loaded, using simple display');
    }
    
    // 生成流程详情HTML
    let flowsHTML = '';
    project.flows.forEach((flow, index) => {
        let contentHTML = '';
        if (flow.content && flow.content.length > 0) {
            contentHTML = '<ul style="margin: 15px 0; padding-left: 20px;">';
            flow.content.forEach(item => {
                contentHTML += `<li style="margin: 8px 0; color: #555; line-height: 1.6;">${item}</li>`;
            });
            contentHTML += '</ul>';
        }
        
        flowsHTML += `
            <div class="flow-item" style="margin-bottom: 40px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 10px; border: 1px solid rgba(255,215,0,0.1);">
                <h4 style="color: var(--finance-gold); margin-bottom: 15px; font-size: 1.2rem;">${flow.title}</h4>
                ${flow.overview ? `<p style="color: #666; margin-bottom: 15px; line-height: 1.6;">${flow.overview}</p>` : ''}
                ${contentHTML}
                ${flow.img ? `<img src="${flow.img}" alt="${flow.title}" style="width: 100%; margin-top: 15px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">` : ''}
            </div>
        `;
    });
    
    // 加载项目详情内容
    modalContent.innerHTML = `
        <h2 style="color: var(--finance-gold); margin-bottom: 20px;">${project.title}</h2>
        <div class="project-details">
            <p style="margin-bottom: 30px; color: #666; line-height: 1.8;">${project.description}</p>
            <h3 style="margin-bottom: 20px; color: var(--finance-blue);">项目流程详情</h3>
            <div class="flows-container" style="max-height: 70vh; overflow-y: auto; padding-right: 10px;">
                ${flowsHTML}
            </div>
        </div>
    `;
    
    // 显示模态框 - 使用更可靠的方法
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    
    // 确保模态框在最顶层
    modal.style.zIndex = '9999';
    
    // 添加一个类以便调试
    modal.classList.add('modal-open');
    
    console.log('Modal displayed with display:', modal.style.display);
    console.log('Modal visibility:', window.getComputedStyle(modal).display);
}
*/

// 17. 关闭模态框 - 已被index.html中的新版本替代
/*
window.closeModal_old = function() {
    console.log('closeModal called');
    const modal = document.getElementById('projectModal');
    
    if (!modal) {
        console.error('Modal element not found!');
        return;
    }
    
    // 直接关闭，确保可靠性
    modal.style.display = 'none';
    modal.classList.remove('modal-open');
    console.log('Modal closed');
}
*/

// 18. 技能进度条动画增强
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 80%'
            },
            width: width + '%',
            duration: 1.5,
            ease: 'power2.out'
        });
    });
});

// 19. 创建动态背景图形
function createDynamicShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'dynamic-shapes';
    document.body.appendChild(shapesContainer);
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'floating-shape';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        shape.style.width = Math.random() * 100 + 50 + 'px';
        shape.style.height = shape.style.width;
        
        shapesContainer.appendChild(shape);
        
        // GSAP浮动动画
        gsap.to(shape, {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            rotation: 'random(-180, 180)',
            duration: 'random(10, 20)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }
}

// 20. 性能优化
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// 优化窗口调整事件
window.addEventListener('resize', debounce(() => {
    // 重新计算布局
    ScrollTrigger.refresh();
}, 250));

// 初始化动态背景
createDynamicShapes();

// 21. 简化的扑克牌效果实现
const pokerEffect = {
    cards: [],
    
    init() {
        // 获取所有扑克牌元素
        this.cards = [...document.querySelectorAll('.poker-card')];
        
        // 为每张牌添加点击事件
        this.cards.forEach((card, index) => {
            // 点击事件 - 显示项目详情
            card.addEventListener('click', (e) => {
                // 如果点击的是链接本身，让它正常执行
                if (e.target.closest('.project-link')) {
                    return;
                }
                
                // 否则触发项目详情
                const projectNumber = index + 1;
                if (typeof showProjectDetail === 'function') {
                    showProjectDetail(projectNumber);
                }
            });
        });
    }
};

// 页面加载完成后初始化扑克牌效果
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否存在扑克牌容器
    if (document.querySelector('.poker-container')) {
        pokerEffect.init();
    }
});

console.log('财经商贸简历增强版已加载完成！');
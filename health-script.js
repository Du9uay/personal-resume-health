/* ======================================
   大健康产业个人简历 - 交互脚本
   ====================================== */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {

    // 隐藏加载动画
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);

    // 初始化GSAP动画
    initGSAPAnimations();

    // 初始化图表
    initCharts();

    // 平滑滚动导航
    initSmoothScrolling();

    // 技能卡片交互
    initSkillCardAnimations();

    // 项目卡片交互
    initProjectCardAnimations();
});

// GSAP动画初始化
function initGSAPAnimations() {
    // 注册ScrollTrigger插件
    gsap.registerPlugin(ScrollTrigger);

    // Hero区域动画
    gsap.from('.hero-image img', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    gsap.from('.hero-info h1', {
        duration: 1,
        x: -50,
        opacity: 0,
        delay: 0.3,
        ease: 'power2.out'
    });

    gsap.from('.hero-title', {
        duration: 1,
        x: -30,
        opacity: 0,
        delay: 0.5,
        ease: 'power2.out'
    });

    gsap.from('.hero-badges .badge', {
        duration: 0.8,
        y: 20,
        opacity: 0,
        delay: 0.7,
        stagger: 0.1,
        ease: 'power2.out'
    });

    gsap.from('.hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 1,
        ease: 'power2.out'
    });

    // 区域滚动动画
    gsap.utils.toArray('.education-section, .about-section, .skills-section, .projects-section').forEach(section => {
        gsap.fromTo(section,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // 技能卡片动画
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.fromTo(card,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // 项目卡片动画
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// 平滑滚动导航
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 技能卡片交互动画
function initSkillCardAnimations() {
    const skillCards = document.querySelectorAll('.skill-card');

    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// 项目卡片交互动画
function initProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -8,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// 图表初始化
function initCharts() {
    // 服务领域分布饼图
    const pieChart = echarts.init(document.getElementById('pieChart'));
    const pieOption = {
        color: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#16a34a', '#065f46'],
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [{
            name: '服务领域',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 35, name: '产后康复' },
                { value: 20, name: '慢病管理' },
                { value: 15, name: '轻医美护理' },
                { value: 12, name: '药品质控' },
                { value: 10, name: '健康教育' },
                { value: 8, name: '数字医疗' }
            ]
        }]
    };
    pieChart.setOption(pieOption);

    // 核心能力雷达图
    const radarChart = echarts.init(document.getElementById('radarChart'));
    const radarOption = {
        color: ['#10b981'],
        tooltip: {},
        radar: {
            indicator: [
                { name: '健康监测', max: 100 },
                { name: '数据分析', max: 100 },
                { name: '康复护理', max: 100 },
                { name: '慢病管理', max: 100 },
                { name: '医疗设备', max: 100 },
                { name: '健康教育', max: 100 },
                { name: '质量管理', max: 100 },
                { name: '智慧医疗', max: 100 }
            ],
            radius: 80,
            axisLine: {
                lineStyle: {
                    color: '#d1fae5'
                }
            },
            splitArea: {
                areaStyle: {
                    color: ['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)']
                }
            }
        },
        series: [{
            name: '能力评估',
            type: 'radar',
            data: [{
                value: [90, 85, 88, 82, 87, 92, 80, 75],
                name: '专业能力'
            }],
            areaStyle: {
                opacity: 0.3
            }
        }]
    };
    radarChart.setOption(radarOption);

    // 项目经验时间线
    const timelineChart = echarts.init(document.getElementById('timelineChart'));
    const timelineOption = {
        color: ['#10b981'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: ['2023.01', '2023.06', '2023.09', '2024.01', '2024.03', '2024.09'],
            axisLine: {
                lineStyle: {
                    color: '#d1fae5'
                }
            },
            axisLabel: {
                color: '#6b7280',
                fontSize: 12
            }
        },
        yAxis: {
            type: 'value',
            name: '项目数量',
            axisLine: {
                lineStyle: {
                    color: '#d1fae5'
                }
            },
            axisLabel: {
                color: '#6b7280'
            },
            splitLine: {
                lineStyle: {
                    color: '#d1fae5'
                }
            }
        },
        series: [{
            name: '项目经验',
            type: 'bar',
            data: [1, 1, 2, 2, 3, 4],
            itemStyle: {
                borderRadius: [4, 4, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#34d399' },
                    { offset: 1, color: '#10b981' }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#6ee7b7' },
                        { offset: 1, color: '#34d399' }
                    ])
                }
            }
        }]
    };
    timelineChart.setOption(timelineOption);

    // 响应式图表
    window.addEventListener('resize', function() {
        pieChart.resize();
        radarChart.resize();
        timelineChart.resize();
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav-container');
    if (window.scrollY > 100) {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(16, 185, 129, 0.15)';
    } else {
        nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(16, 185, 129, 0.1)';
    }
});

// 添加简单的滚动进度指示器
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #10b981, #34d399);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 初始化滚动进度条
createScrollProgress();

// 联系方式按钮点击效果
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function() {
        const contactValue = this.querySelector('.contact-value').textContent;

        // 根据联系方式类型进行相应处理
        if (contactValue.includes('@')) {
            // 邮箱
            window.location.href = `mailto:${contactValue}`;
        } else if (contactValue.match(/\d{3}-\d{4}-\d{4}/)) {
            // 电话
            window.location.href = `tel:${contactValue.replace(/-/g, '')}`;
        }

        // 点击动画效果
        gsap.to(this, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    });
});

// 技能编号动画效果
function animateSkillNumbers() {
    const skillNumbers = document.querySelectorAll('.skill-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                gsap.fromTo(number,
                    { scale: 0, rotation: -180 },
                    {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    }
                );
                observer.unobserve(number);
            }
        });
    }, { threshold: 0.8 });

    skillNumbers.forEach(number => observer.observe(number));
}

// 初始化技能编号动画
animateSkillNumbers();

// 添加键盘导航支持
document.addEventListener('keydown', function(e) {
    const sections = ['home', 'education', 'skills', 'projects', 'contact'];
    let currentIndex = -1;

    // 找到当前所在区域
    for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
            currentIndex = i;
            break;
        }
    }

    // 按键导航
    if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        e.preventDefault();
        document.getElementById(sections[currentIndex + 1]).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        document.getElementById(sections[currentIndex - 1]).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// 添加右键菜单禁用（可选）
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// 页面加载性能优化
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

console.log('🏥 大健康产业个人简历网站已加载完成！');
console.log('📧 联系邮箱: zhangmj@health.com');
console.log('📱 联系电话: 138-8888-8888');
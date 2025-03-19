document.addEventListener('DOMContentLoaded', function() {
    // 处理导航按钮
    const timelineBtn = document.getElementById('timelineBtn');
    const achievementsBtn = document.getElementById('achievementsBtn');
    const timelineSection = document.getElementById('timeline');
    const achievementsSection = document.getElementById('achievements');
    const biographySection = document.getElementById('biography');

    if (timelineBtn && achievementsBtn) {
        timelineBtn.addEventListener('click', function() {
            biographySection.classList.add('hidden');
            achievementsSection.classList.add('hidden');
            timelineSection.classList.remove('hidden');
            timelineSection.classList.add('fade-in');
            window.scrollTo({
                top: timelineSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });

        achievementsBtn.addEventListener('click', function() {
            biographySection.classList.add('hidden');
            timelineSection.classList.add('hidden');
            achievementsSection.classList.remove('hidden');
            achievementsSection.classList.add('fade-in');
            window.scrollTo({
                top: achievementsSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    }

    // 处理图片模态框
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const heroImage = document.getElementById('heroImage');

    // 加载Sam Altman的头像
    loadImage(heroImage, 'https://upload.wikimedia.org/wikipedia/commons/2/26/Sam_Altman_cropped.jpg', function() {
        // 图片加载后移除加载中文本
        const loadingText = heroImage.nextElementSibling;
        if (loadingText) {
            loadingText.textContent = 'Sam Altman / CC BY-SA';
        }
    });

    // 加载图片库的图片
    const galleryImages = [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sam_Altman_2014.jpg',
            alt: '萨姆·奥尔特曼在会议上'
        },
        {
            url: 'https://images.wsj.net/im-871652',
            alt: '萨姆·奥尔特曼在OpenAI办公室'
        },
        {
            url: 'https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F0bae1a42-7e35-4c0f-b0aa-e25db6a6250e.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1',
            alt: '萨姆·奥尔特曼在演讲'
        }
    ];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img && galleryImages[index]) {
            loadImage(img, galleryImages[index].url);
        }
    });

    if (galleryItems && imageModal && modalImage && closeModal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const imgAlt = this.querySelector('img').alt;
                modalImage.src = imgSrc;
                modalImage.alt = imgAlt;
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', function() {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                imageModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 处理表单提交
    const subscribeForm = document.getElementById('subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                alert(`感谢您的订阅：${emailInput.value}！\n在实际应用中，这将连接到后端服务。`);
                emailInput.value = '';
            }
        });
    }

    // 辅助函数：加载图片并显示
    function loadImage(imgElement, src, callback) {
        if (!imgElement) return;
        
        const tempImage = new Image();
        tempImage.onload = function() {
            imgElement.src = src;
            if (callback && typeof callback === 'function') {
                callback();
            }
        };
        tempImage.onerror = function() {
            console.error('无法加载图片:', src);
            imgElement.alt = '图片加载失败';
        };
        tempImage.src = src;
    }

    // 添加回到传记部分的功能
    const backToBioLinks = document.querySelectorAll('.back-to-bio');
    backToBioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            timelineSection.classList.add('hidden');
            achievementsSection.classList.add('hidden');
            biographySection.classList.remove('hidden');
            window.scrollTo({
                top: biographySection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });

    // 简单动画效果
    function animateElements() {
        const elements = document.querySelectorAll('.fade-in-element');
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            // 当元素进入视口时添加动画类
            if (position.top < window.innerHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }

    // 初始化时运行一次
    animateElements();
    
    // 滚动时运行
    window.addEventListener('scroll', animateElements);
});
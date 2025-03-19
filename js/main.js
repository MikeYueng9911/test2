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
    loadImage(heroImage, 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sam_altman_by_cdsessums_%28cropped%29.jpg', function() {
        // 图片加载后更新文本
        const loadingText = heroImage.nextElementSibling;
        if (loadingText) {
            loadingText.textContent = '萨姆·奥尔特曼 - OpenAI首席执行官';
        }
    });

    // 加载图片库的图片
    const galleryImages = [
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Sam_Altman_-_DevSummit_2019.jpg',
            alt: '萨姆·奥尔特曼在2023年OpenAI开发者大会上发表演讲'
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sam_Altman_2014.jpg',
            alt: '萨姆·奥尔特曼在OpenAI总部'
        },
        {
            url: 'https://live.staticflickr.com/65535/52744831160_532de84ec3_c.jpg',
            alt: '萨姆·奥尔特曼在演讲'
        }
    ];

    // 加载时间线图片
    const timelineImages = {
        '2005': 'https://i.insider.com/6368b0166e35e90018fa5811?width=1000&format=jpeg',
        '2014': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Sam_Altman_2014.jpg',
        '2015': 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Elon_Musk_and_Sam_Altman.jpg',
        '2022': 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sam_altman_by_cdsessums_%28cropped%29.jpg',
        '2023': 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Sam_Altman_-_DevSummit_2019.jpg'
    };

    // 加载时间线图片
    document.querySelectorAll('.timeline-item').forEach(item => {
        const yearText = item.querySelector('.timeline-date').textContent;
        const year = yearText.replace('年', '');
        const img = item.querySelector('img');
        
        if (img && timelineImages[year]) {
            loadImage(img, timelineImages[year]);
        }
    });

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
        
        // 备用图片URL，如果主要图片加载失败
        const fallbackSrc = 'https://upload.wikimedia.org/wikipedia/commons/5/58/Sam_altman_by_cdsessums_%28cropped%29.jpg';
        
        const tempImage = new Image();
        tempImage.onload = function() {
            imgElement.src = src;
            if (callback && typeof callback === 'function') {
                callback();
            }
        };
        tempImage.onerror = function() {
            console.error('无法加载图片:', src);
            // 尝试加载备用图片
            if (src !== fallbackSrc) {
                console.log('尝试加载备用图片');
                loadImage(imgElement, fallbackSrc);
            } else {
                imgElement.alt = '图片加载失败';
            }
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

    // 图片点击事件处理
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    // 为所有图片添加点击事件
    const images = document.querySelectorAll('.gallery-item img, .timeline-content img');
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modal.innerHTML = '';
            modal.appendChild(modalImg);
            modal.classList.add('active');
        });
    });

    // 点击模态框关闭
    modal.addEventListener('click', function() {
        this.classList.remove('active');
    });
});
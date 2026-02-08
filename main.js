/* ========================================
   САДИБА "КИЧЕРА" - JAVASCRIPT
   ======================================== */

// Глобальні змінні для галереї
const galleries = {};

document.addEventListener('DOMContentLoaded', function() {
    // Навігація при скролі
    initNavbar();
    
    // Мобільне меню
    initMobileMenu();
    
    // Плавна прокрутка для якорних посилань
    initSmoothScroll();
    
    // Закриття модальних вікон при кліку поза ними
    initModalClose();
    
    // Ініціалізація галерей
    initGalleries();
});

/* ========================================
   НАВІГАЦІЯ ПРИ СКРОЛІ
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ========================================
   МОБІЛЬНЕ МЕНЮ
   ======================================== */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!mobileToggle || !mobileMenu) return;
    
    // Відкриття/закриття меню
    mobileToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Зміна іконки
        const icon = mobileToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Закриття меню при кліку на посилання
    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

/* ========================================
   ПЛАВНА ПРОКРУТКА
   ======================================== */
function initSmoothScroll() {
    // Для всіх посилань з хешем
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаємо порожні хеші
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Відступ для фіксованої навігації
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   МОДАЛЬНІ ВІКНА
   ======================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Забороняємо скрол сторінки
        
        // Скидаємо галерею до першого слайда
        const galleryId = modal.querySelector('.gallery-slides')?.id;
        if (galleryId) {
            currentSlide(galleryId, 0);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Дозволяємо скрол сторінки
    }
}

function initModalClose() {
    // Закриття при кліку поза модальним вікном
    document.querySelectorAll('.modal').forEach(function(modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Закриття при натисканні Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(function(modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

/* ========================================
   ГАЛЕРЕЯ ФОТОГРАФІЙ
   ======================================== */
function initGalleries() {
    // Ініціалізуємо стан для кожної галереї
    document.querySelectorAll('.gallery-slides').forEach(function(gallery) {
        galleries[gallery.id] = {
            currentIndex: 0,
            slides: gallery.querySelectorAll('.gallery-slide').length
        };
    });
}

function changeSlide(galleryId, direction) {
    const gallery = galleries[galleryId];
    if (!gallery) return;
    
    let newIndex = gallery.currentIndex + direction;
    
    // Циклічна навігація
    if (newIndex >= gallery.slides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = gallery.slides - 1;
    }
    
    currentSlide(galleryId, newIndex);
}

function currentSlide(galleryId, index) {
    const gallery = galleries[galleryId];
    if (!gallery) return;
    
    gallery.currentIndex = index;
    
    // Оновлюємо слайди
    const slides = document.querySelectorAll(`#${galleryId} .gallery-slide`);
    slides.forEach(function(slide, i) {
        slide.classList.toggle('active', i === index);
    });
    
    // Оновлюємо точки
    const dots = document.querySelectorAll(`#${galleryId} + .gallery-dots .dot, #${galleryId} ~ .gallery-dots .dot`);
    dots.forEach(function(dot, i) {
        dot.classList.toggle('active', i === index);
    });
}

// Свайп для мобільних пристроїв
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.gallery').forEach(function(gallery) {
    gallery.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    gallery.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(gallery);
    }, { passive: true });
});

function handleSwipe(gallery) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    const gallerySlides = gallery.querySelector('.gallery-slides');
    
    if (!gallerySlides) return;
    
    const galleryId = gallerySlides.id;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Свайп вліво - наступне фото
            changeSlide(galleryId, 1);
        } else {
            // Свайп вправо - попереднє фото
            changeSlide(galleryId, -1);
        }
    }
}

/* ========================================
   АНІМАЦІЇ ПРИ СКРОЛІ
   ======================================== */
// Intersection Observer для анімацій елементів при скролі
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Спостерігаємо за карточками
document.querySelectorAll('.room-card, .service-card, .review-card, .attraction-category').forEach(function(el) {
    observer.observe(el);
});

/* ========================================
   ЛІНИВЕ ЗАВАНТАЖЕННЯ ЗОБРАЖЕНЬ (опціонально)
   ======================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(function(img) {
        imageObserver.observe(img);
    });
}

/* ========================================
   КОНСОЛЬ - ПЕРЕВІРКА ЗАВАНТАЖЕННЯ
   ======================================== */
console.log('%c Садиба "Кичера" ', 'background: #2d5a3d; color: white; font-size: 20px; padding: 10px 20px; border-radius: 10px;');
console.log('%c Сайт успішно завантажено! ', 'color: #2d5a3d; font-size: 14px;');

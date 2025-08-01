// DOM Content Loaded
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize essential functionality
    initFormHandling();
    initVideoPlayer();
    
    // Carousel functionality
    initCarousel();
    
    // Footer video modal
    initFooterVideoModal();

    // Populate country dropdown using JS map
    const countryMap = [
        { code: 'us', name: 'United States' },
        { code: 'ca', name: 'Canada' },
        { code: 'uk', name: 'United Kingdom' },
        { code: 'au', name: 'Australia' },
        { code: 'de', name: 'Germany' },
        { code: 'sk', name: 'Slovakia' },
        { code: 'lt', name: 'Lithuania' },
        { code: 'lv', name: 'Latvia' },
        { code: 'ee', name: 'Estonia' },
        { code: 'mt', name: 'Malta' },
        { code: 'cy', name: 'Cyprus' },
        { code: 'lu', name: 'Luxembourg' },
        { code: 'cn', name: 'China' },
        { code: 'in', name: 'India' }
    ];
    const countrySelect = document.getElementById('country');
    if (countrySelect) {
        countryMap.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            if (country.code === 'in') option.selected = true;
            countrySelect.appendChild(option);
        });
    }
});

// Carousel functionality
function initCarousel() {
        const slidesData = [
            {
            image: "../assets/members/person1.png",
                name: 'Abbie Harvey',
                text: 'I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.'
            },
            {
            image: "../assets/members/person2.png",
                name: 'John Smith',
                text: 'The support I received was amazing. The team was always there for me and my family, making sure we had everything we needed.'
            },
            {
            image: "../assets/members/person3.png",

                name: 'Maria Lopez',
                text: 'I am grateful for the care and attention provided. It made a real difference in our lives and brought us peace of mind.'
            }
        ];
    
        const slidesContainer = document.querySelector('.carousel-slides');
        const leftArrow = document.querySelector('.carousel-arrow.left');
        const rightArrow = document.querySelector('.carousel-arrow.right');
        const dots = document.querySelectorAll('.carousel-dots .dot');
    
    if (!slidesContainer) return;
    
        let current = 0;
        let isAnimating = false;

        function createSlide(idx, extraClass = '') {
            const data = slidesData[idx];
            const slide = document.createElement('div');
            slide.className = 'carousel-slide active' + (extraClass ? ' ' + extraClass : '');
            slide.innerHTML = `
                <div class="carousel-image">
                    <img src="${data.image}" alt="${data.name}" />
                </div>
                <div class="carousel-content">
                    <div class="carousel-quote">&#10077;&#10077;</div>
                    <h2>${data.name}</h2>
                    <p><i>${data.text}</i></p>
                </div>
            `;
            return slide;
        }

        function updateDots() {
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === current);
            });
        }

        function goTo(idx, direction = 1) {
            if (isAnimating) return;
            const prev = current;
            current = (idx + slidesData.length) % slidesData.length;
            if (prev === current) return;
            isAnimating = true;
            const oldSlide = slidesContainer.querySelector('.carousel-slide');
            const newSlide = createSlide(current, direction > 0 ? 'animate-right' : 'animate-left');
            slidesContainer.appendChild(newSlide);
        
            void newSlide.offsetWidth;
            oldSlide.classList.add(direction > 0 ? 'animate-left' : 'animate-right');
            newSlide.classList.remove('animate-left', 'animate-right');
            newSlide.classList.add('active');
        
      
                slidesContainer.removeChild(oldSlide);
                isAnimating = false;
 
            updateDots();
        }

        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', () => goTo(current - 1, -1));
            rightArrow.addEventListener('click', () => goTo(current + 1, 1));
        }
    
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goTo(i, i > current ? 1 : -1));
        });

        // Initial render
        slidesContainer.innerHTML = '';
        slidesContainer.appendChild(createSlide(current));
        updateDots();
}

// Footer video modal functionality
function initFooterVideoModal() {
    const footerPlayBtn = document.getElementById('footerPlayBtn');
    const footerVideoModal = document.getElementById('footerVideoModal');
    const footerVideo = document.getElementById('footerVideo');
    const footerVideoClose = document.getElementById('footerVideoClose');

    if (!footerPlayBtn || !footerVideoModal || !footerVideo || !footerVideoClose) return;

    footerPlayBtn.onclick = function() {
        footerVideoModal.style.display = 'flex';
        footerVideoModal.style.zIndex = '9999';
        footerVideo.currentTime = 0;
        footerVideo.muted = false;
        footerVideo.play().then(() => {
            console.log('Video started playing');
        }).catch(error => {
            console.log('Video autoplay failed:', error);
            footerVideo.muted = true;
            footerVideo.play().then(() => {
                setTimeout(() => {
                    footerVideo.muted = false;
                }, 100);
            }).catch(err => {
                console.log('Video play failed even with muted:', err);
            });
        });
    };
    
    footerVideoClose.onclick = function() {
        footerVideo.pause();
        footerVideo.currentTime = 0;
        footerVideoModal.style.display = 'none';
    };
    
    footerVideoModal.onclick = function(e) {
        if (e.target === footerVideoModal) {
            footerVideo.pause();
            footerVideo.currentTime = 0;
            footerVideoModal.style.display = 'none';
        }
    };
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && footerVideoModal.style.display === 'flex') {
            footerVideo.pause();
            footerVideo.currentTime = 0;
            footerVideoModal.style.display = 'none';
        }
    });
}

// Form handling
function initFormHandling() {
    const heroForm = document.querySelector('.hero-form');
    
    if (!heroForm) return;
    
    // Clear error styling when user starts typing
    const formInputs = heroForm.querySelectorAll('input, select');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
        input.addEventListener('change', function() {
            clearFieldError(this);
        });
    });

    heroForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
        clearAllErrors();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const company = document.getElementById('company').value.trim();
        const country = document.getElementById('country').value;
        
        let hasErrors = false;
        
        if (!firstName) {
            setFieldError('firstName', 'First name is required');
            hasErrors = true;
        }
        
        if (!lastName) {
            setFieldError('lastName', 'Last name is required');
            hasErrors = true;
        }
        
        if (!email) {
            setFieldError('email', 'Email is required');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            setFieldError('email', 'Please enter a valid email address');
            hasErrors = true;
        }
        
        if (!company) {
            setFieldError('company', 'Company is required');
            hasErrors = true;
        }
        
        if (!country) {
            setFieldError('country', 'Please select a country');
            hasErrors = true;
        }
        
        if (hasErrors) {
                return;
            }
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'thankyou.html';
            }, 2000);
        });
    }

// Helper functions for form validation
function setFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        const fieldset = field.closest('.outlined-input');
        if (fieldset) {
            fieldset.classList.add('error');
        }
    }
}

function clearFieldError(field) {
    const fieldset = field.closest('.outlined-input');
    if (fieldset) {
        fieldset.classList.remove('error');
    }
}

function clearAllErrors() {
    const errorFields = document.querySelectorAll('.outlined-input.error');
    errorFields.forEach(fieldset => {
        fieldset.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Video player functionality
function initVideoPlayer() {
    const playButton = document.getElementById('playButton');
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const videoPlayer = document.getElementById('videoPlayer');
    const mainVideo = document.getElementById('mainVideo');
    const closeVideo = document.getElementById('closeVideo');

    if (!playButton || !videoPlaceholder || !videoPlayer || !mainVideo || !closeVideo) return;

    playButton.addEventListener('click', function() {
        videoPlaceholder.style.display = 'none';
        videoPlayer.style.display = 'block';
        
        mainVideo.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
        
        videoPlayer.style.opacity = '0';
        setTimeout(() => {
            videoPlayer.style.opacity = '1';
        }, 10);
    });

    closeVideo.addEventListener('click', function() {
        mainVideo.pause();
        videoPlayer.style.display = 'none';
        videoPlaceholder.style.display = 'block';
        mainVideo.currentTime = 0;
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && videoPlayer.style.display === 'block') {
            closeVideo.click();
        }
    });

    videoPlayer.addEventListener('click', function(event) {
        if (event.target === videoPlayer) {
            closeVideo.click();
        }
    });
}

// Global functions for HTML onclick handlers
function openVideoModal() {
    const modal = document.getElementById('footerVideoModal');
    const video = document.getElementById('footerVideo');
    
    if (modal && video) {
        modal.style.display = 'flex';
        modal.style.zIndex = '9999';
        video.currentTime = 0;
        video.muted = false;
        video.loop = true;
        
        video.addEventListener('ended', function() {
            video.currentTime = 0;
            video.play();
        });
        
        video.play().then(() => {
            console.log('Video started playing');
        }).catch(error => {
            video.muted = true;
            video.play().then(() => {
                setTimeout(() => {
                    video.muted = false;
                }, 100);
            }).catch(err => {
                console.log('Video play failed:', err);
            });
        });
    }
}

function closeVideoModal() {
    const modal = document.getElementById('footerVideoModal');
    const video = document.getElementById('footerVideo');
    
    if (modal && video) {
        video.pause();
        video.currentTime = 0;
        video.loop = false;
        modal.style.display = 'none';
    }
}

function scrollToVideoSection() {
    const videoSection = document.querySelector('.video-section');
    if (videoSection) {
        videoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
} 
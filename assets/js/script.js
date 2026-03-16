(function() {
    // Elements
    const loader = document.getElementById('loader');
    const loginSection = document.getElementById('loginSection');
    const mainWebsite = document.getElementById('mainWebsite');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const togglePassword = document.getElementById('togglePassword');
    const errorMsg = document.getElementById('errorMsg');
    const logoutBtn = document.getElementById('logoutBtn');
    const homeBtn = document.getElementById('homeBtn');
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    const rememberCheckbox = document.querySelector('.remember-me input');
    const cards = document.querySelectorAll('.card-improved');
    
    // State
    let isLoggedIn = false;
    let isMusicPlaying = false;
    
    // Initialize Particles
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: '#9aa97c' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#9aa97c',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' }
                }
            },
            retina_detect: true
        });
    }
    
    // Check Remember Me Session
    const checkRememberedSession = () => {
        if (localStorage.getItem('lyraa_garden_auth') === 'true') {
            isLoggedIn = true;
            loginSection.style.display = 'none';
            mainWebsite.classList.add('active');
            return true;
        }
        return false;
    };

    // Loader Sequence
    setTimeout(() => {
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.style.display = 'none';
                if (!checkRememberedSession()) {
                    loginSection.classList.add('active');
                }
            }, 800);
        }
    }, 2500);
    
    // Password Toggle Functionality
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'text') {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    }
    
    // Login Function (Uses secure serverless backend)
    async function attemptLogin() {
        const password = passwordInput.value;
        if (!password) return;

        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span class="btn-text">Opening Garden...</span> <i class="fas fa-spinner fa-spin"></i>';
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ password }),
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (data.success) {
                isLoggedIn = true;
                errorMsg.classList.remove('show');
                loginSection.classList.add('fade-out');
                
                if (rememberCheckbox && rememberCheckbox.checked) {
                    localStorage.setItem('lyraa_garden_auth', 'true');
                }
                
                if (bgMusic && bgMusic.paused) {
                    bgMusic.play().then(() => {
                        isMusicPlaying = true;
                        if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    }).catch(err => console.log("Audio play failed", err));
                }
                
                setTimeout(() => {
                    loginSection.style.display = 'none';
                    mainWebsite.classList.add('active');
                }, 800);
            } else {
                throw new Error(data.message || 'Wrong password');
            }
        } catch (error) {
            errorMsg.textContent = '❌ ' + (error.message === 'Wrong password' ? 'Wrong password, my love. Try again.' : 'Connection error. Please try again.');
            errorMsg.classList.add('show');
            passwordInput.style.borderColor = '#c45d42';
            setTimeout(() => { passwordInput.style.borderColor = ''; }, 500);
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span class="btn-text">Enter The Garden</span> <i class="fas fa-arrow-right btn-icon"></i>';
        }
    }
    
    // Login event listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            attemptLogin();
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                attemptLogin();
            }
        });
    }
    
    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            isLoggedIn = false;
            localStorage.removeItem('lyraa_garden_auth');
            mainWebsite.classList.remove('active');
            loginSection.style.display = 'flex';
            passwordInput.value = '';
            errorMsg.classList.remove('show');
            
            if (isMusicPlaying && bgMusic) {
                bgMusic.pause();
                isMusicPlaying = false;
                if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            }
            
            setTimeout(() => {
                loginSection.classList.remove('fade-out');
                loginSection.classList.add('active');
            }, 50);
        });
    }

    // Music Toggle Button Event
    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fas fa-music"></i>';
            } else {
                bgMusic.play().catch(err => console.log("Audio play failed:", err));
                musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isMusicPlaying = !isMusicPlaying;
        });
    }
    
    // Home button
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Card click handler
    if (cards) {
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const url = this.dataset.url;
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                }
            });
            
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    if (cards) {
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }
    
    // Auto-focus password if login is visible
    setTimeout(() => {
        if (loginSection && loginSection.classList.contains('active') && passwordInput) {
            passwordInput.focus();
        }
    }, 3400);
})();

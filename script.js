// Multi-step Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const formConfig = {
        job: [
            '未経験',
            '建築施工管理',
            '土木施工管理',
            '設備施工管理',
            '電気施工管理',
            '管工事施工管理',
            '建設営業',
            '設計',
            '事務'
        ],
        timing: [
            '今すぐ',
            '1か月以内',
            '3か月以内',
            '良い求人があれば',
            'まずは情報収集'
        ],
        location: [
            '大阪',
            '京都',
            '兵庫',
            '奈良',
            '滋賀',
            '和歌山',
            'その他'
        ]
    };

    const form = document.getElementById('consultationForm');
    const backBtn = document.getElementById('backBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const steps = form ? Array.from(form.querySelectorAll('.form-step-content')) : [];
    const stage = form ? form.querySelector('.form-step-stage') : null;
    const stepIndicators = document.querySelectorAll('.step');
    const stepBar = document.querySelector('.form-steps');
    const formFeedback = document.getElementById('formFeedback');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const thankYouResetBtn = document.getElementById('thankYouResetBtn');
    const totalSteps = 4;
    let currentStep = 1;

    const formState = {
        job: '',
        timing: '',
        location: '',
        name: '',
        phone: '',
        email: ''
    };

    function renderOptions(fieldName) {
        const target = document.querySelector(`[data-options-target="${fieldName}"]`);
        if (!target) return;

        if (target.tagName === 'SELECT') {
            target.innerHTML = '<option value="">選択してください</option>' + 
                formConfig[fieldName].map((label) => `<option value="${label}">${label}</option>`).join('');
        } else {
            target.innerHTML = formConfig[fieldName].map((label) => `
                <label class="option-btn">
                    <input type="radio" name="${fieldName}" value="${label}">
                    <span>${label}</span>
                </label>
            `).join('');
        }
    }

    function syncFormState() {
        if (!form) return;

        ['job', 'timing', 'location'].forEach((fieldName) => {
            const input = form.querySelector(`[name="${fieldName}"]`);
            if (input && input.tagName === 'SELECT') {
                formState[fieldName] = input.value;
            } else {
                const checked = form.querySelector(`input[name="${fieldName}"]:checked`);
                formState[fieldName] = checked ? checked.value : '';
            }
        });

        formState.name = form.elements.name ? form.elements.name.value.trim() : '';
        formState.phone = form.elements.phone ? form.elements.phone.value.trim() : '';
        formState.email = form.elements.email ? form.elements.email.value.trim() : '';
    }

    function toggleFeedback(message) {
        if (!formFeedback) return;
        formFeedback.textContent = message || '';
        formFeedback.classList.toggle('hidden', !message);
    }

    function setStageHeight() {
        if (!stage) return;
        const activeStep = steps.find((step) => Number(step.dataset.step) === currentStep);
        if (!activeStep) return;
        stage.style.height = `${activeStep.offsetHeight}px`;
    }

    function updateStepDisplay() {
        steps.forEach((step, index) => {
            step.classList.toggle('is-active', index + 1 === currentStep);
        });

        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 <= currentStep);
        });

        if (backBtn) {
            backBtn.classList.toggle('hidden', currentStep === 1);
        }
        if (nextBtn) {
            nextBtn.classList.toggle('hidden', currentStep === totalSteps);
        }
        if (submitBtn) {
            submitBtn.classList.toggle('hidden', currentStep !== totalSteps);
        }

        toggleFeedback('');
        requestAnimationFrame(setStageHeight);
    }

    function validateStep(stepNumber) {
        syncFormState();

        if (stepNumber === 1 && !formState.job) {
            return 'ご希望の職種を選択してください。';
        }

        if (stepNumber === 2) {
            if (!formState.timing) {
                return '転職時期を選択してください。';
            }

            if (!formState.location) {
                return '希望勤務地を選択してください。';
            }
        }

        if (stepNumber === 3 && !formState.name) {
            return 'お名前を入力してください。';
        }

        if (stepNumber === 4) {
            if (!formState.phone || !formState.email) {
                return '電話番号とメールアドレスを入力してください。';
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formState.email)) {
                return '有効なメールアドレスを入力してください。';
            }

            const phoneDigits = formState.phone.replace(/[^\d]/g, '');
            if (phoneDigits.length < 10 || phoneDigits.length > 13) {
                return '有効な電話番号を入力してください。';
            }
        }

        return '';
    }

    if (form) {
        renderOptions('job');
        renderOptions('timing');
        renderOptions('location');

        form.addEventListener('change', syncFormState);
        form.addEventListener('input', syncFormState);

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                const validationMessage = validateStep(currentStep);
                if (validationMessage) {
                    toggleFeedback(validationMessage);
                    return;
                }

                if (currentStep < totalSteps) {
                    currentStep += 1;
                    updateStepDisplay();
                }
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', function() {
                if (currentStep > 1) {
                    currentStep -= 1;
                    updateStepDisplay();
                }
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            for (let stepNumber = 1; stepNumber <= totalSteps; stepNumber += 1) {
                const validationMessage = validateStep(stepNumber);
                if (validationMessage) {
                    currentStep = stepNumber;
                    updateStepDisplay();
                    toggleFeedback(validationMessage);
                    return;
                }
            }

            syncFormState();
            form.classList.add('hidden');
            if (stepBar) {
                stepBar.classList.add('hidden');
            }
            if (thankYouMessage) {
                thankYouMessage.classList.remove('hidden');
            }
            toggleFeedback('');
        });

        if (thankYouResetBtn) {
            thankYouResetBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        updateStepDisplay();
        window.addEventListener('resize', setStageHeight);
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }

        lastScroll = currentScroll;
    });

    // Animate elements on scroll
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

    // Add animation styles to elements
    const animateElements = document.querySelectorAll('.pain-item, .recommend-item, .stat-item, .process-step, .job-card, .testimonial-card, .reason-card, .faq-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Sticky sidebar visibility
    const stickySidebar = document.querySelector('.sticky-sidebar');
    const heroSection = document.querySelector('.hero');
    const footerSection = document.querySelector('.footer');

    if (stickySidebar) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const footerTop = footerSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (heroBottom < 0 && footerTop > windowHeight) {
                stickySidebar.style.opacity = '1';
                stickySidebar.style.pointerEvents = 'auto';
            } else {
                stickySidebar.style.opacity = '0';
                stickySidebar.style.pointerEvents = 'none';
            }
        });
    }

    // Initialize first FAQ item as open
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});

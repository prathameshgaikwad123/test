// Multi-step Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('consultationForm');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const steps = document.querySelectorAll('.form-step-content');
    const stepIndicators = document.querySelectorAll('.step');
    let currentStep = 1;
    const totalSteps = 4;

    // Update step display
    function updateStepDisplay() {
        steps.forEach((step, index) => {
            if (index + 1 === currentStep) {
                step.classList.remove('hidden');
            } else {
                step.classList.add('hidden');
            }
        });

        stepIndicators.forEach((indicator, index) => {
            if (index + 1 <= currentStep) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });

        // Show/hide buttons
        if (currentStep === totalSteps) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }

    // Next button click
    nextBtn.addEventListener('click', function() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepDisplay();
        }
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Basic validation for step 4
        if (!data.name || !data.phone || !data.email) {
            alert('すべての項目を入力してください。');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('有効なメールアドレスを入力してください。');
            return;
        }

        // Phone validation (Japanese phone number)
        const phoneRegex = /^[\d-]{10,13}$/;
        if (!phoneRegex.test(data.phone.replace(/[\s-]/g, ''))) {
            alert('有効な電話番号を入力してください。');
            return;
        }

        // Show success message
        alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。');

        // Reset form
        form.reset();
        currentStep = 1;
        updateStepDisplay();
    });

    // Option button selection
    const optionBtns = document.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.querySelector('input[type="radio"]');
            if (input) {
                input.checked = true;
            }
        });
    });

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

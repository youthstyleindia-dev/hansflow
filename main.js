/**
 * HANSFLOW - PREMIUM RENTAL WEB APPLICATION LOGIC
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. STICKY NAV & MOBILE MENU DRAWER
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    
    // Navbar scroll listener
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuToggle.classList.toggle('active');
        mobileDrawer.classList.toggle('active');
    });

    // Close mobile drawer when clicking outside or on links
    document.addEventListener('click', (e) => {
        if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            mobileDrawer.classList.remove('active');
        }
    });

    const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-book-btn');
    drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileDrawer.classList.remove('active');
        });
    });

    // Parallax effect on hero image on scroll
    const heroBg = document.getElementById('hero-bg');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.35}px) scale(1.05)`;
        }
    });


    // ==========================================================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply optional animation delay
                const delay = entry.target.getAttribute('data-delay');
                if (delay) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, delay);
                } else {
                    entry.target.classList.add('active');
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // ==========================================================================
    // 3. STATS NUMBER COUNTER ANIMATION
    // ==========================================================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const decimals = parseInt(element.getAttribute('data-decimals') || '0');
        const duration = 2000; // 2 seconds
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;
        
        const countInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad
            const easedProgress = progress * (2 - progress);
            const currentVal = easedProgress * target;
            
            element.textContent = currentVal.toFixed(decimals) + (decimals === 0 ? '' : '');
            
            if (frame === totalFrames) {
                element.textContent = target.toFixed(decimals) + (element.getAttribute('data-target').includes('+') || target >= 10 ? '+' : '');
                // Special check for Rating to append star rather than plus
                if (element.getAttribute('data-target') === '4.9') {
                    element.textContent = '4.9★';
                }
                clearInterval(countInterval);
            }
        }, frameRate);
    };

    const statsSection = document.getElementById('stats');
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(num => countUp(num));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }


    // ==========================================================================
    // 4. FLEET CATEGORY FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const fleetCards = document.querySelectorAll('.fleet-card');
    const filterLinks = document.querySelectorAll('.filter-link');
    const categoryCards = document.querySelectorAll('.category-card');

    const filterFleet = (category) => {
        fleetCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('hidden');
                // Retrigger scroll reveal check
                card.classList.add('active');
            } else {
                card.classList.add('hidden');
            }
        });
    };

    // Filter by Tab Buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-filter');
            filterFleet(category);
        });
    });

    // Filter by Footer Links
    filterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-filter');
            
            // Sync filter button active state
            filterButtons.forEach(b => {
                if (b.getAttribute('data-filter') === category) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            
            filterFleet(category);
            document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Filter by Browse Category Cards
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            
            // Sync filter button active state
            filterButtons.forEach(b => {
                if (b.getAttribute('data-filter') === category) {
                    b.classList.add('active');
                } else {
                    b.classList.remove('active');
                }
            });
            
            filterFleet(category);
            document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
        });
    });


    // ==========================================================================
    // 5. FAQ ACCORDION TOGGLE
    // ==========================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other accordions
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-panel').style.maxHeight = null;
                }
            });
            
            // Toggle current accordion
            if (isActive) {
                item.classList.remove('active');
                panel.style.maxHeight = null;
            } else {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });


    // ==========================================================================
    // 6. BOOKING FLOW & MODAL CONTROLLER
    // ==========================================================================
    const pickupDateInput = document.getElementById('pickup-date');
    const returnDateInput = document.getElementById('return-date');
    
    // Set default dates (Today and +3 Days)
    const today = new Date();
    const threeDaysLater = new Date();
    threeDaysLater.setDate(today.getDate() + 3);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    if (pickupDateInput && returnDateInput) {
        pickupDateInput.value = formatDate(today);
        pickupDateInput.min = formatDate(today);
        returnDateInput.value = formatDate(threeDaysLater);
        returnDateInput.min = formatDate(today);
        
        // Ensure Return Date cannot be before Pickup Date
        pickupDateInput.addEventListener('change', () => {
            returnDateInput.min = pickupDateInput.value;
            if (new Date(returnDateInput.value) < new Date(pickupDateInput.value)) {
                returnDateInput.value = pickupDateInput.value;
            }
        });
    }

    // Modal elements
    const bookingModal = document.getElementById('booking-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const bookTriggers = document.querySelectorAll('.book-trigger');
    
    // Steps & Panes
    const modalSteps = document.querySelectorAll('.modal-step');
    const modalPanes = document.querySelectorAll('.modal-pane');
    
    // Data placeholders
    let selectedCar = '';
    let dailyRate = 0;
    let pickupLocation = 'Marol, Andheri East';
    let returnLocation = 'Marol, Andheri East';
    let rentalDays = 3;
    let totalCost = 0;

    // Open Modal function
    const openModal = (carName, carPrice) => {
        selectedCar = carName;
        dailyRate = parseInt(carPrice);
        
        // Retrieve values from Hero form if completed
        const formPickup = document.getElementById('pickup-loc').value;
        const formReturn = document.getElementById('return-loc').value;
        const formPickupDate = document.getElementById('pickup-date').value;
        const formReturnDate = document.getElementById('return-date').value;
        
        if (formPickup) pickupLocation = formPickup;
        if (formReturn) returnLocation = formReturn;
        
        if (formPickupDate && formReturnDate) {
            const diffTime = Math.abs(new Date(formReturnDate) - new Date(formPickupDate));
            rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
        }
        
        totalCost = dailyRate * rentalDays;
        
        // Update summary pane fields
        document.getElementById('summary-car').textContent = selectedCar;
        document.getElementById('summary-loc').textContent = `${pickupLocation} ➔ ${returnLocation}`;
        document.getElementById('summary-duration').textContent = `${rentalDays} Day${rentalDays > 1 ? 's' : ''}`;
        document.getElementById('summary-rate').textContent = `$${dailyRate}`;
        document.getElementById('summary-total').textContent = `$${totalCost.toLocaleString()}`;
        
        // Set back to step 1
        goToStep(1);
        
        // Display Modal
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close Modal function
    const closeModal = () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset upload zone and form
        const successIndicator = document.getElementById('upload-success-indicator');
        if (successIndicator) successIndicator.style.display = 'none';
        document.getElementById('verification-form').reset();
    };

    const goToStep = (stepNumber) => {
        modalSteps.forEach(step => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            if (stepNum === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        modalPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        document.getElementById(`pane-${stepNumber}`).classList.add('active');
    };

    // Bind triggers in fleet list
    bookTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const car = btn.getAttribute('data-car');
            const price = btn.getAttribute('data-price');
            openModal(car, price);
        });
    });

    // Bind Hero form submit
    const heroForm = document.getElementById('hero-booking-form');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Default search selects the Porsche 911 Carrera as showcase
            openModal('Porsche 911 Carrera', '350');
        });
    }

    // Modal Close hooks
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Pane navigations
    const cancelBtns = document.querySelectorAll('.pane-cancel-btn');
    cancelBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    const nextTriggers = document.querySelectorAll('.pane-next-btn');
    nextTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = btn.getAttribute('data-next');
            if (nextStep) {
                goToStep(parseInt(nextStep));
            }
        });
    });

    const prevTriggers = document.querySelectorAll('.pane-prev-btn');
    prevTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = btn.getAttribute('data-prev');
            if (prevStep) {
                goToStep(parseInt(prevStep));
            }
        });
    });

    // Step 2 Verification file upload mock
    const uploadZone = document.getElementById('license-upload-zone');
    const fileInput = document.getElementById('license-file');
    const uploadIndicator = document.getElementById('upload-success-indicator');
    
    if (uploadZone && fileInput && uploadIndicator) {
        uploadZone.addEventListener('click', () => {
            fileInput.click();
        });
        
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });
        
        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });
        
        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            if (e.dataTransfer.files.length) {
                uploadIndicator.style.display = 'inline-flex';
            }
        });
        
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length) {
                uploadIndicator.style.display = 'inline-flex';
            }
        });
    }

    // Handle verification form submit to trigger Step 3
    const verificationForm = document.getElementById('verification-form');
    if (verificationForm) {
        verificationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Random Booking ID generator
            const bookingIdNum = Math.floor(100000 + Math.random() * 900000);
            const bookingId = `VL-${bookingIdNum}`;
            
            // Populate Success screen values
            document.getElementById('success-booking-id').textContent = bookingId;
            document.getElementById('success-vehicle-name').textContent = selectedCar;
            document.getElementById('success-delivery-loc').textContent = `${pickupLocation}`;
            
            // Calculate contact schedule (e.g. delivered tomorrow morning)
            const deliveryTime = new Date();
            deliveryTime.setDate(deliveryTime.getDate() + 1);
            deliveryTime.setHours(9, 0, 0, 0); // 9:00 AM
            
            const options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            document.getElementById('success-delivery-time').textContent = deliveryTime.toLocaleDateString('en-US', options);
            
            // Direct to Step 3 (Success confirmation screen)
            goToStep(3);
        });
    }

    // Success Close button returns to main page
    const successCloseBtn = document.querySelector('.success-close-btn');
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', closeModal);
    }


    // ==========================================================================
    // 7. NEWSLETTER SUBSCRIPTION FLOW
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMsg = document.getElementById('newsletter-msg');
    
    if (newsletterForm && newsletterMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = document.getElementById('newsletter-email');
            const emailVal = emailInput.value.trim();
            
            if (emailVal) {
                newsletterMsg.style.color = '#10B981'; // Success Green
                newsletterMsg.textContent = 'Thank you! You have subscribed to Hansflow exclusive offers.';
                emailInput.value = '';
                
                setTimeout(() => {
                    newsletterMsg.textContent = '';
                }, 5000);
            }
        });
    }

});

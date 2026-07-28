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
        
        pickupDateInput.addEventListener('change', () => {
            returnDateInput.min = pickupDateInput.value;
            if (new Date(returnDateInput.value) < new Date(pickupDateInput.value)) {
                returnDateInput.value = pickupDateInput.value;
            }
        });
    }

    // Modal elements
    const bookingModal = document.getElementById('booking-modal');
    const modalOverlay  = document.getElementById('modal-overlay');
    const modalClose    = document.getElementById('modal-close');
    const bookTriggers  = document.querySelectorAll('.book-trigger');
    
    const modalSteps = document.querySelectorAll('.modal-step');
    const modalPanes = document.querySelectorAll('.modal-pane');
    
    let selectedCar   = '';
    let dailyRate     = 0;
    let pickupLocation = 'Marol, Andheri East';
    let returnLocation = 'Marol, Andheri East';
    let rentalDays    = 3;
    let totalCost     = 0;

    const goToStep = (stepNumber) => {
        modalSteps.forEach(step => {
            const n = parseInt(step.getAttribute('data-step'));
            step.classList.toggle('active', n <= stepNumber);
        });
        modalPanes.forEach(pane => pane.classList.remove('active'));
        const target = document.getElementById(`pane-${stepNumber}`);
        if (target) target.classList.add('active');
    };

    const openModal = (carName, carPrice) => {
        selectedCar = carName;
        dailyRate   = parseInt(carPrice);
        
        const formPickup     = document.getElementById('pickup-loc')?.value;
        const formReturn     = document.getElementById('return-loc')?.value;
        const formPickupDate = document.getElementById('pickup-date')?.value;
        const formReturnDate = document.getElementById('return-date')?.value;
        
        if (formPickup) pickupLocation = formPickup;
        if (formReturn) returnLocation = formReturn;
        
        if (formPickupDate && formReturnDate) {
            const diff = Math.abs(new Date(formReturnDate) - new Date(formPickupDate));
            rentalDays = Math.ceil(diff / (1000 * 60 * 60 * 24)) || 3;
        }
        
        totalCost = dailyRate * rentalDays;
        
        // Populate Step 1 display
        const modalCarName  = document.getElementById('modal-car-name');
        const modalCarPrice = document.getElementById('modal-car-price');
        if (modalCarName)  modalCarName.textContent  = carName;
        if (modalCarPrice) modalCarPrice.textContent = `₹${dailyRate.toLocaleString('en-IN')} / day`;
        
        // Populate Step 3 summary
        const serviceEl = document.getElementById('service-type');
        const serviceVal = serviceEl ? (serviceEl.value || 'Car Rental') : 'Car Rental';
        const sumCar     = document.getElementById('summary-car');
        const sumService = document.getElementById('summary-service');
        const sumLoc     = document.getElementById('summary-loc');
        const sumDays    = document.getElementById('summary-days');
        const sumTotal   = document.getElementById('summary-total');
        if (sumCar)     sumCar.textContent     = carName;
        if (sumService) sumService.textContent = serviceVal;
        if (sumLoc)     sumLoc.textContent     = `${pickupLocation} → ${returnLocation}`;
        if (sumDays)    sumDays.textContent    = `${rentalDays} Day${rentalDays > 1 ? 's' : ''}`;
        if (sumTotal)   sumTotal.textContent   = `₹${totalCost.toLocaleString('en-IN')}`;
        
        goToStep(1);
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    // Wire book triggers in fleet grid
    bookTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal(btn.getAttribute('data-car'), btn.getAttribute('data-price'));
        });
    });

    // Hero form submit → open modal with first fleet car
    const heroForm = document.getElementById('hero-booking-form');
    if (heroForm) {
        heroForm.addEventListener('submit', (e) => {
            e.preventDefault();
            openModal('Mercedes-Benz S-Class', '4500');
        });
    }

    // Close hooks
    if (modalClose)   modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    // Next / Prev buttons inside modal
    document.querySelectorAll('.modal-next').forEach(btn => {
        btn.addEventListener('click', () => {
            const next = parseInt(btn.getAttribute('data-next'));
            if (next) goToStep(next);
        });
    });
    document.querySelectorAll('.modal-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            const prev = parseInt(btn.getAttribute('data-prev'));
            if (prev) goToStep(prev);
        });
    });

    // Confirm booking → show success pane
    const confirmBtn = document.getElementById('confirm-booking');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            const bookingId = `HF-${Math.floor(100000 + Math.random() * 900000)}`;
            const elId   = document.getElementById('success-booking-id');
            const elCar  = document.getElementById('success-car-name');
            const elLoc  = document.getElementById('success-delivery-loc');
            if (elId)  elId.textContent  = bookingId;
            if (elCar) elCar.textContent = selectedCar;
            if (elLoc) elLoc.textContent = pickupLocation;

            modalPanes.forEach(p => p.classList.remove('active'));
            const successPane = document.getElementById('pane-success');
            if (successPane) successPane.classList.add('active');
        });
    }


    // ==========================================================================
    // 7. NEWSLETTER SUBSCRIPTION FLOW
    // ==========================================================================
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMsg  = document.getElementById('newsletter-msg');
    
    if (newsletterForm && newsletterMsg) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            const emailVal = emailInput?.value.trim();
            if (emailVal) {
                newsletterMsg.style.color = '#10B981';
                newsletterMsg.textContent = 'Thank you! You have subscribed to Hansflow exclusive offers.';
                if (emailInput) emailInput.value = '';
                setTimeout(() => { newsletterMsg.textContent = ''; }, 5000);
            }
        });
    }

});

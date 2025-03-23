let animation1Finished = false;

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const hero = document.querySelector('.hero');
    const content = document.querySelector('.content');
    const cardsContainer = document.querySelector('.cards-container');
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Animation 1: Navbar and Cards Pop-up
    navbar.style.transform = 'translateY(-100%)'; // Start off-screen
    navbar.style.animation = 'slideDown 2s ease-out forwards'; // Animate down

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('show');
            if (index === cards.length - 1) {
                animation1Finished = true;
                setTimeout(() => {
                    triggerAnimation2();
                }, 2000);
            }
        }, 800 * index);
    });

    // Animation 2: Curve Expansion
    function triggerAnimation2() {
        if (animation1Finished) {
            cards.forEach(card => {
                card.style.position = "absolute";
            });
            cardsContainer.classList.add('curve-expand');
            hero.classList.add('curve-expand');
            content.classList.add('curve-expand');
        }
    }

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (event) => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }

            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault();

                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});






document.addEventListener('DOMContentLoaded', function() {
    const companyAddress = document.querySelector('.company-info p:nth-child(1)');
    const phoneNumber = document.querySelector('.company-info p:nth-child(2)');
    const emailAddress = document.querySelector('.company-info p:nth-child(3)');
    

    if (phoneNumber) {
        phoneNumber.style.cursor = 'pointer';
        phoneNumber.addEventListener('click', function() {
            const fulltext = this.textContent;
            const startIndex = 7;
            const textToCopy = fulltext.substring(startIndex);
            navigator.clipboard.writeText(textToCopy)
                .then(() => alert('Phone number copied to clipboard!'))
                .catch(err => console.error('Could not copy text: ', err));
        });
    }

    if (emailAddress) {
        emailAddress.style.cursor = 'pointer';
        emailAddress.addEventListener('click', function() {
            const email = "dobusiness.rstudio@gmail.com" ;
            window.location.href = `mailto:${email}`;
        });
    }
    

    if (companyAddress) {
        companyAddress.style.cursor = 'pointer';
        companyAddress.addEventListener('click', function() {
            const address = this.textContent;
            const encodedAddress = encodeURIComponent(address);
            window.open(`https://maps.app.goo.gl/6pCgWBLykELXikTt6`, '_blank');
        });
    }

    const contactForm = document.getElementById('contactForm');
    const sendMessageButton = document.getElementById('sendMessageButton');
    const contactFormGrid = document.getElementById('contactFormGrid');
    const messageSentDisplay = document.getElementById('messageSentDisplay');

    function setupInputField(element, defaultValue) {
        element.addEventListener('focus', function() {
            if (this.value === defaultValue) {
                this.value = '';
            }
        });

        element.addEventListener('blur', function() {
            if (this.value === '') {
                this.value = defaultValue;
            }
        });
    }

    setupInputField(document.getElementById('name'), 'Name');
    setupInputField(document.getElementById('email'), 'Email');
    setupInputField(document.getElementById('phone'), 'Phone Number');
    setupInputField(document.getElementById('message'), 'Message');

    function checkFormValidity() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (name && email && phone && message && name !== 'Name' && email !== 'Email' && phone !== 'Phone Number' && message !== 'Message' && validateEmail(email) && validatePhone(phone)) {
            sendMessageButton.classList.add('active');
        } else {
            sendMessageButton.classList.remove('active');
        }
    }

    contactForm.addEventListener('input', checkFormValidity);

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (name === 'Name' || email === 'Email' || phone === 'Phone Number' || message === 'Message') {
            showAlert('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showAlert('Please enter a valid Phone number.', 'error');
            return;
        }

        

        contactFormGrid.style.display = 'none';
        messageSentDisplay.style.display = 'flex';

        sendtMail();

        setTimeout(() => {
            contactFormGrid.style.display = 'block';
            messageSentDisplay.style.display = 'none';
            contactForm.reset();
            document.getElementById('name').value = 'Name';
            document.getElementById('email').value = 'Email';
            document.getElementById('phone').value = 'Phone Number';
            document.getElementById('message').value = 'Message';
            sendMessageButton.classList.remove('active');
        }, 5000);
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(phone);
    }

   

    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.textContent = message;
        alertDiv.classList.add('alert', type);
        contactForm.insertBefore(alertDiv, contactForm.firstChild);
        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

   
});





function sendtMail() {
    let parms = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
    };
    console.log("Sending EmailJS Params:", parms);
    
    emailjs.send("service_mxvimv6", "template_bw1j82u", parms).then(
        function (response) {
            console.log("SUCCESS!", response.status, response.text);
            
        },
        function (error) {
            console.log("FAILED...", error);
            
        }
    );
}




document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.full-screen-section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    const video = document.getElementById('productVideo');

    // Intersection Observer for Navbar Active State
    const scrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                    navLinks.forEach((link) => link.classList.remove('active'));
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        },
        {
            rootMargin: `-${navbarHeight}px 0px 0px 0px`,
            threshold: 0.5,
        }
    );

    sections.forEach((section) => {
        scrollObserver.observe(section);
    });

    // Smooth Scrolling for Navbar Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth',
                });

                // Delay video visibility check to ensure scroll completes
                setTimeout(checkVideoVisibility, 500);
            }
        });
    });

    // Video Play/Pause Based on 90% Visibility
    function checkVideoVisibility() {
        if (!video) return;
        
        const rect = video.getBoundingClientRect();
        const videoHeight = rect.height;
        const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);

        if (visibleHeight / videoHeight >= 0.9) {
            video.play();
        } else {
            video.pause();
        }
    }


    // Video Play/Pause Based on 90% Visibility
    function checkVideoVisibility() {
        if (!video) return;
        
        const rect = video.getBoundingClientRect();
        const videoHeight = rect.height;
        const visibleHeight = Math.min(window.innerHeight, rect.bottom) - Math.max(0, rect.top);

        if (visibleHeight / videoHeight >= 0.9) {
            video.play();
        } else {
            video.pause();
        }
    }

    // Observe Video Visibility Changes
    const videoObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= 0.9) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        },
        {
            threshold: 0.9,
        }
    );

    if (video) {
        videoObserver.observe(video);
    }

    // Run check on page load
    checkVideoVisibility();

    // Also check on window scroll
    window.addEventListener('scroll', checkVideoVisibility, { passive: true });
});








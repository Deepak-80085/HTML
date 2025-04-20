// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Add active class to current section
    window.addEventListener('scroll', highlightCurrentSection);
});

/**
 * Handle contact form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // In a real application, you would send the data to a server here
    // For this demo, we'll just show a success message
    showMessage(`Thank you, ${name}! Your message has been sent.`, 'success');
    
    // Reset the form
    e.target.reset();
}

/**
 * Display a message to the user
 * @param {string} text - Message text
 * @param {string} type - Message type ('success' or 'error')
 */
function showMessage(text, type) {
    // Check if a message container already exists
    let messageContainer = document.querySelector('.message-container');
    
    // If not, create one
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.className = 'message-container';
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(messageContainer, form);
    }
    
    // Set the message
    messageContainer.textContent = text;
    messageContainer.className = `message-container ${type}`;
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        messageContainer.remove();
    }, 5000);
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Implement smooth scrolling for navigation links
 * @param {Event} e - Click event
 */
function smoothScroll(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
    });
}

/**
 * Highlight the current section in the navigation
 */
function highlightCurrentSection() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add some CSS for the active link and messages
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            background-color: #e9f0f7;
            font-weight: bold;
        }
        
        .message-container {
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
            text-align: center;
        }
        
        .message-container.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .message-container.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
}); 
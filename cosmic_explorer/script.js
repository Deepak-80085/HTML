// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const startJourneyBtn = document.getElementById('start-journey');
    const planetItems = document.querySelectorAll('.planet-item');
    const planetInfos = document.querySelectorAll('.planet-info');
    const exploreBtns = document.querySelectorAll('.explore-btn');
    const modalContainer = document.getElementById('modal-container');
    const closeModalBtn = document.getElementById('close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const contactForm = document.getElementById('contact-form');
    
    // Initialize the application
    initApp();
    
    // Initialize the application
    function initApp() {
        // Set up the navigation
        setupNavigation();
        
        // Set up planet selection
        setupPlanetSelection();
        
        // Set up explore buttons
        setupExploreBtns();
        
        // Set up modal
        setupModal();
        
        // Set up contact form
        setupContactForm();
    }
    
    // Set up navigation between sections
    function setupNavigation() {
        // Start journey button click
        if (startJourneyBtn) {
            startJourneyBtn.addEventListener('click', function() {
                scrollToSection('planets');
            });
        }
        
        // Navigation links click
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Get the target section ID
                const targetId = this.getAttribute('href').substring(1);
                
                // Show the target section
                scrollToSection(targetId);
            });
        });
        
        // Footer links click
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the target section ID
                const targetId = this.getAttribute('href').substring(1);
                
                // Show the target section
                scrollToSection(targetId);
                
                // Update the nav links
                navLinks.forEach(navLink => {
                    if (navLink.getAttribute('href') === `#${targetId}`) {
                        navLinks.forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                });
            });
        });
    }
    
    // Scroll to a specific section
    function scrollToSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('section-active');
        });
        
        // Show the target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('section-active');
            
            // Scroll to the top of the section
            window.scrollTo({
                top: targetSection.offsetTop - 80, // Account for header height
                behavior: 'smooth'
            });
        }
    }
    
    // Set up planet selection functionality
    function setupPlanetSelection() {
        planetItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                planetItems.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Get the planet name
                const planetName = this.getAttribute('data-planet');
                
                // Hide all planet infos
                planetInfos.forEach(info => info.classList.remove('active'));
                
                // Show the selected planet info
                const planetInfo = document.getElementById(`${planetName}-info`);
                if (planetInfo) {
                    planetInfo.classList.add('active');
                }
            });
        });
    }
    
    // Set up explore buttons functionality
    function setupExploreBtns() {
        exploreBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Get the planet info
                const planetInfo = this.closest('.planet-info');
                const planetName = planetInfo.id.replace('-info', '');
                
                // Set modal title
                modalTitle.textContent = `${capitalizeFirstLetter(planetName)} Details`;
                
                // Set modal content
                modalContent.innerHTML = `
                    <div class="modal-planet-info">
                        <div class="modal-planet-image ${planetName}-display"></div>
                        <div class="modal-planet-data">
                            <h4>Interesting Facts</h4>
                            <ul>
                                ${getPlanetFacts(planetName).map(fact => `<li>${fact}</li>`).join('')}
                            </ul>
                            <h4>Recent Discoveries</h4>
                            <p>${getRecentDiscovery(planetName)}</p>
                            <h4>Space Missions</h4>
                            <ul>
                                ${getSpaceMissions(planetName).map(mission => `<li>${mission}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                
                // Show the modal
                modalContainer.classList.add('show');
                modalContainer.classList.remove('hidden');
            });
        });
    }
    
    // Set up modal functionality
    function setupModal() {
        // Close modal when clicking the close button
        closeModalBtn.addEventListener('click', function() {
            modalContainer.classList.remove('show');
            setTimeout(() => {
                modalContainer.classList.add('hidden');
            }, 300);
        });
        
        // Close modal when clicking outside the modal
        modalContainer.addEventListener('click', function(e) {
            if (e.target === modalContainer) {
                modalContainer.classList.remove('show');
                setTimeout(() => {
                    modalContainer.classList.add('hidden');
                }, 300);
            }
        });
        
        // Close modal when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modalContainer.classList.contains('hidden')) {
                modalContainer.classList.remove('show');
                setTimeout(() => {
                    modalContainer.classList.add('hidden');
                }, 300);
            }
        });
    }
    
    // Set up contact form functionality
    function setupContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = this.querySelector('#name').value;
                const email = this.querySelector('#email').value;
                const message = this.querySelector('#message').value;
                
                // Simple validation
                if (!name || !email || !message) {
                    alert('Please fill out all fields');
                    return;
                }
                
                // Show success message
                alert(`Thank you for your message, ${name}! We will get back to you soon.`);
                
                // Reset the form
                this.reset();
            });
        }
    }
    
    // Helper function to capitalize the first letter of a string
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Get planet facts
    function getPlanetFacts(planetName) {
        const facts = {
            mercury: [
                'Mercury is the smallest planet in our solar system.',
                'A day on Mercury (176 Earth days) is longer than its year (88 Earth days).',
                'Mercury has the most eccentric orbit of any planet, ranging from 29 to 43 million miles from the Sun.',
                'Despite being closest to the Sun, Mercury is not the hottest planet (Venus is).',
                'Mercury has a thin exosphere instead of a substantial atmosphere.'
            ],
            venus: [
                'Venus rotates in the opposite direction to most planets.',
                'A day on Venus is longer than its year.',
                'Venus is the hottest planet with a surface temperature of 462°C (864°F).',
                'The atmospheric pressure on Venus is 92 times greater than Earth\'s.',
                'Venus is often called Earth\'s "sister planet" due to similar size and composition.'
            ],
            earth: [
                'Earth is the only known planet to support life.',
                'Earth\'s atmosphere is 78% nitrogen, 21% oxygen, and 1% other gases.',
                'Earth is the densest planet in the solar system.',
                'About 71% of Earth\'s surface is covered by water.',
                'Earth has one natural satellite - the Moon.'
            ],
            mars: [
                'Mars is home to Olympus Mons, the largest volcano in the solar system.',
                'Mars has the largest dust storms in the solar system, sometimes engulfing the entire planet.',
                'Mars has two small moons: Phobos and Deimos.',
                'The red color of Mars comes from iron oxide (rust) on its surface.',
                'Mars has polar ice caps made of water and carbon dioxide ice.'
            ],
            jupiter: [
                'Jupiter is the largest planet in our solar system, with a mass two and a half times that of all other planets combined.',
                'Jupiter\'s Great Red Spot is a giant storm that has lasted for over 400 years.',
                'Jupiter has the shortest day of all planets, rotating once every 9.93 hours.',
                'Jupiter has a faint ring system, though not as prominent as Saturn\'s.',
                'Jupiter emits more energy than it receives from the Sun.'
            ],
            saturn: [
                'Saturn\'s rings are made mostly of ice particles with a small amount of rocky debris.',
                'Saturn would float in water if there were a bathtub large enough (it has the lowest density of all planets).',
                'Saturn has the most extensive ring system of any planet.',
                'Saturn has at least 82 moons, with Titan being the largest.',
                'A year on Saturn is equivalent to 29.5 Earth years.'
            ],
            uranus: [
                'Uranus rotates on its side with an axial tilt of about 98 degrees.',
                'Uranus is the coldest planet in the solar system with a minimum temperature of -224°C.',
                'Uranus is the only planet named after a Greek deity rather than a Roman one.',
                'Uranus has 13 known rings that are extremely dark and narrow.',
                'Uranus appears blue-green due to methane in its atmosphere.'
            ],
            neptune: [
                'Neptune has the strongest winds in the solar system, reaching speeds of over 1,200 mph.',
                'Neptune was the first planet to be predicted mathematically before it was actually observed.',
                'Neptune has a Great Dark Spot, similar to Jupiter\'s Great Red Spot.',
                'Neptune takes nearly 165 Earth years to orbit the Sun once.',
                'Neptune has 6 rings that are much fainter than Saturn\'s.'
            ]
        };
        
        return facts[planetName] || [
            'No facts available for this planet.',
            'Please check back later for updates.'
        ];
    }
    
    // Get recent discovery
    function getRecentDiscovery(planetName) {
        const discoveries = {
            mercury: 'Recent studies by NASA\'s MESSENGER mission revealed evidence of water ice in the permanently shadowed craters at Mercury\'s poles, despite its proximity to the Sun.',
            venus: 'In 2020, scientists detected phosphine gas in Venus\' atmosphere, which on Earth is produced by living organisms, suggesting the possibility of microbial life high in Venus\' clouds.',
            earth: 'Recent climate research has shown that Earth\'s oceans have absorbed more than 90% of the excess heat from human-caused global warming, highlighting the importance of ocean conservation.',
            mars: 'NASA\'s Perseverance rover recently collected evidence suggesting that Mars\' Jezero Crater was once a lake environment that could have supported microbial life.',
            jupiter: 'The Juno mission recently discovered that Jupiter\'s iconic bands extend to a depth of about 3,000 kilometers, much deeper than previously thought.',
            saturn: 'Recent observations suggest that Saturn\'s rings are relatively young, possibly forming less than 100 million years ago, and may disappear in about 100 million years.',
            uranus: 'Recent analysis of Voyager 2 data has revealed a previously unknown plasmoid (a structure of plasma and magnetic fields) being released from Uranus\' atmosphere.',
            neptune: 'Recent Hubble Space Telescope observations show that Neptune\'s Great Dark Spot has vanished and new ones have appeared, suggesting these storms are more transient than Jupiter\'s.'
        };
        
        return discoveries[planetName] || 'No recent discoveries available for this planet.';
    }
    
    // Get space missions
    function getSpaceMissions(planetName) {
        const missions = {
            mercury: [
                'Mariner 10 (1974-1975): The first spacecraft to visit Mercury',
                'MESSENGER (2004-2015): Orbited Mercury and mapped its surface',
                'BepiColombo (2018-present): Joint mission by ESA and JAXA currently en route to Mercury'
            ],
            venus: [
                'Venera 7 (1970): First successful landing on Venus',
                'Magellan (1989-1994): Mapped Venus using radar',
                'Venus Express (2005-2014): ESA mission that studied Venus\' atmosphere',
                'Akatsuki (2015-present): Japanese mission currently studying Venus\' climate'
            ],
            earth: [
                'International Space Station (1998-present): Continuously occupied orbital laboratory',
                'Landsat Program (1972-present): Series of Earth observation satellites',
                'GOES Weather Satellites: Monitor Earth\'s weather and climate'
            ],
            mars: [
                'Viking 1 & 2 (1976): First successful landings on Mars',
                'Mars Pathfinder (1997): Deployed first rover on Mars (Sojourner)',
                'Mars Science Laboratory (2012-present): Deployed Curiosity rover',
                'Mars 2020 (2021-present): Deployed Perseverance rover and Ingenuity helicopter',
                'Tianwen-1 (2021-present): China\'s first successful Mars mission'
            ],
            jupiter: [
                'Pioneer 10 & 11 (1973-1974): First spacecraft to fly by Jupiter',
                'Voyager 1 & 2 (1979): Detailed exploration of Jupiter and its moons',
                'Galileo (1995-2003): First spacecraft to orbit Jupiter',
                'Juno (2016-present): Currently studying Jupiter\'s interior and magnetic field'
            ],
            saturn: [
                'Pioneer 11 (1979): First flyby of Saturn',
                'Voyager 1 & 2 (1980-1981): Provided detailed images of Saturn and its moons',
                'Cassini-Huygens (1997-2017): Orbited Saturn and deployed a lander on Titan'
            ],
            uranus: [
                'Voyager 2 (1986): Only spacecraft to visit Uranus',
                'Hubble Space Telescope: Continues to observe Uranus from Earth orbit'
            ],
            neptune: [
                'Voyager 2 (1989): Only spacecraft to visit Neptune',
                'Hubble Space Telescope: Continues to observe Neptune from Earth orbit'
            ]
        };
        
        return missions[planetName] || ['No mission data available for this planet.'];
    }
});

// Create stars dynamically (alternative to using static images)
function createStars() {
    const starsContainer = document.querySelector('.stars-container');
    
    // Create small stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
    
    // Create medium stars
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = '3px';
        star.style.height = '3px';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
    
    // Create large stars
    for (let i = 0; i < 25; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = '4px';
        star.style.height = '4px';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

// Call createStars on load if using dynamically created stars
// window.addEventListener('load', createStars);
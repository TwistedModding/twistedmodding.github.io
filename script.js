// Sidebar navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        // Search function
        function performSearch(query) {
            if (!query.trim()) {
                clearSearchHighlights();
                return;
            }
            
            const searchTerm = query.toLowerCase();
            let foundResults = [];
            
            // Search through all content sections
            contentSections.forEach(section => {
                const sectionId = section.id;
                const sectionContent = section.textContent.toLowerCase();
                
                if (sectionContent.includes(searchTerm)) {
                    foundResults.push({
                        section: sectionId,
                        element: section
                    });
                }
            });
            
            // Clear previous highlights
            clearSearchHighlights();
            
            if (foundResults.length > 0) {
                // Show first result
                const firstResult = foundResults[0];
                showSection(firstResult.section);
                
                // Highlight search terms
                highlightSearchTerms(searchTerm);
                
                // Show notification
                showSearchNotification(`Found ${foundResults.length} result${foundResults.length > 1 ? 's' : ''} for "${query}"`);
            } else {
                showSearchNotification(`No results found for "${query}"`);
            }
        }
        
        // Function to show a specific section
        function showSection(sectionId) {
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Find and activate the corresponding link
            const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
            const targetSection = document.getElementById(sectionId);
            
            if (targetLink && targetSection) {
                targetLink.classList.add('active');
                targetSection.classList.add('active');
                
                // Scroll to top of main content
                document.querySelector('.main-content').scrollTop = 0;
            }
        }
        
        // Function to highlight search terms
        function highlightSearchTerms(searchTerm) {
            const activeSection = document.querySelector('.content-section.active');
            if (!activeSection) return;
            
            const walker = document.createTreeWalker(
                activeSection,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                if (node.nodeValue.toLowerCase().includes(searchTerm)) {
                    textNodes.push(node);
                }
            }
            
            textNodes.forEach(textNode => {
                const parent = textNode.parentNode;
                const text = textNode.nodeValue;
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                
                if (highlightedText !== text) {
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = highlightedText;
                    parent.replaceChild(wrapper, textNode);
                }
            });
        }
        
        // Function to clear search highlights
        function clearSearchHighlights() {
            const highlights = document.querySelectorAll('.search-highlight');
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
        }
        
        // Function to show search notification
        function showSearchNotification(message) {
            // Remove existing notification
            const existingNotification = document.querySelector('.search-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create new notification
            const notification = document.createElement('div');
            notification.className = 'search-notification';
            notification.textContent = message;
            
            // Add to page
            document.body.appendChild(notification);
            
            // Show notification
            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }
        
        // Search event listeners
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        // Clear highlights when input is cleared
        searchInput.addEventListener('input', function() {
            if (!this.value.trim()) {
                clearSearchHighlights();
            }
        });
    }

    // Handle sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding content section
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
            }
            
            // Close mobile sidebar if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            // Scroll to top of main content
            document.querySelector('.main-content').scrollTop = 0;
        });
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });

    // Smooth scrolling for any remaining anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('sidebar-link')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        }
    });

    // Initialize first section as active
    const firstLink = document.querySelector('.sidebar-link[data-section="overview"]');
    const firstSection = document.getElementById('overview');
    if (firstLink && firstSection) {
        firstLink.classList.add('active');
        firstSection.classList.add('active');
    }
});

// Intersection Observer for section detection (optional enhancement)
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add subtle animation when sections come into view
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});

// Enhanced button interactions
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
});

// Smooth page loading
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Feature card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card, .gameplay-card, .support-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        });
    });
});

// Add some dynamic stats animation (example)
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const finalText = stat.textContent;
            if (finalText.includes('+')) {
                // Animate numbers
                const number = parseInt(finalText);
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            stat.textContent = finalText;
                            clearInterval(timer);
                        } else {
                            stat.textContent = Math.floor(current) + '+';
                        }
                    }, 50);
                }
            }
        });
    };
    
    // Trigger animation when overview section is visible
    const overviewSection = document.getElementById('overview');
    if (overviewSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateStats, 500);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(overviewSection);
    }
});

console.log('Twisted Skyrim website loaded successfully! �⚔️');

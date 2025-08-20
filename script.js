
document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const contentSections = document.querySelectorAll('.content-section');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    function initializeTextAnchoring() {
        addAnchorLinksToHeadings();
    }

    function addAnchorLinksToHeadings() {
        const headings = document.querySelectorAll('.content-section h1, .content-section h2, .content-section h3, .content-section h4, .content-section h5, .content-section h6');
        
        headings.forEach(heading => {
            if (heading.closest('.section-header') || heading.querySelector('.anchor-link')) {
                return;
            }

            let anchorId = heading.id;
            if (!anchorId) {
                anchorId = generateAnchorId(heading.textContent);
                heading.id = anchorId;
            }

            const anchorLink = document.createElement('a');
            anchorLink.href = `#${anchorId}`;
            anchorLink.className = 'anchor-link';
            anchorLink.innerHTML = '🔗';
            anchorLink.title = 'Link to this section';
            
            anchorLink.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToAnchor(anchorId);
                
                copyToClipboard(window.location.origin + window.location.pathname + '#' + anchorId);
            });
            
            heading.appendChild(anchorLink);
        });
    }

    function generateAnchorId(text) {
        let id = text.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        
        let uniqueId = id;
        let counter = 1;
        while (document.getElementById(uniqueId)) {
            uniqueId = `${id}-${counter}`;
            counter++;
        }
        
        return uniqueId;
    }

    function navigateToAnchor(anchorId) {
        const mainSection = document.getElementById(anchorId);
        if (mainSection && mainSection.classList.contains('content-section')) {
            showSection(anchorId);
            updateURL(anchorId);
            return;
        }
        
        const anchor = document.getElementById(anchorId);
        if (!anchor) {
            return;
        }
        
        const containingSection = anchor.closest('.content-section');
        if (containingSection) {
            showSection(containingSection.id);

            setTimeout(() => {
                scrollToElement(anchor);
                highlightAnchor(anchor);
                updateURL(anchorId);
            }, 100);
        }
    }

    function showSection(sectionId) {
        const sidebarLinks = document.querySelectorAll('.sidebar-link');
        const contentSections = document.querySelectorAll('.content-section');
        
        sidebarLinks.forEach(l => l.classList.remove('active'));
        contentSections.forEach(s => s.classList.remove('active'));
        
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);
        
        if (targetLink && targetSection) {
            targetLink.classList.add('active');
            targetSection.classList.add('active');
        }
    }

    function scrollToElement(element) {
        const mainContent = document.querySelector('.main-content');
        const elementTop = element.offsetTop;
        const offset = 20;
        
        mainContent.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
        });
    }

    function highlightAnchor(element) {
        const existingHighlights = document.querySelectorAll('.anchor-highlight');
        existingHighlights.forEach(highlight => highlight.classList.remove('anchor-highlight'));
        
        element.classList.add('anchor-highlight');
        
        if (!document.getElementById('anchor-highlight-styles')) {
            const style = document.createElement('style');
            style.id = 'anchor-highlight-styles';
            style.textContent = `
                .anchor-highlight {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    border-left: 4px solid #ffffff !important;
                    padding-left: 16px !important;
                    border-radius: 6px !important;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2) !important;
                    transition: all 0.3s ease !important;
                    animation: anchorPulse 2s ease-in-out !important;
                }
                
                @keyframes anchorPulse {
                    0% { 
                        background-color: rgba(255, 255, 255, 0.2);
                        box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
                    }
                    50% { 
                        background-color: rgba(255, 255, 255, 0.15);
                        box-shadow: 0 0 25px rgba(255, 255, 255, 0.3);
                    }
                    100% { 
                        background-color: rgba(255, 255, 255, 0.1);
                        box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            element.classList.remove('anchor-highlight');
        }, 3000);
    }

    function updateURL(anchor) {
        const newURL = window.location.pathname + '#' + anchor;
        window.history.pushState(null, null, newURL);
    }

    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyNotification('Link copied to clipboard!');
            }).catch(() => {
                fallbackCopyToClipboard(text);
            });
        } else {
            fallbackCopyToClipboard(text);
        }
    }

    function fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            showCopyNotification('Link copied to clipboard!');
        } catch (err) {
            showCopyNotification('Could not copy link');
        }
        
        document.body.removeChild(textArea);
    }

    function showCopyNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #333333;
            color: #ffffff;
            padding: 12px 20px;
            border-radius: 6px;
            border-left: 4px solid #ffffff;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            font-size: 0.9rem;
            font-weight: 500;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 2000);
    }

    initializeTextAnchoring();

    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        function performSearch(query) {
            if (!query.trim()) {
                clearSearchHighlights();
                return;
            }
            
            const searchTerm = query.toLowerCase();
            let foundResults = [];

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
            
            clearSearchHighlights();
            
            if (foundResults.length > 0) {
                const firstResult = foundResults[0];
                showSection(firstResult.section);
                
                highlightSearchTerms(searchTerm);
                
                showSearchNotification(`Found ${foundResults.length} result${foundResults.length > 1 ? 's' : ''} for "${query}"`);
            } else {
                showSearchNotification(`No results found for "${query}"`);
            }
        }
        
        function showSection(sectionId) {
            showSectionWithoutAnimation(sectionId);
        }

        function showSectionWithoutAnimation(sectionId) {
            const sidebarLinks = document.querySelectorAll('.sidebar-link');
            const contentSections = document.querySelectorAll('.content-section');
            
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
            const targetSection = document.getElementById(sectionId);
            
            if (targetLink && targetSection) {
                targetLink.classList.add('active');
                targetSection.classList.add('active');
                
                updateURL(sectionId);
                
                document.querySelector('.main-content').scrollTop = 0;
            }
        }
        
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
        
        function clearSearchHighlights() {
            const highlights = document.querySelectorAll('.search-highlight');
            highlights.forEach(highlight => {
                const parent = highlight.parentNode;
                parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                parent.normalize();
            });
        }

        function showSearchNotification(message) {
            const existingNotification = document.querySelector('.search-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            const notification = document.createElement('div');
            notification.className = 'search-notification';
            notification.textContent = message;
            
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.add('show');
            }, 100);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }, 3000);
        }
        
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
        
        searchInput.addEventListener('input', function() {
            if (!this.value.trim()) {
                clearSearchHighlights();
            }
        });
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            sidebarLinks.forEach(l => l.classList.remove('active'));
            contentSections.forEach(s => s.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetSection = this.getAttribute('data-section');
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                
                updateURL(targetSection);
            }
            
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
            
            document.querySelector('.main-content').scrollTop = 0;
        });
    });

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains('sidebar-link')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                navigateToAnchor(targetId);
            });
        }
    });

    const urlHash = window.location.hash.substring(1);
    if (urlHash) {
        navigateToAnchor(urlHash);
    } else {
        const firstLink = document.querySelector('.sidebar-link[data-section="overview"]');
        const firstSection = document.getElementById('overview');
        if (firstLink && firstSection) {
            firstLink.classList.add('active');
            firstSection.classList.add('active');
        }
    }

    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            navigateToAnchor(hash);
        }
    });

    console.log('Twisted Skyrim website loaded successfully! ⚔️');
    
    // Load changelog when changelog section is shown
    loadChangelogWhenVisible();
});

// Changelog loading functionality
function loadChangelogWhenVisible() {
    const changelogSection = document.getElementById('changelog');
    const changelogLink = document.querySelector('[data-section="changelog"]');
    
    if (!changelogSection || !changelogLink) return;
    
    let changelogLoaded = false;
    
    changelogLink.addEventListener('click', function() {
        if (!changelogLoaded) {
            loadChangelog();
            changelogLoaded = true;
        }
    });
    
    // Also load if changelog is in the URL hash
    if (window.location.hash === '#changelog') {
        loadChangelog();
        changelogLoaded = true;
    }
}

async function loadChangelog() {
    const changelogContainer = document.getElementById('changelog-content');
    if (!changelogContainer) return;
    
    try {
        // Show loading state
        changelogContainer.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading changelog from GitHub...</p>
            </div>
        `;
        
        // Fetch raw markdown content from GitHub
        const response = await fetch('https://raw.githubusercontent.com/Oghma-Infinium/Twisted-Skyrim/main/CHANGELOG.md');
        
        if (!response.ok) {
            throw new Error('Failed to fetch changelog');
        }
        
        const markdownText = await response.text();
        
        // Convert markdown to HTML
        const htmlContent = convertMarkdownToHTML(markdownText);
        
        // Display the content
        changelogContainer.innerHTML = `
            <div class="changelog-content">
                ${htmlContent}
            </div>
        `;
        
        // Add styling to the changelog content
        addChangelogStyling();
        
    } catch (error) {
        console.error('Error loading changelog:', error);
        changelogContainer.innerHTML = `
            <div class="changelog-error">
                <h3>Unable to load changelog</h3>
                <p>There was an error loading the changelog from GitHub. Please try again later or visit the changelog directly.</p>
                <p><a href="https://github.com/Oghma-Infinium/Twisted-Skyrim/blob/main/CHANGELOG.md" target="_blank" class="btn btn-nexus">View on GitHub</a></p>
            </div>
        `;
    }
}

function convertMarkdownToHTML(markdown) {
    let html = markdown;

    html = html.replace(/^.*?Nexus\s*\|\s*Installation\s*\|\s*Modlist\s*\|\s*FAQ\s*\|\s*Changelog\s*\|\s*Performance Guide\s*\|\s*Gameplay Guide.*?\n.*?---.*?\n/s, '');
    html = html.replace(/^\s*\|.*?Nexus.*?\|.*?Installation.*?\|.*?\n/gm, '');
    html = html.replace(/^\s*\|.*?---.*?\|.*?---.*?\|.*?\n/gm, '');
    html = html.replace(/<p align="center">[\s\S]*?<\/p>/g, '');
    html = html.replace(/^!\[.*?\]\(.*?\)\s*\n/gm, '');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
    html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>');
    html = html.replace(/\n/g, '\n');

    const lines = html.split('\n');
    let inList = false;
    let processedLines = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('<li>') && line.endsWith('</li>')) {
            if (!inList) {
                processedLines.push('<ul>');
                inList = true;
            }
            processedLines.push(line);
        } else {
            if (inList) {
                processedLines.push('</ul>');
                inList = false;
            }
            if (line) {
                processedLines.push(line);
            }
        }
    }
    
    if (inList) {
        processedLines.push('</ul>');
    }
    
    html = processedLines.join('\n');
    
    html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
    
    const paragraphs = html.split('\n\n').map(paragraph => {
        paragraph = paragraph.trim();
        if (paragraph && !paragraph.startsWith('<')) {
            return `<p>${paragraph}</p>`;
        }
        return paragraph;
    }).filter(p => p);
    
    return paragraphs.join('\n');
}

function addChangelogStyling() {
    if (document.getElementById('changelog-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'changelog-styles';
    style.textContent = `
        .loading-spinner {
            text-align: center;
            padding: 40px;
        }
        
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 3px solid #ffffff;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .changelog-container {
            border: 1px solid #333;
            border-radius: 8px;
            background: rgba(0, 0, 0, 0.3);
            padding: 20px;
            max-height: 800px;
            overflow-y: auto;
        }
        
        .changelog-content h1 {
            color: #ffffff;
            border-bottom: 2px solid #ffffff;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        
        .changelog-content h2 {
            color: #cccccc;
            margin-top: 30px;
            margin-bottom: 15px;
            border-left: 4px solid #ffffff;
            padding-left: 15px;
        }
        
        .changelog-content h3 {
            color: #aaaaaa;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        
        .changelog-content p {
            line-height: 1.6;
            margin-bottom: 15px;
        }
        
        .changelog-content ul {
            margin: 15px 0 15px 20px;
            padding: 0;
            list-style-type: disc;
            display: block !important;
            width: 100%;
        }
        
        .changelog-content ol {
            margin: 15px 0 15px 20px;
            padding: 0;
            list-style-type: decimal;
            display: block !important;
            width: 100%;
        }
        
        .changelog-content li {
            display: list-item !important;
            margin: 8px 0;
            line-height: 1.6;
            padding-left: 5px;
            white-space: normal;
            word-wrap: break-word;
            width: 100%;
            clear: both;
        }
        
        .changelog-content ul li {
            list-style-type: disc !important;
            margin-left: 0;
            float: none !important;
            display: list-item !important;
        }
        
        .changelog-content ol li {
            list-style-type: decimal !important;
            margin-left: 0;
            float: none !important;
            display: list-item !important;
        }
        
        .changelog-content code {
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        
        .changelog-content pre {
            background: rgba(0, 0, 0, 0.5);
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            margin: 15px 0;
        }
        
        .changelog-content a {
            color: #ffffff;
            text-decoration: underline;
        }
        
        .changelog-content a:hover {
            color: #cccccc;
        }
        
        .changelog-error {
            text-align: center;
            padding: 40px;
        }
        
        .changelog-error h3 {
            color: #ff6b6b;
            margin-bottom: 15px;
        }
        
        .changelog-error p {
            margin-bottom: 15px;
        }
        
        /* Scrollbar styling */
        .changelog-container::-webkit-scrollbar {
            width: 8px;
        }
        
        .changelog-container::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 4px;
        }
        
        .changelog-container::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
        }
        
        .changelog-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
    `;
    document.head.appendChild(style);
}

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});

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

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

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

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const finalText = stat.textContent;
            if (finalText.includes('+')) {
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
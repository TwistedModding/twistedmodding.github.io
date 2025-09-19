class WebsiteManager {
    constructor() {
        this.navigation = new NavigationManager();
        this.anchors = new AnchorManager();
        this.search = new SearchManager();
        this.changelog = new ChangelogManager();
        this.ui = new UIManager();
    }

    init() {
        try {
            this.navigation.init();
            this.anchors.init();
            this.search.init();
            this.changelog.init();
            this.ui.init();
            console.log('Website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
            this.navigation.basicInit();
        }
    }
}

class NavigationManager {
    constructor() {
        this.sidebarLinks = document.querySelectorAll('.sidebar-link');
        this.contentSections = document.querySelectorAll('.content-section');
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.sidebar = document.querySelector('.sidebar');
        this.appContainer = document.querySelector('.app-container');
    }

    init() {
        if (!this.sidebarLinks.length || !this.contentSections.length) {
            throw new Error('Essential page elements not found');
        }
        this.setupSidebarNavigation();
        this.setupMobileToggle();
        this.setupHashNavigation();
        this.handleInitialLoad();
    }

    basicInit() {
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(link.getAttribute('data-section'));
            });
        });
        
        if (this.sidebarLinks.length > 0 && this.contentSections.length > 0) {
            this.switchSection('overview');
        }
    }

    setupSidebarNavigation() {
        this.sidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.switchSection(targetSection);
                this.closeMobileSidebar();
                this.scrollToTop();
            });
        });
    }

    setupMobileToggle() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                const isOpen = this.sidebar.classList.contains('mobile-open');
                this.sidebar.classList.toggle('mobile-open');
                this.mobileToggle.setAttribute('aria-expanded', !isOpen);
            });
        }

        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!this.sidebar.contains(e.target) && !this.mobileToggle.contains(e.target)) {
                    this.sidebar.classList.remove('mobile-open');
                    this.mobileToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.sidebar.classList.remove('mobile-open');
                this.mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    setupHashNavigation() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.substring(1);
            if (hash) {
                website.anchors.navigateToAnchor(hash);
            }
        });
    }

    switchSection(sectionId) {
        this.sidebarLinks.forEach(l => l.classList.remove('active'));
        this.contentSections.forEach(s => s.classList.remove('active'));
        
        const targetLink = document.querySelector(`[data-section="${sectionId}"]`);
        const targetSection = document.getElementById(sectionId);
        
        if (targetLink && targetSection) {
            targetLink.classList.add('active');
            targetSection.classList.add('active');
            this.updateURL(sectionId);
        }
    }

    closeMobileSidebar() {
        if (window.innerWidth <= 768) {
            this.sidebar.classList.remove('mobile-open');
            this.mobileToggle.setAttribute('aria-expanded', 'false');
        }
    }

    scrollToTop() {
        document.querySelector('.main-content').scrollTop = 0;
    }

    updateURL(anchor) {
        const newURL = window.location.pathname + '#' + anchor;
        window.history.pushState(null, null, newURL);
    }

    handleInitialLoad() {
        const urlHash = window.location.hash.substring(1);
        if (urlHash) {
            website.anchors.navigateToAnchor(urlHash, true); // Pass true to skip highlighting
        } else {
            const firstLink = document.querySelector('.sidebar-link[data-section="overview"]');
            const firstSection = document.getElementById('overview');
            if (firstLink && firstSection) {
                firstLink.classList.add('active');
                firstSection.classList.add('active');
            }
        }
    }
}

class AnchorManager {
    init() {
        this.addAnchorLinksToHeadings();
        this.setupAnchorLinks();
    }

    addAnchorLinksToHeadings() {
        const headings = document.querySelectorAll('.content-section h1, .content-section h2, .content-section h3, .content-section h4, .content-section h5, .content-section h6');
        
        headings.forEach(heading => {
            if (heading.closest('.section-header') || heading.querySelector('.anchor-link')) {
                return;
            }

            let anchorId = heading.id;
            if (!anchorId) {
                anchorId = this.generateAnchorId(heading.textContent);
                heading.id = anchorId;
            }

            const anchorLink = document.createElement('a');
            anchorLink.href = `#${anchorId}`;
            anchorLink.className = 'anchor-link';
            anchorLink.innerHTML = '🔗';
            anchorLink.title = 'Link to this section';
            
            anchorLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToAnchor(anchorId);
                this.copyToClipboard(window.location.origin + window.location.pathname + '#' + anchorId);
            });
            
            heading.appendChild(anchorLink);
        });
    }

    generateAnchorId(text) {
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

    navigateToAnchor(anchorId, skipHighlight = false) {
        const targetElement = document.getElementById(anchorId);
        if (!targetElement) return;

        const section = targetElement.closest('.content-section');
        if (section) {
            website.navigation.switchSection(section.id);
            setTimeout(() => {
                this.scrollToElement(targetElement);
                if (!skipHighlight) {
                    this.highlightAnchor(targetElement);
                }
            }, 300);
        }
    }

    scrollToElement(element) {
        const elementRect = element.getBoundingClientRect();
        const offset = elementRect.top + window.pageYOffset - 100;
        
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }

    highlightAnchor(element) {
        element.classList.add('anchor-highlight');
        
        if (!document.getElementById('anchor-highlight-styles')) {
            const style = document.createElement('style');
            style.id = 'anchor-highlight-styles';
            style.textContent = `
                .anchor-highlight {
                    background-color: rgba(255, 255, 255, 0.1) !important;
                    border-left: 4px solid #ffffff !important;
                    padding-left: 16px !important;
                    transition: all 0.3s ease !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            element.classList.remove('anchor-highlight');
        }, 3000);
    }

    setupAnchorLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            if (!anchor.classList.contains('sidebar-link')) {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = anchor.getAttribute('href').substring(1);
                    this.navigateToAnchor(targetId);
                });
            }
        });
    }

    copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                this.showCopyNotification('Link copied to clipboard!');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopyNotification('Link copied to clipboard!');
        } catch (err) {
            this.showCopyNotification('Failed to copy link');
        }
        
        document.body.removeChild(textArea);
    }

    showCopyNotification(message) {
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
}

class SearchManager {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchButton = document.querySelector('.search-button');
        this.searchDropdown = null;
        this.searchCounter = null;
        this.currentSearchResults = [];
        this.currentSearchIndex = 0;
        this.currentSearchTerm = '';
        this.currentlyHighlightedElement = null;
        this.qaMapping = this.initializeQAMapping();
    }

    init() {
        if (this.searchInput && this.searchButton) {
            this.createSearchElements();
            this.setupEventListeners();
        }
    }

    initializeQAMapping() {
        return {
            'how do i install': { section: 'installation', anchor: null, keywords: ['install', 'setup', 'wabbajack'], alternatives: ['how install', 'how instal', 'how to instal', 'instal guide', 'instalation', 'instalation guide'] },
            'how to install': { section: 'installation', anchor: null, keywords: ['install', 'setup', 'wabbajack'], alternatives: ['how install', 'how instal', 'how to instal'] },
            'installation guide': { section: 'installation', anchor: null, keywords: ['install', 'guide'], alternatives: ['instal guide', 'instalation guide', 'install help', 'setup guide'] },
            'where do i download': { section: 'installation', anchor: null, keywords: ['download', 'get', 'obtain'], alternatives: ['where download', 'where downlaod', 'how download', 'where get', 'were download'] },
            'how to download': { section: 'installation', anchor: null, keywords: ['download', 'get', 'wabbajack'], alternatives: ['how download', 'how downlaod', 'were download'] },
            'pagefile setup': { section: 'installation', anchor: 'setup-pagefile-required', keywords: ['pagefile', 'virtual memory'], alternatives: ['page file', 'pagefiles', 'virtual mem', 'memory setup'] },
            'visual c++': { section: 'installation', anchor: null, keywords: ['visual', 'c++', 'runtime'], alternatives: ['visual c', 'c++ runtime', 'visual studio', 'vcredist'] },
            'creation club': { section: 'installation', anchor: 'purchase-install-creation-club-content', keywords: ['creation club', 'cc', 'anniversary'], alternatives: ['creation club content', 'cc content', 'anniversary edition', 'ae content'] },
            'low fps': { section: 'performance', anchor: null, keywords: ['fps', 'framerate', 'slow', 'lag'], alternatives: ['bad fps', 'poor fps', 'slow fps', 'fps drop', 'frame rate', 'framerates'] },
            'performance issues': { section: 'performance', anchor: null, keywords: ['performance', 'slow', 'lag', 'stutter'], alternatives: ['performace issues', 'performance problem', 'slow game', 'game slow', 'stuttering', 'lag issues'] },
            'how to improve fps': { section: 'performance', anchor: null, keywords: ['improve', 'increase', 'fps', 'performance'], alternatives: ['improve performance', 'increase fps', 'better fps', 'boost fps', 'fix fps'] },
            'enb settings': { section: 'performance', anchor: 'modifying-enb', keywords: ['enb', 'graphics', 'visual'], alternatives: ['enb config', 'enb configuration', 'graphics settings', 'visual settings'] },
            'disable enb': { section: 'performance', anchor: 'disabling-enb', keywords: ['disable', 'turn off', 'enb'], alternatives: ['turn off enb', 'remove enb', 'enb off', 'no enb'] },
            'lod generation': { section: 'performance', anchor: 'lods', keywords: ['lod', 'distance', 'generation'], alternatives: ['lods', 'lod gen', 'distance lod', 'terrain lod'] },
            'bethini': { section: 'performance', anchor: 'modifying-game-inis', keywords: ['bethini', 'ini', 'settings'], alternatives: ['beth ini', 'ini settings', 'game settings'] },
            'system requirements': { section: 'requirements', anchor: null, keywords: ['requirements', 'specs', 'hardware'], alternatives: ['system specs', 'hardware requirements', 'minimum requirements', 'sys req', 'pc specs'] },
            'minimum specs': { section: 'requirements', anchor: null, keywords: ['minimum', 'specs', 'requirements'], alternatives: ['min specs', 'minimum requirements', 'lowest specs', 'min req'] },
            'how much ram': { section: 'requirements', anchor: null, keywords: ['ram', 'memory', 'gb'], alternatives: ['ram needed', 'memory needed', 'how much memory', 'ram requirement'] },
            'storage space': { section: 'requirements', anchor: null, keywords: ['storage', 'space', 'gb', 'size'], alternatives: ['disk space', 'hard drive space', 'hdd space', 'ssd space', 'space needed'] },
            'disk space': { section: 'requirements', anchor: null, keywords: ['disk', 'space', 'storage'], alternatives: ['hard drive space', 'storage space', 'hdd space'] },
            'how to start': { section: 'gameplay', anchor: null, keywords: ['start', 'begin', 'new game'], alternatives: ['how start', 'starting guide', 'begin game', 'new character'] },
            'combat system': { section: 'gameplay', anchor: 'combat-foundations', keywords: ['combat', 'fighting', 'battle'], alternatives: ['fighting system', 'battle system', 'combat mechanics', 'fighting mechanics'] },
            'dodging': { section: 'gameplay', anchor: null, keywords: ['dodge', 'roll', 'avoid'], alternatives: ['dodge mechanics', 'rolling', 'how to dodge', 'dodge roll'] },
            'difficulty': { section: 'gameplay', anchor: 'difficulty', keywords: ['difficulty', 'hard', 'challenging'], alternatives: ['game difficulty', 'too hard', 'too easy', 'difficulty settings'] },
            'survival mode': { section: 'gameplay', anchor: null, keywords: ['survival', 'hunger', 'temperature'], alternatives: ['survival mechanics', 'needs system', 'hunger system', 'cold system'] },
            'leveling system': { section: 'gameplay', anchor: 'leveling-and-progression', keywords: ['level', 'xp', 'progression'], alternatives: ['leveling', 'experience', 'progression system', 'how to level'] },
            'game crashes': { section: 'faq', anchor: null, keywords: ['crash', 'ctd', 'freeze'], alternatives: ['game crash', 'crashing', 'crashes', 'game freezes', 'ctd'] },
            'game freezes': { section: 'faq', anchor: null, keywords: ['freeze', 'hang', 'stuck'], alternatives: ['freezing', 'game freeze', 'hang', 'stuck game'] },
            'loading forever': { section: 'faq', anchor: null, keywords: ['loading', 'infinite', 'stuck'], alternatives: ['infinite loading', 'stuck loading', 'loading screen', 'wont load'] },
            'black screen': { section: 'faq', anchor: null, keywords: ['black screen', 'blank', 'nothing'], alternatives: ['blank screen', 'dark screen', 'no display', 'screen black'] },
            'vigilant mod': { section: 'faq', anchor: null, keywords: ['vigilant', 'altano', 'windpeak'], alternatives: ['vigilant quest', 'vigilant start', 'altano location'] },
            'start vigilant': { section: 'faq', anchor: null, keywords: ['vigilant', 'start', 'begin'], alternatives: ['begin vigilant', 'vigilant quest start', 'how start vigilant'] },
            'legacy of dragonborn': { section: 'features', anchor: null, keywords: ['legacy', 'dragonborn', 'museum'], alternatives: ['legacy dragonborn', 'lotd', 'museum mod'] },
            'camera settings': { section: 'faq', anchor: null, keywords: ['camera', 'view', 'third person'], alternatives: ['camera options', 'view settings', 'camera mod'] },
            'first person': { section: 'faq', anchor: null, keywords: ['first person', 'fp', 'view'], alternatives: ['first person view', 'fp view', '1st person'] },
            'ui problems': { section: 'faq', anchor: null, keywords: ['ui', 'interface', 'hud'], alternatives: ['ui issues', 'interface problems', 'hud problems', 'menu problems'] },
            'character creation': { section: 'faq', anchor: null, keywords: ['character', 'creation', 'racemenu'], alternatives: ['char creation', 'character maker', 'racemenu'] },
            'two ears': { section: 'faq', anchor: null, keywords: ['ears', 'double', 'two sets'], alternatives: ['double ears', 'ear bug', 'multiple ears', 'extra ears'] },
            'get help': { section: 'support', anchor: null, keywords: ['help', 'support', 'discord'], alternatives: ['need help', 'support', 'assistance', 'discord help'] },
            'discord server': { section: 'support', anchor: null, keywords: ['discord', 'server', 'community'], alternatives: ['discord link', 'discord channel', 'community discord'] },
            'report bug': { section: 'support', anchor: null, keywords: ['bug', 'report', 'issue'], alternatives: ['bug report', 'report issue', 'found bug', 'report problem'] }
        };
    }

    createSearchElements() {
        if (!this.searchDropdown) {
            this.searchDropdown = document.createElement('div');
            this.searchDropdown.className = 'search-dropdown';
            this.searchInput.parentElement.appendChild(this.searchDropdown);
        }
        
        if (!this.searchCounter) {
            this.searchCounter = document.createElement('div');
            this.searchCounter.className = 'search-counter';
            this.searchInput.parentElement.appendChild(this.searchCounter);
        }
    }

    setupEventListeners() {
        this.searchButton.addEventListener('click', () => {
            if (this.currentSearchTerm === this.searchInput.value.trim() && this.currentSearchResults.length > 0) {
                this.cycleToNextMatch();
            } else {
                this.performSearch(this.searchInput.value);
            }
        });
        
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.searchInput.value.trim();
                
                if (this.currentSearchTerm === query && this.currentSearchResults.length > 0) {
                    this.cycleToNextMatch();
                    return;
                }
                
                if (query.length >= 2) {
                    const wordSearchResults = this.findAllMatches(query);
                    if (wordSearchResults.length > 0) {
                        this.performSearch(query);
                        return;
                    }
                }
                
                if (this.handleQuestionAnswer(query)) {
                    return;
                }
                
                if (query) {
                    this.performSearch(query);
                }
            }
        });
        
        this.searchInput.addEventListener('input', () => {
            const query = this.searchInput.value.trim();
            if (!query || query.length === 0) {
                this.clearSearchHighlights();
                this.resetSearchState();
                this.hideSearchDropdown();
                return;
            }
            
            if (query.length >= 2) {
                const wordSearchResults = this.findAllMatches(query);
                const questionSuggestions = this.getQuestionSuggestions(query);
                
                this.currentSearchResults = wordSearchResults;
                this.currentSearchIndex = 0;
                this.currentSearchTerm = query;
                
                this.showCombinedDropdown(wordSearchResults, questionSuggestions, query);
                
                if (wordSearchResults.length > 0) {
                    setTimeout(() => {
                        this.highlightSearchTerms(query);
                    }, 100);
                }
                
                this.updateSearchCounter();
            } else {
                this.hideSearchDropdown();
                if (this.searchCounter) this.searchCounter.classList.remove('show');
            }
        });
        
        this.searchInput.addEventListener('keydown', (e) => {
            if (!this.searchDropdown || !this.searchDropdown.classList.contains('show')) return;
            
            const items = this.searchDropdown.querySelectorAll('.search-dropdown-item');
            const activeItem = this.searchDropdown.querySelector('.search-dropdown-item.active');
            let currentIndex = Array.from(items).indexOf(activeItem);
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentIndex < items.length - 1) {
                    items[currentIndex].classList.remove('active');
                    items[currentIndex + 1].classList.add('active');
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentIndex > 0) {
                    items[currentIndex].classList.remove('active');
                    items[currentIndex - 1].classList.add('active');
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeItem) {
                    activeItem.click();
                }
            } else if (e.key === 'Escape') {
                this.hideSearchDropdown();
            }
        });
        
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && !this.searchDropdown?.contains(e.target)) {
                this.hideSearchDropdown();
            }
        });
    }

    findAllMatches(query) {
        const searchTerm = query.toLowerCase();
        const matches = [];
        const elementMatches = new Map();
        
        const contentSections = document.querySelectorAll('.content-section');
        
        contentSections.forEach(section => {
            if (section.id === 'changelog') return;
            
            const walker = document.createTreeWalker(
                section,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            let node;
            while (node = walker.nextNode()) {
                const text = node.nodeValue;
                const lowerText = text.toLowerCase();
                let index = lowerText.indexOf(searchTerm);
                
                while (index !== -1) {
                    const start = Math.max(0, index - 30);
                    const end = Math.min(text.length, index + searchTerm.length + 30);
                    const snippet = text.substring(start, end);
                    const highlightElement = this.findBestHighlightElement(node);
                    
                    const match = {
                        node: node,
                        section: section,
                        sectionId: section.id,
                        index: index,
                        snippet: snippet,
                        fullText: text,
                        element: highlightElement
                    };
                    
                    if (!elementMatches.has(highlightElement)) {
                        elementMatches.set(highlightElement, match);
                        matches.push(match);
                    }
                    
                    index = lowerText.indexOf(searchTerm, index + 1);
                }
            }
        });
        
        return matches;
    }

    findBestHighlightElement(textNode) {
        let element = textNode.parentElement;
        const inlineElements = ['A', 'STRONG', 'EM', 'SPAN', 'CODE', 'I', 'B', 'U'];
        
        while (element && inlineElements.includes(element.tagName)) {
            element = element.parentElement;
        }
        
        return element || textNode.parentElement;
    }

    performSearch(query, showDropdown = false) {
        if (!query.trim()) {
            this.clearSearchHighlights();
            this.resetSearchState();
            return;
        }
        
        this.currentSearchTerm = query;
        this.currentSearchResults = this.findAllMatches(query);
        this.currentSearchIndex = 0;
        
        if (showDropdown) {
            this.showSearchDropdown(this.currentSearchResults, query);
        } else {
            this.hideSearchDropdown();
        }
        
        this.clearSearchHighlights();
        
        if (this.currentSearchResults.length > 0) {
            const firstResult = this.currentSearchResults[0];
            this.jumpToMatch(firstResult);
            
            setTimeout(() => {
                this.highlightSearchTerms(query);
            }, 200);
            
            this.updateSearchCounter();
            
            if (!showDropdown) {
                this.showSearchNotification(`Found ${this.currentSearchResults.length} result${this.currentSearchResults.length > 1 ? 's' : ''} for "${query}"`);
            }
        } else {
            this.resetSearchState();
            this.showSearchNotification(`No results found for "${query}"`);
        }
    }

    jumpToMatch(match) {
        const currentSection = document.querySelector('.content-section.active');
        
        if (!currentSection || currentSection.id !== match.sectionId) {
            website.navigation.switchSection(match.sectionId);
            
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
            
            setTimeout(() => {
                if (mainContent) {
                    mainContent.scrollTop = 0;
                }
                this.scrollToMatchElement(match);
            }, 350);
        } else {
            this.scrollToMatchElement(match);
        }
    }

    scrollToMatchElement(match) {
        if (!match.element) return;
        
        const isSameElement = this.currentlyHighlightedElement === match.element;
        this.clearCurrentLineHighlight();
        
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const elementRect = match.element.getBoundingClientRect();
        const elementTopRelativeToDoc = elementRect.top + currentScrollY;
        const targetScrollY = Math.max(0, elementTopRelativeToDoc - 100);
        
        const viewportHeight = window.innerHeight;
        const isElementVisible = elementRect.top >= 100 && elementRect.bottom <= viewportHeight - 100;
        
        const shouldScroll = !isSameElement || !isElementVisible || Math.abs(currentScrollY - targetScrollY) > 50;
        
        if (shouldScroll) {
            const distance = targetScrollY - currentScrollY;
            const duration = Math.min(Math.abs(distance) * 0.5, 600);
            const startTime = performance.now();
            
            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentPosition = currentScrollY + (distance * easeOut);
                
                window.scrollTo(0, currentPosition);
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };
            
            requestAnimationFrame(animateScroll);
        }
        
        match.element.classList.add('line-highlight');
        this.currentlyHighlightedElement = match.element;
    }

    clearCurrentLineHighlight() {
        if (this.currentlyHighlightedElement) {
            this.currentlyHighlightedElement.classList.remove('line-highlight');
            this.currentlyHighlightedElement = null;
        }
    }

    cycleToNextMatch() {
        if (this.currentSearchResults.length === 0) return;
        
        this.currentSearchIndex = (this.currentSearchIndex + 1) % this.currentSearchResults.length;
        const match = this.currentSearchResults[this.currentSearchIndex];
        
        this.jumpToMatch(match);
        this.updateSearchCounter();
        
        setTimeout(() => {
            this.highlightSearchTerms(this.currentSearchTerm);
        }, 100);
    }

    highlightSearchTerms(searchTerm) {
        this.clearSearchHighlights();
        
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection) return;
        
        this.highlightTextInElement(activeSection, searchTerm);
    }

    highlightTextInElement(element, searchTerm) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    if (node.parentElement.classList?.contains('search-highlight') || 
                        !node.nodeValue.trim()) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.nodeValue.toLowerCase().includes(searchTerm.toLowerCase()) 
                        ? NodeFilter.FILTER_ACCEPT 
                        : NodeFilter.FILTER_REJECT;
                }
            },
            false
        );
        
        const textNodes = [];
        let node;
        
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }
        
        textNodes.reverse().forEach(textNode => {
            try {
                const parent = textNode.parentNode;
                if (!parent) return;
                
                const text = textNode.nodeValue;
                const regex = new RegExp(`(${this.escapeRegExp(searchTerm)})`, 'gi');
                
                if (regex.test(text)) {
                    const highlightedText = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                    
                    const wrapper = document.createElement('span');
                    wrapper.innerHTML = highlightedText;
                    
                    parent.replaceChild(wrapper, textNode);
                }
            } catch (error) {
                console.warn('Error highlighting text node:', error);
            }
        });
    }

    clearSearchHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            try {
                const parent = highlight.parentNode;
                if (parent) {
                    parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
                    parent.normalize();
                }
            } catch (error) {
                console.warn('Error clearing highlight:', error);
            }
        });
    }

    showCombinedDropdown(wordResults, questionSuggestions, query) {
        if (!this.searchDropdown) return;
        
        this.searchDropdown.innerHTML = '';
        
        if (wordResults.length === 0 && questionSuggestions.length === 0) {
            this.searchDropdown.style.display = 'none';
            return;
        }
        
        if (wordResults.length > 0) {
            const wordHeader = document.createElement('div');
            wordHeader.className = 'search-dropdown-header';
            wordHeader.innerHTML = `🔍 Found ${wordResults.length} text match${wordResults.length > 1 ? 'es' : ''}:`;
            wordHeader.style.cssText = `
                padding: 8px 15px;
                background-color: #2a2a2a;
                color: #fff;
                font-size: 0.85rem;
                border-bottom: 1px solid #444;
                font-weight: 600;
            `;
            this.searchDropdown.appendChild(wordHeader);
            
            const displayWordResults = wordResults.slice(0, 6);
            
            displayWordResults.forEach((match, index) => {
                const item = document.createElement('div');
                item.className = 'search-dropdown-item word-result';
                if (index === 0) item.classList.add('active');
                
                const snippet = document.createElement('div');
                snippet.className = 'search-snippet';
                
                const highlightedSnippet = match.snippet.replace(
                    new RegExp(`(${this.escapeRegExp(query)})`, 'gi'),
                    '<span class="search-snippet-highlight">$1</span>'
                );
                
                snippet.innerHTML = `...${highlightedSnippet}...`;
                item.appendChild(snippet);
                
                item.addEventListener('click', () => {
                    this.currentSearchIndex = wordResults.indexOf(match);
                    this.jumpToMatch(match);
                    this.hideSearchDropdown();
                    this.updateSearchCounter();
                });
                
                this.searchDropdown.appendChild(item);
            });
        }
        
        if (questionSuggestions.length > 0) {
            const questionHeader = document.createElement('div');
            questionHeader.className = 'search-dropdown-header';
            questionHeader.innerHTML = '💡 Or maybe you meant to ask:';
            questionHeader.style.cssText = `
                padding: 8px 15px;
                background-color: #333;
                color: #ccc;
                font-size: 0.8rem;
                border-bottom: 1px solid #444;
                font-weight: 500;
                margin-top: ${wordResults.length > 0 ? '4px' : '0'};
            `;
            this.searchDropdown.appendChild(questionHeader);
            
            const displayQuestions = questionSuggestions.slice(0, 4);
            
            displayQuestions.forEach((suggestion, index) => {
                const item = document.createElement('div');
                item.className = 'search-dropdown-item question-item';
                if (wordResults.length === 0 && index === 0) item.classList.add('active');
                
                const questionDiv = document.createElement('div');
                questionDiv.className = 'question-text';
                questionDiv.style.cssText = `
                    color: #fff;
                    font-weight: 500;
                    margin-bottom: 4px;
                `;
                
                const highlightedQuestion = suggestion.question.replace(
                    new RegExp(`(${this.escapeRegExp(query)})`, 'gi'),
                    '<span class="search-snippet-highlight">$1</span>'
                );
                questionDiv.innerHTML = `❓ ${highlightedQuestion}`;
                
                const sectionDiv = document.createElement('div');
                sectionDiv.className = 'question-section';
                sectionDiv.style.cssText = `
                    color: #888;
                    font-size: 0.85rem;
                `;
                sectionDiv.textContent = `→ ${suggestion.answer.section.charAt(0).toUpperCase() + suggestion.answer.section.slice(1)} section`;
                
                item.appendChild(questionDiv);
                item.appendChild(sectionDiv);
                
                item.addEventListener('click', () => {
                    this.searchInput.value = suggestion.question;
                    this.handleQuestionAnswer(suggestion.question);
                });
                
                this.searchDropdown.appendChild(item);
            });
        }
        
        this.searchDropdown.classList.add('show');
    }

    hideSearchDropdown() {
        if (this.searchDropdown) {
            this.searchDropdown.classList.remove('show');
        }
    }

    updateSearchCounter() {
        if (!this.searchCounter || this.currentSearchResults.length === 0) {
            if (this.searchCounter) this.searchCounter.classList.remove('show');
            this.updateSearchButton();
            return;
        }
        
        this.searchCounter.textContent = `${this.currentSearchIndex + 1}/${this.currentSearchResults.length}`;
        this.searchCounter.classList.add('show');
        this.updateSearchButton();
    }

    updateSearchButton() {
        if (this.currentSearchResults.length > 0 && this.currentSearchTerm === this.searchInput.value.trim()) {
            this.searchButton.classList.add('cycle-mode');
            this.searchButton.title = `Cycle through ${this.currentSearchResults.length} results`;
        } else {
            this.searchButton.classList.remove('cycle-mode');
            this.searchButton.title = 'Search';
        }
    }

    resetSearchState() {
        this.currentSearchResults = [];
        this.currentSearchIndex = 0;
        this.currentSearchTerm = '';
        this.hideSearchDropdown();
        if (this.searchCounter) this.searchCounter.classList.remove('show');
        this.clearCurrentLineHighlight();
        this.updateSearchButton();
    }

    showSearchNotification(message) {
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

    escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    getQuestionSuggestions(query) {
        const suggestions = [];
        const lowerQuery = query.toLowerCase().trim();
        
        const normalizedQuery = lowerQuery
            .replace(/\b(wont|won't)\b/g, 'will not')
            .replace(/\b(cant|can't)\b/g, 'cannot')
            .replace(/\b(dont|don't)\b/g, 'do not')
            .replace(/\b(isnt|isn't)\b/g, 'is not')
            .replace(/\bwere\b/g, 'where')
            .replace(/\binstal\b/g, 'install')
            .replace(/\bdownlaod\b/g, 'download')
            .replace(/\bperformace\b/g, 'performance')
            .replace(/\s+/g, ' ');
        
        const questionWords = ['how', 'what', 'where', 'why', 'when', 'can', 'do', 'does', 'is', 'are', 'help', 'wont', 'cant', 'need'];
        const isQuestion = questionWords.some(word => 
            normalizedQuery.includes(word) || 
            this.similarityScore(normalizedQuery.split(' ')[0], word) > 0.7
        ) || normalizedQuery.includes('?');
        
        if (!isQuestion && normalizedQuery.length < 3) return suggestions;
        
        for (const [question, answer] of Object.entries(this.qaMapping)) {
            let score = 0;
            
            const questionSimilarity = this.similarityScore(normalizedQuery, question);
            if (questionSimilarity > 0.6) {
                score += questionSimilarity * 20;
            }
            
            if (answer.alternatives) {
                for (const alt of answer.alternatives) {
                    const altSimilarity = this.similarityScore(normalizedQuery, alt);
                    if (altSimilarity > 0.6) {
                        score += altSimilarity * 15;
                    }
                    if (normalizedQuery.includes(alt) || alt.includes(normalizedQuery)) {
                        score += 10;
                    }
                }
            }
            
            const queryWords = normalizedQuery.split(/\s+/);
            for (const keyword of answer.keywords) {
                for (const qWord of queryWords) {
                    if (qWord.length >= 2) {
                        const keywordSimilarity = this.similarityScore(qWord, keyword);
                        if (keywordSimilarity > 0.7) {
                            score += keywordSimilarity * 8;
                        }
                        if (qWord.includes(keyword) || keyword.includes(qWord)) {
                            score += 5;
                        }
                    }
                }
            }
            
            const questionWords = question.split(/\s+/);
            for (const qWord of queryWords) {
                if (qWord.length >= 3) {
                    for (const questionWord of questionWords) {
                        const wordSimilarity = this.similarityScore(qWord, questionWord);
                        if (wordSimilarity > 0.7) {
                            score += wordSimilarity * 6;
                        }
                    }
                }
            }
            
            if (question.includes(normalizedQuery) || normalizedQuery.includes(question)) {
                score += 12;
            }
            
            if (score >= 8) {
                suggestions.push({
                    question: question,
                    answer: answer,
                    score: score,
                    similarity: questionSimilarity
                });
            }
        }
        
        return suggestions.sort((a, b) => b.score - a.score).slice(0, 6);
    }

    handleQuestionAnswer(input) {
        const answer = this.analyzeQuestion(input);
        if (answer) {
            if (answer.anchor) {
                website.anchors.navigateToAnchor(answer.anchor);
            } else {
                website.navigation.switchSection(answer.section);
            }
            
            this.showSearchNotification(`Found relevant section: ${answer.section.charAt(0).toUpperCase() + answer.section.slice(1)}`);
            
            this.searchInput.value = '';
            this.hideSearchDropdown();
            this.resetSearchState();
            
            return true;
        }
        return false;
    }

    analyzeQuestion(input) {
        const query = input.toLowerCase().trim();
        
        const normalizedQuery = query
            .replace(/\b(wont|won't)\b/g, 'will not')
            .replace(/\b(cant|can't)\b/g, 'cannot')
            .replace(/\b(dont|don't)\b/g, 'do not')
            .replace(/\b(doesnt|doesn't)\b/g, 'does not')
            .replace(/\b(isnt|isn't)\b/g, 'is not')
            .replace(/\b(im|i'm)\b/g, 'i am')
            .replace(/\b(its|it's)\b/g, 'it is')
            .replace(/\bwere\b/g, 'where')
            .replace(/\btheir\b/g, 'there')
            .replace(/\bthen\b/g, 'than')
            .replace(/\s+/g, ' ');

        let bestMatch = null;
        let bestScore = 0;

        for (const [question, answer] of Object.entries(this.qaMapping)) {
            let score = 0;

            const questionSimilarity = this.similarityScore(normalizedQuery, question);
            if (questionSimilarity > 0.7) {
                score += questionSimilarity * 20;
            }

            if (answer.alternatives) {
                for (const alt of answer.alternatives) {
                    const altSimilarity = this.similarityScore(normalizedQuery, alt);
                    if (altSimilarity > 0.7) {
                        score += altSimilarity * 15;
                    }
                    if (normalizedQuery.includes(alt) || alt.includes(normalizedQuery)) {
                        score += 10;
                    }
                }
            }

            const words = normalizedQuery.split(/\s+/);
            for (const keyword of answer.keywords) {
                for (const word of words) {
                    if (word.length >= 3) {
                        const keywordSimilarity = this.similarityScore(word, keyword);
                        if (keywordSimilarity > 0.7) {
                            score += keywordSimilarity * 8;
                        }
                        if (word.includes(keyword) || keyword.includes(word)) {
                            score += 5;
                        }
                    }
                }
            }

            const questionPatterns = ['how', 'what', 'where', 'why', 'when', 'can', 'do', 'does', 'is', 'are', 'help'];
            for (const pattern of questionPatterns) {
                for (const word of words) {
                    if (this.similarityScore(word, pattern) > 0.8) {
                        score += 2;
                    }
                }
            }

            if (question.includes(normalizedQuery) || normalizedQuery.includes(question)) {
                score += 15;
            }

            if (score > bestScore) {
                bestScore = score;
                bestMatch = answer;
            }
        }

        return bestScore >= 8 ? bestMatch : null;
    }

    levenshteinDistance(str1, str2) {
        const matrix = [];
        const len1 = str1.length;
        const len2 = str2.length;

        for (let i = 0; i <= len2; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= len1; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= len2; i++) {
            for (let j = 1; j <= len1; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[len2][len1];
    }

    similarityScore(str1, str2) {
        const maxLen = Math.max(str1.length, str2.length);
        if (maxLen === 0) return 1;
        return 1 - (this.levenshteinDistance(str1, str2) / maxLen);
    }
}

class ChangelogManager {
    init() {
        this.loadChangelogWhenVisible();
    }

    loadChangelogWhenVisible() {
        const changelogSection = document.getElementById('changelog');
        if (!changelogSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadChangelog();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(changelogSection);
    }

    async loadChangelog() {
        const changelogContainer = document.getElementById('changelog-content');
        if (!changelogContainer) {
            return;
        }
        
        try {
            changelogContainer.innerHTML = `
                <div class="loading-spinner">
                    <div class="spinner"></div>
                    <p>Loading changelog from GitHub...</p>
                </div>
            `;
            
            const urls = [
                'https://raw.githubusercontent.com/Oghma-Infinium/Twisted-Skyrim/main/CHANGELOG.md',
                'https://api.github.com/repos/Oghma-Infinium/Twisted-Skyrim/contents/CHANGELOG.md'
            ];
            
            let response;
            let markdownText;
            
            for (let i = 0; i < urls.length; i++) {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 15000);
                    
                    response = await fetch(urls[i], {
                        signal: controller.signal,
                        method: 'GET',
                        headers: {
                            'Accept': i === 0 ? 'text/plain' : 'application/vnd.github.v3+json',
                        }
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (response.ok) {
                        if (i === 0) {
                            markdownText = await response.text();
                        } else {
                            const data = await response.json();
                            markdownText = atob(data.content);
                        }
                        break;
                    }
                } catch (urlError) {
                    if (i === urls.length - 1) {
                        throw urlError;
                    }
                    continue;
                }
            }
            
            if (!markdownText) {
                throw new Error('All fetch attempts failed');
            }
            
            const htmlContent = this.convertMarkdownToHTML(markdownText);
            
            changelogContainer.innerHTML = `
                <div class="changelog-content">
                    ${htmlContent}
                </div>
            `;
            
            this.addChangelogStyling();
            
        } catch (error) {
            let errorMessage = 'There was an error loading the changelog from GitHub.';
            let showFallback = false;
            
            if (error.name === 'AbortError') {
                errorMessage = 'The request timed out. Please check your internet connection and try again.';
                showFallback = true;
            } else if (error.message.includes('Failed to fetch') || error.message.includes('All fetch attempts failed')) {
                errorMessage = 'Unable to connect to GitHub. Please check your internet connection or try again later.';
                showFallback = true;
            }
            
            changelogContainer.innerHTML = `
                <div class="changelog-error">
                    <h3>Unable to load changelog</h3>
                    <p>${errorMessage}</p>
                    <p>Error details: ${error.message}</p>
                    <p><a href="https://github.com/Oghma-Infinium/Twisted-Skyrim/blob/main/CHANGELOG.md" target="_blank" class="btn btn-nexus">View on GitHub</a></p>
                    ${showFallback ? `
                    <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 6px;">
                        <h4>Latest Updates</h4>
                        <p>For the most current changelog information, please visit the GitHub page above. The changelog includes:</p>
                        <ul>
                            <li>Bug fixes and stability improvements</li>
                            <li>New mod additions and updates</li>
                            <li>Performance optimizations</li>
                            <li>Balance changes and tweaks</li>
                        </ul>
                    </div>
                    ` : ''}
                </div>
            `;
        }
    }

    convertMarkdownToHTML(markdown) {
        let html = markdown;

        // Remove navigation table and header content first
        html = html.replace(/^.*?Nexus\s*\|\s*Installation\s*\|\s*Modlist\s*\|\s*FAQ\s*\|\s*Changelog\s*\|\s*Performance Guide\s*\|\s*Gameplay Guide.*?\n.*?---.*?\n/s, '');
        html = html.replace(/^\s*\|.*?Nexus.*?\|.*?Installation.*?\|.*?\n/gm, '');
        html = html.replace(/^\s*\|.*?---.*?\|.*?---.*?\|.*?\n/gm, '');
        html = html.replace(/<p align="center">[\s\S]*?<\/p>/g, '');
        html = html.replace(/^!\[.*?\]\(.*?\)\s*\n/gm, '');
        
        // Remove horizontal rules (---) 
        html = html.replace(/^\s*---+\s*$/gm, '');
        
        // Convert headers
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Convert lists BEFORE formatting to avoid conflicts with italic asterisks
        // Handle various spacing patterns for bullet points
        html = html.replace(/^[\*\-]\s+(.+)$/gm, '<li>$1</li>');
        html = html.replace(/^[\*\-](.+)$/gm, '<li>$1</li>'); // Handle no space after *
        
        // Convert formatting
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        html = html.replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>');
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
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
        
        // Handle numbered lists
        html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
        
        // Convert paragraphs, but handle cases where lists follow text immediately
        const allLines = html.split('\n');
        let result = [];
        let currentParagraph = [];
        
        for (let i = 0; i < allLines.length; i++) {
            const line = allLines[i].trim();
            
            // If it's a list item or already HTML, process separately
            if (line.startsWith('<li>') || line.startsWith('<ul>') || line.startsWith('</ul>') || 
                line.startsWith('<h') || line.startsWith('<strong>') || line.startsWith('<em>')) {
                // Finish current paragraph if any
                if (currentParagraph.length > 0) {
                    const paragraphText = currentParagraph.join(' ').trim();
                    if (paragraphText) {
                        result.push(`<p>${paragraphText}</p>`);
                    }
                    currentParagraph = [];
                }
                result.push(line);
            } else if (line === '') {
                // Empty line - finish paragraph
                if (currentParagraph.length > 0) {
                    const paragraphText = currentParagraph.join(' ').trim();
                    if (paragraphText) {
                        result.push(`<p>${paragraphText}</p>`);
                    }
                    currentParagraph = [];
                }
            } else {
                // Regular text line
                currentParagraph.push(line);
            }
        }
        
        // Finish any remaining paragraph
        if (currentParagraph.length > 0) {
            const paragraphText = currentParagraph.join(' ').trim();
            if (paragraphText) {
                result.push(`<p>${paragraphText}</p>`);
            }
        }
        
        return result.filter(line => line.trim()).join('\n');
    }

    addChangelogStyling() {
        // Add dynamic changelog styling since the content is generated by JS
        if (document.getElementById('dynamic-changelog-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'dynamic-changelog-styles';
        style.textContent = `
            .changelog-content h1 {
                color: #ffffff;
                border-bottom: 2px solid #ffffff;
                padding-bottom: 10px;
                margin-bottom: 20px;
                font-size: 1.5rem;
            }
            
            .changelog-content h2 {
                color: #cccccc;
                margin-top: 30px;
                margin-bottom: 15px;
                border-left: 4px solid #ffffff;
                padding-left: 15px;
                font-size: 1.25rem;
                font-weight: 600;
                background: linear-gradient(135deg, #ffffff, #cccccc);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .changelog-content h3 {
                color: #aaaaaa;
                margin-top: 20px;
                margin-bottom: 10px;
                font-size: 1.1rem;
            }
            
            .changelog-content p {
                line-height: 1.6;
                margin-bottom: 15px;
                color: #ffffff;
            }
            
            .changelog-content ul {
                margin: 15px 0 25px 20px;
                padding: 0;
                list-style-type: disc;
            }
            
            .changelog-content li {
                margin-bottom: 8px;
                line-height: 1.6;
                color: #cccccc;
                list-style-type: disc;
            }
            
            .changelog-content strong {
                color: #ffffff;
                font-weight: 600;
            }
            
            .changelog-content em {
                color: #cccccc;
                font-style: italic;
            }
            
            .changelog-content code {
                background: rgba(255, 255, 255, 0.1);
                color: #ffffff;
                padding: 2px 6px;
                border-radius: 4px;
                font-family: 'Courier New', monospace;
                font-size: 0.9em;
            }
            
            .changelog-content a {
                color: #ffffff;
                text-decoration: underline;
                transition: color 0.3s ease;
            }
            
            .changelog-content a:hover {
                color: #cccccc;
            }
        `;
        
        document.head.appendChild(style);
    }

    renderStaticChangelog(container) {
        const staticChanges = [
            {
                version: '1.6.0',
                date: 'September 2025',
                changes: [
                    'Enhanced graphics and visual effects',
                    'Improved combat system with new animations',
                    'Added new quest content and storylines',
                    'Performance optimizations and bug fixes',
                    'Updated mod compatibility for latest Skyrim version'
                ]
            },
            {
                version: '1.5.5',
                date: 'August 2025',
                changes: [
                    'Fixed critical stability issues',
                    'Improved ENB preset configuration',
                    'Enhanced weather and lighting system',
                    'Updated character creation options'
                ]
            },
            {
                version: '1.5.0',
                date: 'July 2025',
                changes: [
                    'Major overhaul of magic system',
                    'New armor and weapon sets',
                    'Improved AI behavior for NPCs',
                    'Enhanced survival mechanics'
                ]
            }
        ];

        const changelogHTML = staticChanges.map(release => `
            <div class="changelog-entry">
                <div class="changelog-header">
                    <span class="changelog-version">v${release.version}</span>
                    <span class="changelog-date">${release.date}</span>
                </div>
                <div class="changelog-changes">
                    <ul>
                        ${release.changes.map(change => `<li>${change}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="changelog-fallback">
                <p><em>Recent Updates (Fallback):</em></p>
                ${changelogHTML}
                <div class="changelog-footer">
                    <p>For the complete changelog, visit <a href="https://github.com/Oghma-Infinium/Twisted-Skyrim/blob/main/CHANGELOG.md" target="_blank" rel="noopener noreferrer">the official repository</a>.</p>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

class UIManager {
    init() {
        this.initializeFeatureCards();
    }

    initializeFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        if (featureCards.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        featureCards.forEach(card => {
            observer.observe(card);
        });
    }
}

const website = new WebsiteManager();

console.log('Loading Twisted Skyrim website script...');

document.addEventListener('DOMContentLoaded', () => {
    try {
        website.init();
    } catch (error) {
        console.error('Error initializing website:', error);
        website.navigation.basicInit();
    }
});

/* ==========================================================================
   Screenshot Gallery
   ========================================================================== */

class ScreenshotGallery {
    constructor() {
        this.gallery = document.getElementById('screenshot-gallery');
        this.modal = null;
        this.screenshots = [];
        this.originalScreenshots = [];
        this.currentSort = 'name-asc';
        this.init();
    }

    init() {
        this.createModal();
        this.createSortingControls();
        this.loadScreenshots();
    }

    createSortingControls() {
        const sortContainer = document.createElement('div');
        sortContainer.className = 'screenshot-sort-container';
        sortContainer.innerHTML = `
            <div class="screenshot-sort-controls">
                <label for="screenshot-sort">Sort by:</label>
                <select id="screenshot-sort" class="screenshot-sort-dropdown">
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="date-newest">Date (Newest First)</option>
                    <option value="date-oldest">Date (Oldest First)</option>
                    <option value="location">Location</option>
                    <option value="random">Random</option>
                </select>
                <button class="screenshot-view-toggle" id="screenshot-view-toggle" title="Toggle grid/list view">
                    <span class="grid-icon">⊞</span>
                </button>
            </div>
        `;

        this.gallery.parentNode.insertBefore(sortContainer, this.gallery);

        const sortDropdown = document.getElementById('screenshot-sort');
        sortDropdown.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortScreenshots();
        });

        const viewToggle = document.getElementById('screenshot-view-toggle');
        viewToggle.addEventListener('click', () => {
            this.gallery.classList.toggle('list-view');
            const icon = viewToggle.querySelector('.grid-icon');
            icon.textContent = this.gallery.classList.contains('list-view') ? '☰' : '⊞';
        });
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'screenshot-modal';
        this.modal.innerHTML = `
            <button class="screenshot-modal-close">&times;</button>
            <img src="" alt="Screenshot">
        `;
        document.body.appendChild(this.modal);

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal || e.target.className === 'screenshot-modal-close') {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    async loadScreenshots() {
        try {
            const response = await fetch('https://api.github.com/repos/TwistedModding/twistedmodding.github.io/contents/screenshots');
            
            if (response.ok) {
                const files = await response.json();
                this.originalScreenshots = files
                    .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
                    .map(file => ({
                        name: file.name,
                        url: file.download_url,
                        title: this.formatTitle(file.name),
                        description: 'Twisted Skyrim Screenshot',
                        location: this.extractLocation(file.name),
                        dateInfo: this.extractDateInfo(file.name),
                        uploadDate: new Date(file.created_at || Date.now())
                    }));
            } else {
                this.originalScreenshots = this.getFallbackScreenshots();
            }

            this.screenshots = [...this.originalScreenshots];
            this.sortScreenshots();
        } catch (error) {
            console.warn('Could not load screenshots from GitHub API:', error);
            this.originalScreenshots = this.getFallbackScreenshots();
            this.screenshots = [...this.originalScreenshots];
            this.sortScreenshots();
        }
    }

    getFallbackScreenshots() {
        const fallbackFiles = [
            'Falkreath - Sundas, 2꞉09 PM, 17th of Last Seed, 4E 201.png',
            'Hall of Attainment - Sundas, 1꞉49 PM, 17th of Last Seed, 4E 201.png',
            'Hod and Gerdur\'s House - Morndas, 11꞉34 AM, 18th of Last Seed, 4E 201.png',
            'Hod and Gerdur\'s House - Morndas, 11꞉39 AM, 18th of Last Seed, 4E 201.png',
            'Hod and Gerdur\'s House - Morndas, 11꞉46 AM, 18th of Last Seed, 4E 201.png',
            'Skyrim - Sundas, 4꞉57 PM, 17th of Last Seed, 4E 201.png',
            'The Blue Palace - Sundas, 11꞉15 PM, 17th of Last Seed, 4E 201.png',
            'The Blue Palace - Sundas, 11꞉55 PM, 17th of Last Seed, 4E 201.png',
            'The Blue Palace - Sundas, 4꞉00 PM, 17th of Last Seed, 4E 201.png',
            'The Blue Palace - Sundas, 4꞉06 PM, 17th of Last Seed, 4E 201.png'
        ];

        return fallbackFiles.map(filename => ({
            name: filename,
            url: `./screenshots/${encodeURIComponent(filename)}`,
            title: this.formatTitle(filename),
            description: 'Twisted Skyrim Screenshot',
            location: this.extractLocation(filename),
            dateInfo: this.extractDateInfo(filename),
            uploadDate: new Date()
        }));
    }

    extractLocation(filename) {
        const match = filename.match(/^([^-]+)/);
        return match ? match[1].trim() : 'Unknown';
    }

    extractDateInfo(filename) {
        const match = filename.match(/(\w+,\s*\d+꞉\d+\s*[AP]M,\s*\d+\w*\s*of\s*\w+\s*\w+,\s*\d+E\s*\d+)/);
        return match ? match[1] : null;
    }

    sortScreenshots() {
        const sortedScreenshots = [...this.screenshots];
        
        switch (this.currentSort) {
            case 'name-asc':
                sortedScreenshots.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                sortedScreenshots.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'date-newest':
                sortedScreenshots.sort((a, b) => {
                    if (a.dateInfo && b.dateInfo) {
                        return b.dateInfo.localeCompare(a.dateInfo);
                    }
                    return b.uploadDate - a.uploadDate;
                });
                break;
            case 'date-oldest':
                sortedScreenshots.sort((a, b) => {
                    if (a.dateInfo && b.dateInfo) {
                        return a.dateInfo.localeCompare(b.dateInfo);
                    }
                    return a.uploadDate - b.uploadDate;
                });
                break;
            case 'location':
                sortedScreenshots.sort((a, b) => {
                    const locationCompare = a.location.localeCompare(b.location);
                    if (locationCompare === 0) {
                        return a.name.localeCompare(b.name);
                    }
                    return locationCompare;
                });
                break;
            case 'random':
                for (let i = sortedScreenshots.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [sortedScreenshots[i], sortedScreenshots[j]] = [sortedScreenshots[j], sortedScreenshots[i]];
                }
                break;
        }
        
        this.screenshots = sortedScreenshots;
        this.renderGallery();
    }

    formatTitle(filename) {
        return filename
            .replace(/\.(jpg|jpeg|png|webp)$/i, '')
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    }

    renderGallery() {
        if (this.screenshots.length === 0) {
            this.gallery.innerHTML = `
                <div class="loading-message">
                    <p>No screenshots found. Upload your screenshots to the <a href="https://github.com/TwistedModding/twistedmodding.github.io/tree/main/screenshots" target="_blank">screenshots folder</a> on GitHub!</p>
                </div>
            `;
            return;
        }

        this.gallery.innerHTML = this.screenshots.map(screenshot => `
            <div class="screenshot-item" data-src="${screenshot.url}">
                <img src="${screenshot.url}" alt="${screenshot.title}" loading="lazy">
                <div class="screenshot-overlay">
                    <div class="screenshot-title">${screenshot.title}</div>
                    <div class="screenshot-description">${screenshot.description}</div>
                </div>
            </div>
        `).join('');

        this.gallery.querySelectorAll('.screenshot-item').forEach(item => {
            item.addEventListener('click', () => {
                this.openModal(item.dataset.src);
            });
        });
    }

    openModal(src) {
        const img = this.modal.querySelector('img');
        img.src = src;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('screenshot-gallery')) {
        new ScreenshotGallery();
    }
});

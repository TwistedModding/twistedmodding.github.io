import React, { useState, useEffect, useCallback } from 'react';

const Screenshots = () => {
  const [screenshots, setScreenshots] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');
  const [isListView, setIsListView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const loadScreenshots = useCallback(async () => {
    try {
      const response = await fetch('https://api.github.com/repos/TwistedModding/twistedmodding.github.io/contents/screenshots');
      if (response.ok) {
        const files = await response.json();
        const imageFiles = files
          .filter(file => file.type === 'file' && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
          .map(file => ({
            name: file.name,
            url: file.download_url,
            title: formatTitle(file.name)
          }));
        setScreenshots(imageFiles);
      }
    } catch (error) {
      console.error('Error loading screenshots:', error);
    }
  }, []);

  useEffect(() => {
    loadScreenshots();
  }, [loadScreenshots]);

  const formatTitle = (filename) => {
    return filename
      .replace(/\.(jpg|jpeg|png|webp)$/i, '')
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const sortScreenshots = (shots) => {
    const sorted = [...shots];
    switch (sortBy) {
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'random':
        return sorted.sort(() => Math.random() - 0.5);
      default:
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const sortedScreenshots = sortScreenshots(screenshots);

  return (
    <>
      <div className="section-header">
        <h1>Screenshots</h1>
        <p className="subtitle">View screenshots from Twisted Skyrim</p>
      </div>

      <div className="screenshot-sort-container">
        <div className="screenshot-sort-controls">
          <label htmlFor="screenshot-sort">Sort by:</label>
          <select 
            id="screenshot-sort" 
            className="screenshot-sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="random">Random</option>
          </select>
          <button 
            className="screenshot-view-toggle" 
            onClick={() => setIsListView(!isListView)}
            title="Toggle grid/list view"
          >
            <span className="grid-icon">{isListView ? '☰' : '⊞'}</span>
          </button>
        </div>
      </div>

      <div className={`screenshot-gallery ${isListView ? 'list-view' : ''}`} id="screenshot-gallery">
        {sortedScreenshots.map((screenshot, index) => (
          <div 
            key={index} 
            className="screenshot-item" 
            onClick={() => setSelectedImage(screenshot.url)}
          >
            <img src={screenshot.url} alt={screenshot.title} loading="lazy" />
            <div className="screenshot-overlay">
              <div className="screenshot-title">{screenshot.title}</div>
              <div className="screenshot-description">Twisted Skyrim Screenshot</div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="screenshot-modal active" onClick={() => setSelectedImage(null)}>
          <button className="screenshot-modal-close" onClick={() => setSelectedImage(null)}>&times;</button>
          <img src={selectedImage} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default Screenshots;

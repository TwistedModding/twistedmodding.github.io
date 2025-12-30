import React, { useState, useEffect, useCallback } from 'react';

const Changelog = () => {
  const [changelogContent, setChangelogContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const convertMarkdownToHTML = useCallback((markdown) => {
    let html = markdown;
    
    // Remove the header section (everything before the first ## or until we find "## ")
    // This removes the logo, navigation table, and horizontal rule
    const firstH2 = html.search(/^## /m);
    if (firstH2 !== -1) {
      html = html.substring(firstH2);
    }
    
    // Convert markdown to HTML
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
    
    // Convert unordered lists (lines starting with * or -)
    html = html.replace(/^[*-] (.+)$/gm, '<li>$1</li>');
    // Wrap consecutive <li> elements in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);
    
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*([^\s*](?:.*?[^\s*])?)\*/g, '<em>$1</em>');
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Convert line breaks to <br> (but not inside lists or after headings)
    html = html.replace(/(?<!<\/h[1-6]>)(?<!<\/li>)(?<!<\/ul>)\n(?!<[h#ul])/g, '<br>\n');
    
    return html;
  }, []);

  const loadChangelog = useCallback(async () => {
    try {
      const response = await fetch('https://raw.githubusercontent.com/Oghma-Infinium/Twisted-Skyrim/main/CHANGELOG.md');
      if (response.ok) {
        const text = await response.text();
        const htmlContent = convertMarkdownToHTML(text);
        setChangelogContent(htmlContent);
      } else {
        setError('Failed to load changelog');
      }
    } catch (err) {
      setError('Error loading changelog: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [convertMarkdownToHTML]);

  useEffect(() => {
    loadChangelog();
  }, [loadChangelog]);

  return (
    <>
      <div className="section-header">
        <h1>Changelog</h1>
        <p className="subtitle">View the latest changes and updates</p>
      </div>

      <div id="changelog-content">
        {loading && <div className="loading-spinner"><p>Loading changelog...</p></div>}
        {error && <div className="changelog-error"><p>{error}</p></div>}
        {!loading && !error && (
          <div className="changelog-content" dangerouslySetInnerHTML={{ __html: changelogContent }} />
        )}
      </div>
    </>
  );
};

export default Changelog;

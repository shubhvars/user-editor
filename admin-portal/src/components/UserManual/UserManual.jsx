import { useState, useEffect } from 'react';
import { getAllContent } from '../../services/api';
import './UserManual.css';

const UserManual = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchContents();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const articles = document.querySelectorAll('.manual-article');
            let currentId = '';

            articles.forEach(article => {
                const rect = article.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    currentId = article.id;
                }
            });

            if (currentId) {
                setActiveSection(currentId);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [contents]);

    const fetchContents = async () => {
        try {
            setLoading(true);
            const response = await getAllContent('true'); // Only published content
            if (response.success) {
                // Sort by order
                const sortedData = response.data.sort((a, b) => a.order - b.order);
                setContents(sortedData);
                if (sortedData.length > 0) {
                    setActiveSection(sortedData[0].slug);
                }
            } else {
                setError('Failed to load content');
            }
        } catch (err) {
            setError('Error loading content. Make sure the backend is running.');
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Group contents by category
    const groupedContents = contents.reduce((acc, content) => {
        const category = content.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(content);
        return acc;
    }, {});

    const scrollToSection = (slug) => {
        const element = document.getElementById(slug);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(slug);
        }
    };

    // Filter contents based on search
    const filteredContents = contents.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group filtered contents
    const filteredGroupedContents = filteredContents.reduce((acc, content) => {
        const category = content.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(content);
        return acc;
    }, {});

    if (loading) {
        return (
            <div className="manual-page">
                <div className="manual-loading">
                    <div className="loader">
                        <div className="loader-ring"></div>
                        <div className="loader-ring"></div>
                        <div className="loader-ring"></div>
                    </div>
                    <p>Loading documentation...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="manual-page">
                <div className="manual-error">
                    <div className="error-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>
                    <h2>Unable to Load Content</h2>
                    <p>{error}</p>
                    <button onClick={fetchContents} className="btn-primary">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (contents.length === 0) {
        return (
            <div className="manual-page">
                <div className="manual-empty">
                    <div className="empty-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                        </svg>
                    </div>
                    <h2>No Content Available</h2>
                    <p>The documentation is currently being updated. Please check back later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="manual-page">
            {/* Main Content */}
            <div className="manual-layout">
                {/* Sidebar */}
                <aside className="manual-sidebar">
                    <div className="sidebar-sticky">
                        <div className="sidebar-header">
                            <h3>📖 ERPICA User Manual</h3>
                        </div>
                        <div className="sidebar-search">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="sidebar-section">
                            <nav className="sidebar-nav">
                                {Object.entries(groupedContents).map(([category, items]) => (
                                    <div key={category} className="sidebar-category">
                                        <div className="sidebar-category-title">{category}</div>
                                        {items.map(item => (
                                            <button
                                                key={item._id}
                                                className={`sidebar-link ${activeSection === item.slug ? 'active' : ''}`}
                                                onClick={() => scrollToSection(item.slug)}
                                            >
                                                {item.title}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </aside>

                {/* Articles */}
                <main className="manual-content" id="docs">
                    <div className="content-container">
                        {Object.entries(searchQuery ? filteredGroupedContents : groupedContents).map(([category, items]) => (
                            <div key={category} className="category-section">
                                <h2 className="category-title">{category}</h2>
                                {items.map(item => (
                                    <article key={item._id} id={item.slug} className="manual-article">
                                        <div className="article-badge">{item.category}</div>
                                        <h3 className="article-title">{item.title}</h3>
                                        <div
                                            className="article-body"
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    </article>
                                ))}
                            </div>
                        ))}

                        {searchQuery && filteredContents.length === 0 && (
                            <div className="no-results">
                                <div className="no-results-icon">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    </svg>
                                </div>
                                <h3>No results found</h3>
                                <p>No documentation matches "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="manual-footer">
                <div className="footer-container">
                    <div className="footer-brand">
                        <span>📚 ERPICA User Manual</span>
                    </div>
                    <p className="footer-copyright">
                        © {new Date().getFullYear()} Erpica. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default UserManual;

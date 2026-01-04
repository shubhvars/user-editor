import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllContent, deleteContent, togglePublish } from '../../services/api';
import './ContentList.css';

const ContentList = () => {
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchContents();
    }, []);

    const fetchContents = async () => {
        try {
            setLoading(true);
            const response = await getAllContent();
            if (response.success) {
                setContents(response.data);
            } else {
                setError('Failed to fetch content');
            }
        } catch (err) {
            setError('Error connecting to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteContent(id);
            if (response.success) {
                setContents(contents.filter(c => c._id !== id));
                showMessage('Content deleted successfully', 'success');
            }
        } catch (err) {
            showMessage('Failed to delete content', 'error');
        }
        setDeleteId(null);
    };

    const handleTogglePublish = async (id) => {
        try {
            const response = await togglePublish(id);
            if (response.success) {
                setContents(contents.map(c =>
                    c._id === id ? { ...c, isPublished: response.data.isPublished } : c
                ));
                showMessage(response.message, 'success');
            }
        } catch (err) {
            showMessage('Failed to toggle publish status', 'error');
        }
    };

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage(null), 3000);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="content-list-page">
            <div className="page-header">
                <h1 className="page-title">📚 Content Management</h1>
                <div className="page-actions">
                    <Link to="/create" className="btn btn-primary">
                        ➕ New Content
                    </Link>
                </div>
            </div>

            {message && (
                <div className={`alert alert-${message.type}`}>
                    {message.type === 'success' ? '✅' : '❌'} {message.text}
                </div>
            )}

            {error && (
                <div className="alert alert-error">
                    ⚠️ {error}
                </div>
            )}

            {contents.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📝</div>
                    <h3 className="empty-state-title">No content yet</h3>
                    <p className="empty-state-text">
                        Create your first user manual content to get started.
                    </p>
                    <Link to="/create" className="btn btn-primary">
                        Create Content
                    </Link>
                </div>
            ) : (
                <div className="content-categories">
                    {Object.entries(groupedContents).map(([category, items]) => (
                        <div key={category} className="category-section">
                            <h2 className="category-title">
                                <span className="badge badge-category">{category}</span>
                                <span className="category-count">{items.length} items</span>
                            </h2>
                            <div className="content-list">
                                {items.map(content => (
                                    <div key={content._id} className="content-item">
                                        <div className="content-item-info">
                                            <h3 className="content-item-title">{content.title}</h3>
                                            <div className="content-item-meta">
                                                <span className={`badge ${content.isPublished ? 'badge-published' : 'badge-draft'}`}>
                                                    {content.isPublished ? '✓ Published' : '○ Draft'}
                                                </span>
                                                <span>Order: {content.order}</span>
                                                <span>Updated: {formatDate(content.updatedAt)}</span>
                                            </div>
                                        </div>
                                        <div className="content-item-actions">
                                            <button
                                                onClick={() => handleTogglePublish(content._id)}
                                                className="btn btn-sm btn-secondary"
                                                title={content.isPublished ? 'Unpublish' : 'Publish'}
                                            >
                                                {content.isPublished ? '📤' : '📥'}
                                            </button>
                                            <Link to={`/edit/${content._id}`} className="btn btn-sm btn-primary">
                                                ✏️ Edit
                                            </Link>
                                            <button
                                                onClick={() => setDeleteId(content._id)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="modal-overlay" onClick={() => setDeleteId(null)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">⚠️ Confirm Delete</h3>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this content? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setDeleteId(null)} className="btn btn-secondary">
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteId)} className="btn btn-danger">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentList;

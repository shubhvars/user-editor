import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Editor from '../Editor/Editor';
import { createContent, updateContent, getContentById } from '../../services/api';
import './ContentEditor.css';

const ContentEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: 'General',
        order: 0,
        isPublished: false,
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchContent();
        }
    }, [id]);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const response = await getContentById(id);
            if (response.success) {
                setFormData({
                    title: response.data.title,
                    content: response.data.content,
                    category: response.data.category,
                    order: response.data.order,
                    isPublished: response.data.isPublished,
                });
            } else {
                setError('Content not found');
            }
        } catch (err) {
            setError('Error loading content');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError('Title is required');
            return;
        }

        if (!formData.content.trim()) {
            setError('Content is required');
            return;
        }

        try {
            setSaving(true);
            setError(null);

            const response = isEditing
                ? await updateContent(id, formData)
                : await createContent(formData);

            if (response.success) {
                navigate('/');
            } else {
                setError(response.message || 'Failed to save content');
            }
        } catch (err) {
            setError('Error saving content');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleEditorChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };

    const categories = ['General', 'Getting Started', 'Installation', 'Configuration', 'Features', 'API', 'FAQ', 'Troubleshooting'];

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="content-editor-page">
            <div className="page-header">
                <h1 className="page-title">
                    {isEditing ? '✏️ Edit Content' : '📝 Create New Content'}
                </h1>
                <div className="page-actions">
                    <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="btn btn-secondary"
                    >
                        {showPreview ? '🔒 Hide Preview' : '👁️ Show Preview'}
                    </button>
                    <Link to="/" className="btn btn-secondary">
                        ← Back
                    </Link>
                </div>
            </div>

            {error && (
                <div className="alert alert-error">
                    ❌ {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="editor-layout">
                    <div className="editor-main">
                        {/* Title */}
                        <div className="form-group">
                            <label className="form-label">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="form-input"
                                placeholder="Enter content title..."
                            />
                        </div>

                        {/* Editor */}
                        <div className="form-group">
                            <label className="form-label">Content *</label>
                            <Editor
                                content={formData.content}
                                onChange={handleEditorChange}
                                placeholder="Start writing your user manual content..."
                            />
                        </div>
                    </div>

                    <div className="editor-sidebar">
                        {/* Settings Card */}
                        <div className="card sidebar-card">
                            <div className="card-header">
                                <h3>⚙️ Settings</h3>
                            </div>
                            <div className="card-body">
                                {/* Category */}
                                <div className="form-group">
                                    <label className="form-label">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="form-input form-select"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Order */}
                                <div className="form-group">
                                    <label className="form-label">Display Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleInputChange}
                                        className="form-input"
                                        min="0"
                                    />
                                </div>

                                {/* Published */}
                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="isPublished"
                                            checked={formData.isPublished}
                                            onChange={handleInputChange}
                                        />
                                        <span>Publish immediately</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Actions Card */}
                        <div className="card sidebar-card">
                            <div className="card-body">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn btn-primary btn-block"
                                >
                                    {saving ? '💾 Saving...' : isEditing ? '💾 Update Content' : '✅ Create Content'}
                                </button>
                                {isEditing && (
                                    <Link to="/" className="btn btn-secondary btn-block" style={{ marginTop: '0.5rem' }}>
                                        Cancel
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Preview Panel */}
            {showPreview && (
                <div className="preview-section">
                    <div className="preview-panel">
                        <div className="preview-header">
                            👁️ Live Preview
                        </div>
                        <div className="preview-content">
                            <h1>{formData.title || 'Untitled'}</h1>
                            <div dangerouslySetInnerHTML={{ __html: formData.content || '<p>No content yet...</p>' }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentEditor;

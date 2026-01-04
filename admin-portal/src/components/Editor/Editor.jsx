import { useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { uploadImage } from '../../services/api';
import './Editor.css';

const MenuBar = ({ editor, onImageUpload, isUploading }) => {
    const fileInputRef = useRef(null);

    if (!editor) {
        return null;
    }

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image must be less than 5MB');
            return;
        }

        // Convert to base64 and upload
        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = reader.result;
            await onImageUpload(base64);
        };
        reader.readAsDataURL(file);

        // Reset input
        e.target.value = '';
    };

    const addImageByUrl = () => {
        const url = window.prompt('Enter the image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter the URL:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    return (
        <div className="editor-toolbar">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />

            {/* Text Formatting */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`toolbar-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
                title="Bold"
            >
                <strong>B</strong>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`toolbar-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
                title="Italic"
            >
                <em>I</em>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`toolbar-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
                title="Underline"
            >
                <u>U</u>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`toolbar-btn ${editor.isActive('strike') ? 'is-active' : ''}`}
                title="Strikethrough"
            >
                <s>S</s>
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                className={`toolbar-btn ${editor.isActive('highlight') ? 'is-active' : ''}`}
                title="Highlight"
            >
                🖍️
            </button>

            <div className="toolbar-divider" />

            {/* Headings */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`toolbar-btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
                title="Heading 1"
            >
                H1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`toolbar-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
                title="Heading 2"
            >
                H2
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`toolbar-btn ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
                title="Heading 3"
            >
                H3
            </button>

            <div className="toolbar-divider" />

            {/* Lists */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`toolbar-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                title="Bullet List"
            >
                •
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`toolbar-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                title="Numbered List"
            >
                1.
            </button>

            <div className="toolbar-divider" />

            {/* Alignment */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`toolbar-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}`}
                title="Align Left"
            >
                ⫷
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`toolbar-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}`}
                title="Align Center"
            >
                ≡
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`toolbar-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}`}
                title="Align Right"
            >
                ⫸
            </button>

            <div className="toolbar-divider" />

            {/* Special */}
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`toolbar-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                title="Quote"
            >
                ❝
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`toolbar-btn ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
                title="Code Block"
            >
                {'</>'}
            </button>
            <button
                type="button"
                onClick={setLink}
                className={`toolbar-btn ${editor.isActive('link') ? 'is-active' : ''}`}
                title="Link"
            >
                🔗
            </button>

            {/* Image Upload Button */}
            <button
                type="button"
                onClick={handleImageClick}
                className={`toolbar-btn ${isUploading ? 'is-uploading' : ''}`}
                title="Upload Image"
                disabled={isUploading}
            >
                {isUploading ? '⏳' : '📤'}
            </button>

            {/* Image from URL */}
            <button
                type="button"
                onClick={addImageByUrl}
                className="toolbar-btn"
                title="Add Image from URL"
            >
                🖼️
            </button>

            <div className="toolbar-divider" />

            {/* Actions */}
            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="toolbar-btn"
                title="Horizontal Rule"
            >
                ─
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="toolbar-btn"
                title="Undo"
            >
                ↶
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="toolbar-btn"
                title="Redo"
            >
                ↷
            </button>
        </div>
    );
};

const Editor = ({ content, onChange, placeholder = 'Start writing your content...' }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight,
            Image.configure({
                HTMLAttributes: {
                    class: 'uploaded-image',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const handleImageUpload = async (base64Image) => {
        setIsUploading(true);
        setUploadError(null);

        try {
            const result = await uploadImage(base64Image);

            if (result.success && result.data?.url) {
                // Insert image into editor
                editor.chain().focus().setImage({ src: result.data.url }).run();
            } else {
                setUploadError(result.message || 'Failed to upload image');
                alert('Failed to upload image: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadError('Failed to upload image');
            alert('Failed to upload image. Make sure the backend server is running and Cloudinary is configured.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="editor-wrapper">
            <MenuBar
                editor={editor}
                onImageUpload={handleImageUpload}
                isUploading={isUploading}
            />
            {uploadError && (
                <div className="upload-error">
                    ⚠️ {uploadError}
                </div>
            )}
            {isUploading && (
                <div className="upload-progress">
                    <div className="upload-spinner"></div>
                    <span>Uploading image to Cloudinary...</span>
                </div>
            )}
            <EditorContent editor={editor} />
        </div>
    );
};

export default Editor;

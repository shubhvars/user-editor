const API_BASE_URL = 'https://user-backend-usjt.onrender.com/api';

// Fetch all content
export const getAllContent = async (published = null) => {
    try {
        let url = `${API_BASE_URL}/content`;
        if (published !== null) {
            url += `?published=${published}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
};

// Fetch single content by ID
export const getContentById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching content:', error);
        throw error;
    }
};

// Create new content
export const createContent = async (contentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contentData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating content:', error);
        throw error;
    }
};

// Update content
export const updateContent = async (id, contentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contentData),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating content:', error);
        throw error;
    }
};

// Delete content
export const deleteContent = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting content:', error);
        throw error;
    }
};

// Toggle publish status
export const togglePublish = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/content/${id}/toggle-publish`, {
            method: 'PATCH',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error toggling publish:', error);
        throw error;
    }
};

// Upload image to Cloudinary
export const uploadImage = async (base64Image) => {
    try {
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Image }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

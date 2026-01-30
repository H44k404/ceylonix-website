import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

const PortfolioAdmin = () => {
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: 'photo',
    platform: 'instagram',
    category: 'wedding',
    title: '',
    image: '',
    thumbnailImage: '',
    embedUrl: ''
  });

  // Load items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('portfolioItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Load default items
      loadDefaultItems();
    }
  }, []);

  const loadDefaultItems = () => {
    const defaultItems = [
      {
        id: 1,
        type: 'embed',
        platform: 'instagram',
        category: 'reel',
        embedUrl: 'https://www.instagram.com/reel/DTiHb56DhCN/?utm_source=ig_embed&utm_campaign=loading',
        thumbnailImage: 'https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=500&q=80',
        title: 'Instagram Reel - Recent Project',
        isEmbed: true
      },
      {
        id: 2,
        type: 'photo',
        category: 'wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        title: 'Elegant Wedding Ceremony'
      },
      {
        id: 3,
        type: 'photo',
        category: 'corporate',
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
        title: 'Corporate Brand Film'
      }
    ];
    setItems(defaultItems);
    localStorage.setItem('portfolioItems', JSON.stringify(defaultItems));
  };

  const handleAdd = () => {
    const newItem = {
      id: Math.max(...items.map(i => i.id), 0) + 1,
      ...formData,
      isEmbed: formData.type === 'embed'
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
    resetForm();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      type: item.type,
      platform: item.platform || 'instagram',
      category: item.category || 'wedding',
      title: item.title,
      image: item.image || '',
      thumbnailImage: item.thumbnailImage || '',
      embedUrl: item.embedUrl || ''
    });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedItems = items.map(item =>
      item.id === editingId
        ? {
            ...item,
            ...formData,
            isEmbed: formData.type === 'embed'
          }
        : item
    );
    setItems(updatedItems);
    localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
    resetForm();
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
  };

  const resetForm = () => {
    setFormData({
      type: 'photo',
      platform: 'instagram',
      category: 'wedding',
      title: '',
      image: '',
      thumbnailImage: '',
      embedUrl: ''
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolio-items.json';
    link.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          setItems(imported);
          localStorage.setItem('portfolioItems', JSON.stringify(imported));
          alert('Portfolio imported successfully!');
        } catch (error) {
          alert('Error importing file: ' + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Portfolio Admin</h1>
          <p className="text-gray-400">Manage your portfolio items - Add, Edit, Delete</p>
        </div>

        {/* Import/Export */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-8 border border-gray-700">
          <div className="flex gap-4">
            <button
              onClick={exportData}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📥 Export Data
            </button>
            <label className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
              📤 Import Data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEditing ? 'Edit Item' : 'Add New Item'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Type */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
              >
                <option value="photo">Photo</option>
                <option value="embed">Platform Embed</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter item title"
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-300 font-semibold mb-2">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="wedding, corporate, event, etc."
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Platform (if embed) */}
            {formData.type === 'embed' && (
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Platform</label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                >
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="facebook">Facebook</option>
                </select>
              </div>
            )}

            {/* Image URL (for photos) */}
            {formData.type === 'photo' && (
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-semibold mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            )}

            {/* Thumbnail Image URL (for embeds) */}
            {formData.type === 'embed' && (
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-semibold mb-2">Thumbnail Image URL</label>
                <input
                  type="url"
                  name="thumbnailImage"
                  value={formData.thumbnailImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/thumbnail.jpg"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            )}

            {/* Embed URL (for embeds) */}
            {formData.type === 'embed' && (
              <div className="md:col-span-2">
                <label className="block text-gray-300 font-semibold mb-2">Platform URL</label>
                <input
                  type="url"
                  name="embedUrl"
                  value={formData.embedUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                />
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAdd}
                disabled={!formData.title}
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="grid grid-cols-1 gap-6">
          <h2 className="text-2xl font-bold text-white">Portfolio Items ({items.length})</h2>
          {items.map(item => (
            <div key={item.id} className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="bg-orange-600 text-white text-xs px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                    {item.isEmbed && (
                      <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                        {item.platform}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-2">Category: {item.category}</p>
                  {item.image && (
                    <p className="text-gray-500 text-sm truncate">Image: {item.image}</p>
                  )}
                  {item.thumbnailImage && (
                    <p className="text-gray-500 text-sm truncate">Thumbnail: {item.thumbnailImage}</p>
                  )}
                  {item.embedUrl && (
                    <p className="text-gray-500 text-sm truncate">URL: {item.embedUrl}</p>
                  )}
                </div>

                {/* Preview */}
                <div className="md:w-32 h-32 rounded-lg overflow-hidden bg-gray-700 flex-shrink-0">
                  <img
                    src={item.thumbnailImage || item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/128?text=Image+Error';
                    }}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Delete this item?')) {
                        handleDelete(item.id);
                      }
                    }}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioAdmin;

import React, { useState, useEffect } from 'react';
import { LogOut, Edit2, Save, X, Eye, EyeOff } from 'lucide-react';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [adminPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);

  const [activeTab, setActiveTab] = useState('portfolio');
  const [editingCardId, setEditingCardId] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [portfolioTitle, setPortfolioTitle] = useState('');
  const [portfolioCategory, setPortfolioCategory] = useState('');

  const [testimonialText, setTestimonialText] = useState('');
  const [testimonialAuthor, setTestimonialAuthor] = useState('');
  const [testimonialRating, setTestimonialRating] = useState(5);

  // Load data from localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const savedPortfolio = localStorage.getItem('portfolioItems');
      const savedTestimonials = localStorage.getItem('testimonials');
      
      if (savedPortfolio) {
        setPortfolioItems(JSON.parse(savedPortfolio));
      }
      if (savedTestimonials) {
        setTestimonials(JSON.parse(savedTestimonials));
      }
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsLoggedIn(true);
      setPassword('');
    } else {
      alert('Invalid password');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    setEditingCardId(null);
  };

  // Portfolio Functions
  const handlePortfolioSelect = (id) => {
    const item = portfolioItems.find(i => i.id === id);
    if (item) {
      setEditingCardId(id);
      setPortfolioUrl(item.thumbnailImage || item.image || '');
      setPortfolioTitle(item.title);
      setPortfolioCategory(item.category || '');
    }
  };

  const handleUpdatePortfolio = () => {
    if (!portfolioUrl || !portfolioTitle) {
      alert('Please fill in URL and Title');
      return;
    }

    const updatedItems = portfolioItems.map(item =>
      item.id === editingCardId
        ? {
            ...item,
            title: portfolioTitle,
            category: portfolioCategory,
            image: portfolioUrl,
            thumbnailImage: portfolioUrl,
          }
        : item
    );

    setPortfolioItems(updatedItems);
    localStorage.setItem('portfolioItems', JSON.stringify(updatedItems));
    alert('Portfolio item updated successfully!');
    setEditingCardId(null);
    setPortfolioUrl('');
    setPortfolioTitle('');
    setPortfolioCategory('');
  };

  // Testimonial Functions
  const handleTestimonialSelect = (id) => {
    const item = testimonials.find(i => i.id === id);
    if (item) {
      setEditingCardId(id);
      setTestimonialText(item.text);
      setTestimonialAuthor(item.author);
      setTestimonialRating(item.rating || 5);
    }
  };

  const handleUpdateTestimonial = () => {
    if (!testimonialText || !testimonialAuthor) {
      alert('Please fill in text and author name');
      return;
    }

    const updatedTestimonials = testimonials.map(item =>
      item.id === editingCardId
        ? {
            ...item,
            text: testimonialText,
            author: testimonialAuthor,
            rating: testimonialRating,
          }
        : item
    );

    setTestimonials(updatedTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    alert('Testimonial updated successfully!');
    setEditingCardId(null);
    setTestimonialText('');
    setTestimonialAuthor('');
    setTestimonialRating(5);
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
    setPortfolioUrl('');
    setPortfolioTitle('');
    setPortfolioCategory('');
    setTestimonialText('');
    setTestimonialAuthor('');
    setTestimonialRating(5);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800/50 rounded-lg p-8 border border-gray-700 backdrop-blur-sm">
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full p-4">
                <h1 className="text-3xl font-bold">🔐</h1>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white text-center mb-2">Admin Login</h1>
            <p className="text-gray-400 text-center mb-8">Manage Portfolio & Testimonials</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Admin Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Login
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
              <p className="text-gray-300 text-sm">
                <strong>Demo Password:</strong> <code className="bg-gray-800 px-2 py-1 rounded">admin123</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Ceylonix Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setActiveTab('portfolio');
                handleCancelEdit();
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              📸 Portfolio Cards
            </button>
            <button
              onClick={() => {
                setActiveTab('testimonials');
                handleCancelEdit();
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              ⭐ Testimonials
            </button>
          </div>

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Portfolio Cards</h2>

                {/* Card Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {portfolioItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handlePortfolioSelect(item.id)}
                      className={`relative rounded-lg overflow-hidden h-48 transition-all border-2 ${
                        editingCardId === item.id
                          ? 'border-orange-500 ring-2 ring-orange-500'
                          : 'border-gray-600 hover:border-orange-400'
                      }`}
                    >
                      <img
                        src={item.thumbnailImage || item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300?text=Image+Error';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                        <div className="text-white text-left">
                          <p className="font-semibold text-sm">{item.title}</p>
                          <p className="text-xs text-gray-300">{item.category}</p>
                        </div>
                      </div>
                      {editingCardId === item.id && (
                        <div className="absolute inset-0 bg-orange-500/30 flex items-center justify-center">
                          <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            EDITING
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Edit Form */}
                {editingCardId && (
                  <div className="bg-gray-700/50 rounded-lg p-6 border border-orange-500">
                    <h3 className="text-xl font-bold text-white mb-6">Update Selected Card</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">Card Title</label>
                        <input
                          type="text"
                          value={portfolioTitle}
                          onChange={(e) => setPortfolioTitle(e.target.value)}
                          placeholder="e.g., Wedding Ceremony"
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">Category</label>
                        <input
                          type="text"
                          value={portfolioCategory}
                          onChange={(e) => setPortfolioCategory(e.target.value)}
                          placeholder="e.g., wedding, event, corporate"
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">Image URL</label>
                        <input
                          type="url"
                          value={portfolioUrl}
                          onChange={(e) => setPortfolioUrl(e.target.value)}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                        {portfolioUrl && (
                          <div className="mt-3 rounded-lg overflow-hidden border border-gray-600 h-40">
                            <img
                              src={portfolioUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/300?text=Invalid+URL';
                              }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleUpdatePortfolio}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex-1"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Testimonials</h2>

                {/* Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {testimonials.map(item => (
                    <button
                      key={item.id}
                      onClick={() => handleTestimonialSelect(item.id)}
                      className={`rounded-lg overflow-hidden p-4 transition-all border-2 text-left ${
                        editingCardId === item.id
                          ? 'border-orange-500 ring-2 ring-orange-500 bg-gray-700'
                          : 'border-gray-600 hover:border-orange-400 bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-orange-400 text-sm font-semibold">⭐ {item.rating}/5</span>
                        {editingCardId === item.id && (
                          <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            EDITING
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{item.text}</p>
                      <p className="text-orange-400 font-semibold text-sm">- {item.author}</p>
                    </button>
                  ))}
                </div>

                {/* Edit Form */}
                {editingCardId && (
                  <div className="bg-gray-700/50 rounded-lg p-6 border border-orange-500">
                    <h3 className="text-xl font-bold text-white mb-6">Update Selected Testimonial</h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">Client Name</label>
                        <input
                          type="text"
                          value={testimonialAuthor}
                          onChange={(e) => setTestimonialAuthor(e.target.value)}
                          placeholder="Client name"
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">Rating (1-5)</label>
                        <select
                          value={testimonialRating}
                          onChange={(e) => setTestimonialRating(parseInt(e.target.value))}
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                        >
                          <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                          <option value="4">⭐⭐⭐⭐ (4/5)</option>
                          <option value="3">⭐⭐⭐ (3/5)</option>
                          <option value="2">⭐⭐ (2/5)</option>
                          <option value="1">⭐ (1/5)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-300 font-semibold mb-2">Testimonial Text</label>
                        <textarea
                          value={testimonialText}
                          onChange={(e) => setTestimonialText(e.target.value)}
                          placeholder="What did the client say?"
                          rows="4"
                          className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-orange-500"
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={handleUpdateTestimonial}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex-1"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

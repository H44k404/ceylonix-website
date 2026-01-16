import React, { useState } from 'react';
import { ImageCard } from './Card';
import { Play, Camera } from 'lucide-react';

const Gallery = ({
  items = [],
  columns = 3,
  className = '',
  showFilters = true
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const categories = ['all', ...new Set(items.map(item => item.category))];

  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}

      <div className={`grid ${gridCols[columns]} gap-6`}>
        {filteredItems.map(item => (
          <div key={item.id} className="relative group">
            <ImageCard
              image={item.image}
              title={item.title}
              subtitle={item.category}
            />

            {/* Media Type Indicator */}
            <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
              {item.type === 'video' ? (
                <Play className="w-4 h-4 text-white" />
              ) : (
                <Camera className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Hover Overlay with Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex gap-4">
                <button className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors">
                  <Play className="w-5 h-5 text-white" />
                </button>
                <button className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/60 text-lg">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;
import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import ScrollToTopButton from '../components/ScropToTopButton'

const FavoritesPage = () => {
const { favorites, toggleFavorite } = useFavorites();

return (
<div className="favorites-page">
<h1 className="favorites-title">Your Favorite Picks</h1>

{favorites.length === 0 ? (
<div className="empty-favorites">
<p>No favorites yet... Start clicking those hearts!</p>
<span style={{ fontSize: '40px' }}>💔</span>
</div>
) : (
<div className="favorites-grid">
{favorites.map((item) => (
<div key={item._id} className="recommendation-item">
<img
src={item.image}
alt={item.title}
className="recommendation-image"
/>
<div className="recommendation-details">
<h3>{item.title}</h3>
<p className="category">{item.category}</p>
<p>{item.description}</p>
<button
onClick={() => toggleFavorite(item)}
className="heart-btn liked"
>
❤️
</button>
</div>
</div>
))}
</div>
)}
<div className="recommendations-page">
    <ScrollToTopButton />
  </div>
</div>
);
};

export default FavoritesPage;
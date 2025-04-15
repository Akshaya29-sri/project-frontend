

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
const [favorites, setFavorites] = useState(() => {
const stored = localStorage.getItem('favorites');
return stored ? JSON.parse(stored) : [];
});

useEffect(() => {
localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);

const toggleFavorite = (item) => {
setFavorites((prev) => {
const exists = prev.find((fav) => fav._id === item._id);
return exists
? prev.filter((fav) => fav._id !== item._id)
: [...prev, item];
});
};

return (
<FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
{children}
</FavoritesContext.Provider>
);
};

export const useFavorites = () => useContext(FavoritesContext);
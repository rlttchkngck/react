import { useState, useEffect } from 'react';
import { fetchRecipes } from '../api/recipes';

const useFetchRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                setError('Error fetching recipes.');
            } finally {
                setLoading(false);
            }
        };

        getRecipes();
    }, []);

    return { recipes, loading, error };
};

export default useFetchRecipes;
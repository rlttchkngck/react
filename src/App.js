import React, { useState, useEffect } from 'react';
import NewRecipeModal from './components/NewRecipeModal/NewRecipeModal';
import RecipeList from './components/RecipeList/RecipeList';
import RecipeModal from './components/RecipeModal/RecipeModal';
import { fetchRecipes, submitRecipe } from './api/recipes';
import './App.css';

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const loadRecipes = async () => {
            try {
                const data = await fetchRecipes();
                setRecipes(data);
            } catch (error) {
                console.error('Error loading recipes:', error);
            }
        };
        loadRecipes();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitRecipe = async (newRecipe) => {
        try {
            const savedRecipe = await submitRecipe(newRecipe);
            setRecipes([...recipes, savedRecipe]);
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseRecipeModal = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className="App">
            <div className="header">
                <button onClick={handleOpenModal}>Submit New Recipe</button>
            </div>
            <div className="content">
                <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
            </div>
            {isModalOpen && (
                <NewRecipeModal onClose={handleCloseModal} onSubmit={handleSubmitRecipe} />
            )}
            {selectedRecipe && (
                <RecipeModal recipe={selectedRecipe} onClose={handleCloseRecipeModal} />
            )}
        </div>
    );
};

export default App;
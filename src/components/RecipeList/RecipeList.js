import React from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes, onRecipeClick }) => {
    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe.id} onClick={() => onRecipeClick(recipe)}>
                        <span className="eye-icon">&#x1F372;</span>
                        <span className="recipe-title">{recipe.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
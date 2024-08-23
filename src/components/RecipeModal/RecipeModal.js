import React, { useEffect } from 'react';
import { formatText } from '../../utils/formatText';
import './RecipeModal.css';

const RecipeModal = ({ recipe, onClose }) => {
    const handleBackgroundClick = (e) => {
        if (e.target.className === 'modal') {
            onClose();
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <div className="modal" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{recipe.title}</h2>
                <p><strong>Ingredients:</strong></p>
                <p>{formatText(recipe.ingredients)}</p>
                <p><strong>Instructions:</strong></p>
                <p>{formatText(recipe.instructions)}</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeModal;
import React, { useState, useEffect } from 'react';
import { submitRecipe } from '../../api/recipes';
import './NewRecipeModal.css';

const NewRecipeModal = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditable, setIsEditable] = useState(true);

    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        setShowMessage(false);

        // Validation
        if (!title || !ingredients || !instructions) {
            setErrorMessage('All fields are required.');
            setShowMessage(true);
            return;
        }
        if (title.length > 255) {
            setErrorMessage('Title must be 255 characters or less.');
            setShowMessage(true);
            return;
        }

        const newRecipe = { title, ingredients, instructions };
        try {
            const response = await submitRecipe(newRecipe);
            setSuccessMessage('Your recipe will be published after review.');
            setIsEditable(false);
            setShowMessage(true);
        } catch (error) {
            setErrorMessage('Error submitting recipe: ' + error.message);
            setShowMessage(true);
        }
    };

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
                <h2>Submit New Recipe</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Recipe Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={255}
                        disabled={!isEditable}
                    />
                    <textarea
                        placeholder="Ingredients"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        disabled={!isEditable}
                    />
                    <textarea
                        placeholder="Instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        disabled={!isEditable}
                    />
                </div>
                <div className="modal-buttons">
                    {isEditable && <button onClick={handleSubmit}>Submit</button>}
                    <button onClick={onClose}>Close</button>
                </div>
                {showMessage && successMessage && <p className="review-message">{successMessage}</p>}
                {showMessage && errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default NewRecipeModal;
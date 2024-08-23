import { useState } from 'react';
import { submitRecipe } from '../api/recipes';

const useSubmitRecipe = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (recipe) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await submitRecipe(recipe);
            return true;
        } catch (err) {
            setError('Error submitting recipe.');
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return { handleSubmit, isSubmitting, error };
};

export default useSubmitRecipe;
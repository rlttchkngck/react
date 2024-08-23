import axiosInstance from './axiosInstance';

export const fetchRecipes = async () => {
  try {
    const response = await axiosInstance.get('recipes/');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const submitRecipe = async (recipe) => {
  try {
    const response = await axiosInstance.post('recipes/create/', recipe);
    return response.data;
  } catch (error) {
    console.error('Error submitting recipe:', error);
    throw error;
  }
};
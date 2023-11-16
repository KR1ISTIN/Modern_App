import 'regenerator-runtime';
import { API_URL } from './config.js';
import {getJSON} from './helpers.js'

export const state = {
    recipe: {}
};

// loadRecipe is going to change our state object 
// then the state will contain the recipe at which then the controller will take the recipe out of there 
export const loadRecipe = async function(id) {
    try{
        // needs to be await since we are in a async function awaiting a promise from the getJSON async function 
        const data = await getJSON(`${API_URL}/${id}`)
        
     
         // obj destructuring bc data.data has a proptery name recipe 
         let {recipe} = data.data;
         // creating a new obj with data
         state.recipe = {
           id: recipe.id,
           title: recipe.title,
           publisher: recipe.publisher,
           sourceUrl: recipe.source_url,
           image: recipe.image_url,
           servings: recipe.servings,
           cookingTime: recipe.cooking_time,
           ingredients: recipe.ingredients
         };
         console.log(state.recipe);

    } catch (err) {
        console.error(err);
    }    
}

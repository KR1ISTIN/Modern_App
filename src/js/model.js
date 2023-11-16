import 'regenerator-runtime';
import { API_URL } from './config.js';

export const state = {
    recipe: {}
};

// loadRecipe is going to change our state object 
// then the state will contain the recipe at which then the controller will take the recipe out of there 
export const loadRecipe = async function(id) {
    try{
         // res is going to return a promise 
         const res = await fetch(`${API_URL}/${id}`);
    
         // .json() is going to return another promise 
         const data = await res.json();
         console.log(res, data);
     
         if(!res.ok) throw new Error(`${data.message} (${res.status})`);
     
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
        console.log(err)
    }
       
}

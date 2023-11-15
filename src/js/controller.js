import * as model from './model.js';
import recipeView from './views/recipeView.js';


import 'core-js/stable'; // polyfilling everything else lines 2/3 are so older browsers can use this app
import 'regenerator-runtime'; //polyfilling async await


const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



// creating a async function so that the function can run asyncronously 
const controlRecipes = async function() {
  // wrap in try and catch to help with err handling 
  try {
    const id = window.location.hash.slice(1);
   
    recipeView.renderSpinner();

    // 1) LOAD RECIPE 
    //(this is a async function so it will return a promise, so we need to await for the promise) 
    // going to store info into the state object 
    await model.loadRecipe(id);
 
    // 2) Rendering Recipe view
    // this will now take the object being stored in step 1 and pass it to the render method
    recipeView.render(model.state.recipe);

  }
  catch (err) {
    console.log(err);
  }
};

 
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));

// when the id changes for a recipe 
// however these two event listeners are the same therefore creating an array with the listers and looping
// over will make for cleaner code
//window.addEventListener('hashchange', controlRecipes);
// event will fire off when page has finished loading 
//window.addEventListener('load', controlRecipes);

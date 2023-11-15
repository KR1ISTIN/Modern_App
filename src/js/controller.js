import * as model from './model.js';
import recipeView from './views/recipeView.js';

import icons from 'url:../img/icons.svg'; // how you write the path with using Parcel 2
import 'core-js/stable'; // polyfilling everything else lines 2/3 are so older browsers can use this app
import 'regenerator-runtime'; //polyfilling async await


const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// spinner while loading recipes  
const renderSpinner = function(parentElement) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
  `;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

// creating a async function so that the function can run asyncronously 
const showRecipe = async function() {
  // wrap in try and catch to help with err handling 
  try {
    const id = window.location.hash.slice(1);
    // passing recipeContainer to func bc we want the spinner to render after its parent 
    renderSpinner(recipeContainer);

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

 
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));

// when the id changes for a recipe 
// however these two event listeners are the same therefore creating an array with the listers and looping
// over will make for cleaner code
//window.addEventListener('hashchange', showRecipe);
// event will fire off when page has finished loading 
//window.addEventListener('load', showRecipe);

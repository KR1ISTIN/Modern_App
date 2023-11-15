import * as model from '.model.js';

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

    // 1) LOAD RECIPE (this is a async function so it will return a promise, so we need to await for the promise)
    await model.loadRecipe(id);



    // used map function to map over the ingreds with will great a array with each ingred containing the template, .join() was used...
    // so that the the list of ingreds would be rendered, without .join() only an array would be evaluated which is not cannot be executed for the html doc 
    const markup = `
    <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>

      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round">
        <svg class="">
          <use href="${icons}#icon-bookmark-fill"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(ing => {
        return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
        `
      }).join('')}
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;

    // setting to empy string to get rid of any messages so it will not pop up with the recipes
    recipeContainer.innerHTML = '';

    // recipeContainer is the parent element, so we want to insert markup variable  AFTER 
    recipeContainer.insertAdjacentHTML("afterbegin", markup);



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

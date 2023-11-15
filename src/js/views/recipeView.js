class RecipeView {
    // private field on the classes, each view will have this parentElement property 
    #parentElement = document.querySelector('.recipe');
    #data

    render(data) {
        // the data will now be stored into #data from the loadRecipe func
        this.#data = data;

        // calls to return html str
        const markup = this.#generateMarkup
  
        // setting to empy string to get rid of any messages so it will not pop up with the recipes
        recipeContainer.innerHTML = '';
        // recipeContainer is the parent element, so we want to insert markup variable  AFTER 
        recipeContainer.insertAdjacentHTML("afterbegin", markup);
    }

    // returns a html string from data saved in the render method above
    #generateMarkup() {
    // used map function to map over the ingreds with will great a array with each ingred containing the template, .join() was used...
    // so that the the list of ingreds would be rendered, without .join() only an array would be evaluated which is not cannot be executed for the html doc 
    return `
    <figure class="recipe__fig">
      <img src="${this.#data.image}" alt="${this.#data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this.#data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>

      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this.#data.servings}</span>
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
      ${this.#data.ingredients.map(ing => {
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
        <span class="recipe__publisher">${this.#data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
    }
}

export default new RecipeView();


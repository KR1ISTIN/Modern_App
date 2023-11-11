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

// creating a async function so that the function can run asyncronously 
const showRecipe = async function() {
  // wrap in try and catch to help with err handling 
  try {
    // res is going to return a promise 
    const res = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
    
    // .json() is going to return another promise 
    const data = await res.json();
    console.log(res, data);

    if(!res.ok) throw new Error(`${data.message} (${res.status})`);

    // obj destructuring bc data.data has a proptery name recipe 
    let {recipe} = data.data;
    // creating a new obj with data
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredints: recipe.ingredints
    };
    console.log(recipe);
  }
  catch (err) {
    console.log(err);
  }
};

showRecipe();

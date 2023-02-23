import * as model from './model.js';
import recipeView from './recipeView.js'
import searchView from './searchView.js';
import resultsView from './resultsView.js';
import paginationView from './paginationView.js';
import bookmarksView from './bookmarksView.js';
import addRecipeView from './addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './recipeView.js';
import { async } from 'regenerator-runtime';


 // if(module.hot){
 //   module.hot.accept();
 // }

const controlRecipes = async function(){

  try{
    
    const id = window.location.hash.slice(1);
   
    if(!id) return;
    recipeView.renderSpinner();
   
  // 0 update results view to mark selected search result
 
  resultsView.render(model.getSearchResultPage());

  // updating the bookmarksView

   bookmarksView.update(model.state.bookmarks); 

  // rendering recipe 1

    await model.loadRecipe(id);
   
   // rendering recipe 2

    recipeView.render(model.state.recipe);


   
  } catch (err){
    recipeView.renderError (); 
    console.err(err);
  };
};

const controlSearchResults = async function() {

  try{

   resultsView.renderSpinner(); 
   console.log(resultsView);

  // get search query

  const query = searchView.getQuery();
  if(!query)return;

//  2 load search result

   await model.loadSearchResults(query);

  //  3 render results

  //  resultsView.render(model.state.search.results)
  resultsView.render(model.getSearchResultPage());


  // 4 render initial pagination buttons
  paginationView.render(model.state.search);
  }
  catch(err){
    console.log(err);
  }
}

const controlPagination = function(gotToPage){
  // render new results
  resultsView.render(model.getSearchResultPage(gotToPage));


  // 4 render new pagination buttons
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  //  update the recipe servings in the state
  model.updateServings(newServings);
  


  // update the recipe in view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const  controlAddBookmark = function(){

  // 1 add / remove bookmark

  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

   
  // 2 update recipeView

  recipeView.update(model.state.recipe)

  // 3 render bookmarks
  bookmarksView.render(model.state.bookmarks)
};

const controlBookmarks = function() {
    bookmarksView.render(model.state.bookmarks)
};

const controlAddRecipe = async function(newRecipe) {
 try{
    await model.uploadRecipe(newRecipe);
 }  catch(err){
    console.error('🔥', err);
    addRecipeView.renderError(err.message);
 }

};

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults); 
  paginationView.addHandlerClink(controlPagination );
  addRecipeView.addHandlerUpload(controlAddRecipe);
  
}

init();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
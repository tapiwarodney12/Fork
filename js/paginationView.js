import View from './View';
import icons from '../../src/img/icons.svg';



class paginationView extends View {
  _parentElement = document.querySelector('.pagination');


addHandlerClink(handler){
    this._parentElement.addEventListener('click', function(e){
    const btn = e.target.closest('.btn--inline');
    if(!btn) return;

    const gotToPage = +btn.dataset.goto;
    console.log(gotToPage);
    handler(gotToPage);
    });
}


  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
    this._data.results.length / this._data.resultsPerPage
    );
   
// page 1 and there are others pages

  if(curPage === 1 && numPages > 1 ){
     return `
     <button data-goto="${curPage +1}" class="btn--inline pagination__btn--next">
        <span>Page${curPage +1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
     `
  }

    // last page
 if(curPage === numPages && numPages > 1){
    return `
     <button data-goto="${curPage -1}"  class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
          <use href="${icons }#icon-arrow-left"></use>
       </svg>
      <span>Page ${curPage -1}</span>
   </button>
    `
 }

//  other page

 if(curPage < numPages){
    return `
    <button data-goto="${curPage -1}"  class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
         <use href="${icons }#icon-arrow-left"></use>
      </svg>
     <span>Page ${curPage -1}</span>
  </button>

   <button data-goto="${curPage +1}"  class="btn--inline pagination__btn--next">
     <span>Page${curPage +1}</span>
     <svg class="search__icon">
       <use href="${icons}#icon-arrow-right"></use>
   </svg>
 </button>
   `
 }
    // Page 1 there are no other pages

    return '';
  }
} 

export default new paginationView();
import View from './View';
import previewView from './previewView.js';
import icons from '../../src/img/icons.svg';


 
class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. F ind a nice recipe and bookmark it;;';
  _message = '';

  addHandlerRender (handler){
    window.addEventListener('load', handler);
  }

  _generateMarkup() {

    return this._data.map(bookmark => previewView.render(bookmark, false)).join('');
  }
}

export default new bookmarksView();
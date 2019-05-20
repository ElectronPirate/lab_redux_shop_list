const { createStore} = require('redux');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded');

  const listReducer = (state = [], action) => {
    switch(action.type) {
      case 'ADD_ITEM':
        const newState = [...state, action.newItem];
        return newState;
      case 'DEL_ITEM':
        const delState = state.filter(item => item != action.delItem)
        return delState;
      default:
        return state;
    }
  }

  const store = createStore(listReducer);

  const addForm = document.querySelector('form#shopping-list-form');
  addForm.addEventListener('submit', () => {
    event.preventDefault();
    store.dispatch({type: 'ADD_ITEM', newItem: event.target.item.value});
  });

  store.subscribe(() => {
    render();
  });

  const render = () => {
    const shoppingList = document.querySelector('ul#shopping-list');
    shoppingList.innerHTML = '';
    const listItems = store.getState()
    listItems.forEach((item) => {
      const itemEl = document.createElement('li');
      itemEl.textContent = item;
      itemEl.id = item;
      itemEl.addEventListener('click', () => {
        store.dispatch({type: 'DEL_ITEM', delItem: event.target.id})
      })
      shoppingList.appendChild(itemEl);
    });

  };



})

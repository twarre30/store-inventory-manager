import { Item, update_item_quality } from './inventory.js';

const getNewItems = () => [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Conjured Mana Cake', 3, 6),
];

const getItemRowHtml = ({ name, sell_in: sellIn, quality }) => {
  const itemHtml = document.createElement('tr');
  itemHtml.innerHTML += `<td>${name}</td>`;
  itemHtml.innerHTML += `<td>${quality}</td>`;
  itemHtml.innerHTML += `<td>${sellIn}</td>`;
  return itemHtml;
};

const renderItemsOnHomepage = (item) => {
  const elementItemsList = document.querySelector('#items > tbody');
  elementItemsList.innerHTML = null;
  item.forEach((element) => {
    const itemHtml = getItemRowHtml(element);
    elementItemsList.append(itemHtml);
  });
};

const bindEventListenToUpdateButton = (item) => {
  const updateButton = document.getElementById('update-items-button');
  updateButton.addEventListener('click', (event) => {
    event.preventDefault();
    update_item_quality(item);
    renderItemsOnHomepage(item);
  });
};

const showItemsOnHomePage = () => {
  const item = getNewItems();
  renderItemsOnHomepage(item);
  bindEventListenToUpdateButton(item);
};

showItemsOnHomePage();
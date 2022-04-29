const { update } = require("lodash");

const $body = document.querySelector("body")
const $form = document.querySelector("form")
const $button = document.querySelector("button")

let item = [{
  name: "+5 Dexerity Vest",
  sell_in: 10,
  quality: 20,
  category: "none"
}, {
  name: "Aged Brie",
  sell_in: 2,
  quality: 0,
  category: "Aged Brie"
}, {
  name: "Elixir of the Mongoose",
  sell_in: 5,
  quality: 7,
  category: "none"
}, {
  name: "Sulfuras, Hand of Ragnaros",
  sell_in: 0,
  quality: 80,
  category: "Sulfuras"
}, {
  name: "Backstage passes to a TAFKAL80ETC concert",
  sell_in: 15,
  quality: 20,
  category: "Backstage pass"
}, {
  name: "Conjured Mana Cake",
  sell_in: 3,
  quality: 6,
  category: "Conjured"

}]

const clamp = (min, max) => (number) => Math.max(min, Math.min(number, max));
const clampStandardQuality = (number) => clamp(0, 50)(number);

function sulfuras_update_strategy(item) {
  item.sell_in = item.sell_in = 0;
  item.quality = item.quality = 80;
}

function conjured_update_strategy(item) {
  item.sell_in = item.sell_in - 1;
  const qualityReduction = item.sell_in < 0 ? 4 : 2;
  item.quality = clampStandardQuality(item.quality - qualityReduction);
}

function brie_update_strategy(item) {
  item.sell_in = item.sell_in - 1;
  const qualityIncrease = item.sell_in < 0 ? 2 : 1;
  item.quality = clampStandardQuality(item.quality + qualityIncrease);
}

function backstage_pass_update_strategy(item) {
  const { sell_in, quality } = item;
  let qualityUpdate;
  if (sell_in <= 0) qualityUpdate = 0;
  else if (sell_in > 10) qualityUpdate = quality + 1;
  else {
    const qualityIncrease = (sell_in <= 5) ? 3 : 2
    qualityUpdate = quality + qualityIncrease;
  }
  item.quality = clampStandardQuality(qualityUpdate)
  item.sell_in = item.sell_in - 1;
}

function default_update_strategy(item) {
  item.sell_in = item.sell_in - 1;
  const qualityDecrease = (item.sell_in < 0) ? 2 : 1;
  item.quality = clampStandardQuality(item.quality - qualityDecrease)
}

const strategies = {
  "Conjured": conjured_update_strategy,
  "Sulfuras": sulfuras_update_strategy,
  "Aged Brie": brie_update_strategy,
  "Backstage pass": backstage_pass_update_strategy,
}

function updateQuality(item) {
  const update_strategy = strategies = strategies[item.category] || default_update_strategy;
  update_strategy(item);
}

updateQuality(item)

function itemList(item) {
  const $rowItems = document.createElement('tr');
  $rowItems.innerHTML = `
    <td>${item.name}</td>
    <td>${item.quality}</td>
    <td>${item.sell_in}</td>
    `
  item.map(item => {
    const $listItems = document.querySelector('tbody');
    $listItems.innerHTML = null;
    item.forEach(($listItems) => {
      $listItems.append($rowItems);

    })
  });


  $button.addEventListener('click', (event) => {
    event.preventDefault();
    updateQuality(item);
    itemList(item);
  });
};

itemList(item)

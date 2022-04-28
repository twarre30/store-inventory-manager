// Item constructor. 
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

const clamp = (min, max) => (number) => Math.max(min, Math.min(number, max));
const clampStandardQuality = (number) => clamp(0, 50)(number);


function sulfuras_update_strategy() { }

function conjured_update_strategy(item) {
  item.sell_in = item.sell_in - 1;
  const qualityReduction = item.sell_in < 0 ? 4 : 2;
  item.quality = clampStandardQuality(iten.quality - qualityReduction);
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
  "Sulfuras, Hand of Ragnaros": sulfuras_update_strategy,
  "Aged Brie": brie_update_strategy,
  "Backstage passes to a TAFKAL80ETC concert": backstage_pass_update_strategy,
}

export function update_item_quality(item) {
  const update_strategy = strategies[item.name] || default_update_strategy;
  update_strategy(item);
  console.log(update_item_quality)
}

/*
updateQuality(items);

export function updateQuality(items) {
  for (let index = 0; index < items.length; index++) {
    if (items[index].name != 'Aged Brie' && items[index].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[index].quality > 0) {
        if (items[index].name != 'Sulfuras, Hand of Ragnaros') {
          items[index].quality = items[index].quality - 1
        } 
      }
    } else {
      if (items[index].quality < 50) {
        items[index].quality = items[index].quality + 1
        if (items[index].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[index].sell_in < 11) {
            if (items[index].quality < 50) {
              items[index].quality = items[index].quality + 1
            }
          }
          if (items[index].sell_in < 6) {
            if (items[index].quality < 50) {
              items[index].quality = items[index].quality + 1
            }
          }
        }
      }
    }
    if (items[index].name != 'Sulfuras, Hand of Ragnaros') {
      items[index].sell_in = items[index].sell_in - 1;
    }
    if (items[index].sell_in < 0) {
      if (items[index].name != 'Aged Brie') {
        if (items[index].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[index].quality > 0) {
            if (items[index].name != 'Sulfuras, Hand of Ragnaros') {
              items[index].quality = items[index].quality - 1
            }
          }
        } else {
          items[index].quality = items[index].quality - items[index].quality
        }
      } else {
        if (items[index].quality < 50) {
          items[index].quality = items[index].quality + 1
        } 
      }
    }
  }
}
*/
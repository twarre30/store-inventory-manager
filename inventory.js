// Item constructor. DO NOT MODIFY OR THE GOBLIN WILL EAT YOU!
export function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

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
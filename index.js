const main = document.querySelector("main")
const $form = document.querySelector("form")
const button = document.querySelector("button")
let inventory = [{
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
  category: "Backstage passes"
}, {
  name: "Conjured Mana Cake",
  sell_in: 3,
  quality: 6,
  category: "Conjured"
}]
showItems(inventory)

addEventListener("submit", (event) => {
  event.preventDefault()
  const formData = new FormData(event.target)
  const item = {
    name: formData.get("item"),
    sell_in: +formData.get("sell_in"),
    quality: +formData.get("quality"),
    category: "none"
  }
  inventory = [...inventory, item]
  parseCategory(item)
  checkQuality(item)
  showItems(item)
})

button.addEventListener("click", event => {
  event.preventDefault()
  inventory.forEach(item => {
    degradeQuality(item)
    checkQuality(item)
    updateSellIn(item)
    showItems(item)
  })
})

function parseCategory(item) {
  if (item.name.includes("Aged Brie")) {
    item.category = "Aged Brie"
  } else if (item.name.includes("Sulfuras")) {
    item.category = "Sulfuras"
  } else if (item.name.includes("Backstage")) {
    item.category = "Backstage passes"
  } else if (item.name.includes("Conjured")) {
    item.category = "Conjured"
  } else {
    item.category = "none"
  }
  return item
}

function showItems(item) {
  main.innerHTML = ``
  inventory.map(item => {
    const $itemList = document.createElement("div")
    $itemList.classList.add("list")
    $itemList.innerHTML = ` 
            <p>${item.name}</p>
            <p>${item.sell_in}</p>
            <p>${item.quality}</p>
            `
    return $itemList
  }).forEach(($itemList) => {
    main.append($itemList)

  })
}

function degradeQuality(item) {
  if (item.category === "Sulfuras") {
    return item.quality = 80
  } else if (item.category === "Conjured" && item.sell_in === 0) {
    return item.quality = 0
  } else if (item.category === "Conjured") {
    return item.quality -= 2
  } else if (item.category === "Backstage passes" && item.sell_in === 0) {
    return item.quality = 0
  } else if (item.category === "Backstage passes" && item.sell_in > 10) {
    return item.quality = item.quality + 1
  } else if (item.category === "Backstage passes" && item.sell_in <= 10 && item.sell_in > 5) {
    return item.quality = item.quality + 2
  } else if (item.category === "Backstage passes" && item.sell_in <= 5) {
    return item.quality = item.quality + 3
  } else if (item.category === "Aged Brie") {
    return item.quality = item.quality + 1
  } else if (item.sell_in <= 0) {
    return item.quality -= 2
  } else {
    return item.quality -= 1
  }

}

function updateSellIn(item) {
  if (item.category === "Sulfuras") {
    return item.sell_in = 0
  } else if (item.sell_in > 0) {
    return item.sell_in = item.sell_in - 1
  } else {
    return item.sell_in = 0
  }
}

function checkQuality(item) {
  if (item.category === "Sulfuras") {
    return item.quality = 80
  } else if (item.category === "Aged Brie" && item.quality < 50) {
    return item.quality
  } else if (item.category === "Backstage passes" && item.quality < 50) {
    return item.quality
  } else if (item.quality > 50) {
    return item.quality = 50
  } else if (item.quality <= 0) {
    return item.quality = 0
  } else {
    return item.quality
  }
}
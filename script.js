import { menuArray } from "./data.js";

let itemsOrdered = [];
let totalPrice = 0;

const getMenuItems = () => {
  let menuItem = "";

  menuArray.forEach((item) => {
    let ingredients = "";
    item.ingredients.forEach((ingredient) => {
      ingredients += `${ingredient} `;
    });
    menuItem += `
            <div class="menu-item">
                <div class="primary-info">
                    <img src=${item.avatar} alt=${item.name} class="avatar">
                    <div class="details">
                        <h2 class="item-name">${item.name}</h2>
                        <p class="item-ingredients">${ingredients}</p>
                        <p class="item-price">$${item.price}</p>
                    </div>
                </div>
                <button class="order-btn" data-id=${item.id}>+</button>
            </div>
        `;
  });
  return menuItem;
};

// EVENT LISTENERS
document.addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    handlePlaceOrder(e.target.dataset.id);
  } else if (e.target.dataset.remove) {
    handleRemoveItem(e.target.dataset.remove);
  } else if (e.target.dataset.completeOrder) {
    handleCompleteOrder();
  } else if (e.target.dataset.payment) {
    handleMakePayment();
  }
});

// ADD SELECTED ITEM TP ORDER
const handlePlaceOrder = (foodItemId) => {
  const targetFoodItem = menuArray.filter((item) => {
    return Number(item.id) === Number(foodItemId);
  })[0];
  addtoCart(targetFoodItem);
  if (itemsOrdered.length > 0) {
    document.querySelector("#order").style.display = "block";
  }
  renderOrder();
};

// ADDS SELECTED ITEM TO START OF ORDER LIST
const addtoCart = (orderItem) => {
  itemsOrdered.unshift(orderItem);
};

//CALCULATES TOTAL ORDER PRICE AND RENDERS ALL DETAILS ABOUT ORDERS TO PAGE
const handleOrder = () => {
  let foodOrdered = "";
  let priceList = itemsOrdered.map((item) => item.price);

  if (itemsOrdered.length > 0) {
    totalPrice = priceList.reduce((accumulator, currentValue, totalPrice) => {
      return accumulator + currentValue;
    });
  }

  itemsOrdered.forEach((item) => {
    foodOrdered += ` 
            <div class="ordered-item">
                <div class="primary-info">
                    <p class="item-name">${item.name}</p>
                    <button class="remove-item-btn" data-remove=${item.id}>Remove</button>
                </div>
                <p class="item-price">$${item.price}</p>
            </div>
        `;
    document.querySelector(".total-price").textContent = `$${totalPrice}`;
  });
  return foodOrdered;
};

//REMOVES ITEM FROM ORDER LIST
const handleRemoveItem = (itemToBeRemoved) => {
  const targetItem = itemsOrdered.filter((item) => {
    return Number(item.id) === Number(itemToBeRemoved);
  })[0];

  itemsOrdered.splice(itemsOrdered.indexOf(targetItem), 1);

  if (itemsOrdered.length === 0) {
    document.querySelector("#order").style.display = "none";
  }
  renderOrder();
};

//REVEALS MODAL TO ENTER DEBIT CARD DETAILS
const handleCompleteOrder = () => {
  document.querySelector("#modal").classList.remove("toggle-modal");
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const handleMakePayment = () => {
  const customerName = document.querySelector("#customer-name").value;
  document.querySelector(".customer").textContent = customerName;
  window.scrollTo({ bottom: 0, behavior: "smooth" });
  document.querySelector("#order").style.display = "none";
  document.querySelector("#modal").classList.add("toggle-modal");
  document.querySelector(".acknowledgement").style.display = "block";
};

const render = () => {
  document.querySelector("#menu-items").innerHTML = getMenuItems();
};

const renderOrder = () => {
  document.querySelector(".ordered-list").innerHTML = handleOrder();
};

render();
// renderOrder();

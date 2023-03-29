// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];
// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var totalPrice = 0;
var totalItems = 0;
var totalGroceryItems = 0;

var productsTable = document.querySelector("#cart_list");

// Exercise 2
function cleanCart() {
  cartList = [];
  cart = [];

  totalPrice = 0;
  totalItems = 0;
  totalGroceryItems = 0;

  document.querySelector("#total_price").innerHTML = totalPrice;
  document.querySelector("#count_product").innerHTML = totalItems;

  _emptyCartTable();
}

function _emptyCartTable() {
  while (productsTable.hasChildNodes()) {
    productsTable.removeChild(productsTable.firstChild);
  }
}

// Exercise 6
function _printCart() {
  //document.querySelector('#total_price').innerHTML = totalPrice;
  cart.forEach((product) => {
    var newProductRow = productsTable.insertRow(-1);
    newProductRow.insertCell(0).innerHTML = product.name;
    newProductRow.insertCell(1).innerHTML = "$" + product.price;
    newProductRow.insertCell(2).innerHTML = product.quantity;
    newProductRow.insertCell(3).innerHTML = "$" + product.subtotalWithDiscount;
    /*
    var removeButton = document.createElement('input');
    removeButton.type = "button";
    removeButton.className = "btn";
    removeButton.value = "-";  
    newProductRow.insertCell(4).appendChild(removeButton);
    */
    newProductRow.insertCell(4).innerHTML = "<button id='btnDelete' onclick='deleteProduct()'>Delete</button>";
  });
}

function deleteProduct() {
  console.log('deleting');
}

// ** Nivell II **
// In order to maintain the previus code for reviews I have created/implemented some new methods: addToCart(), calculateTotals() and  applyPromotions()
// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.

  // To check whether the product exists in our products list
  let productSelected = products.find((product) => product.id === id);
  if (productSelected === undefined) {
    alert("An error has been produced with the selected product!");
    return;
  }

  if (productSelected.type === "grocery") totalGroceryItems++;

  let productIndex = cart.findIndex((product) => product.id === id);
  if (productIndex === -1) {
    productSelected.quantity = 1;
    productSelected.subtotal = productSelected.price;
    productSelected.subtotalWithDiscount = productSelected.price;
    cart.push(productSelected);
  } else {
    cart[productIndex].quantity ++;
    cart[productIndex].subtotal = cart[productIndex].price * cart[productIndex].quantity;
    productSelected.subtotalWithDiscount += _applyPromotions(productIndex);
  }

  totalItems ++;  
  document.querySelector("#count_product").innerHTML = totalItems;
  document.querySelector("#total_price").innerHTML = _calculateTotal();
}

function _applyPromotions(productIndex) {
  let promotedPrice = cart[productIndex].price;  
  if (cart[productIndex].type === "grocery" && totalGroceryItems > 9) {
    promotedPrice = cart[productIndex].price - cart[productIndex].price * (2 / 3);
  }

  if (cart[productIndex].offer !== undefined &&
    cart[productIndex].quantity >= cart[productIndex].offer.number) {
      promotedPrice = cart[productIndex].price -
                          cart[productIndex].price * (cart[productIndex].offer.percent / 100);
  }

  return promotedPrice;
}

function _calculateTotal() {
  return cart.reduce((accumulator, product) => accumulator + product.subtotalWithDiscount, 0);
}

// Exercise 8
function _removeFromCart(id) {
  // 1. Loop for to the array products to get the item to remove to cart
  // 2. Remove found product to the cartList array
  let productIndex = cart.findIndex((product) => product.id === id);
  if (cart[productIndex].type === "grocery") totalGroceryItems --;
  
  if (cart[productIndex].quantity > 0) {
    cart[productIndex].quantity --;
    cart[productIndex].subtotalWithDiscount -= _applyPromotions(productIndex);
    cart[productIndex].subtotal -= cart[productIndex].price;
    document.querySelector("#total_price").innerHTML = _calculateTotal();
    totalItems --;  
    document.querySelector("#count_product").innerHTML = totalItems;  
  }

}

function open_modal() {
  console.log("open_modal");
  _emptyCartTable();
  _printCart();
}

/*
// Exercise 1
function buy(id) {
  let productSelected = {};
  // 1. Loop for to the array products to get the item to add to cart
  // products.forEach(product => product.id === id ? productSelected = product : '');
  // productSelected = products.filter(product => product.id === id)[0];
  productSelected = products.find((product) => product.id === id);

  // 2. Add found product to the cartList array
  // cartList.unshift(productSelected); // Adding item add at beginnig of the array
  cartList.push(productSelected);
  totalItems.innerHTML = cartList.length;

  calculateTotal();
}

// Exercise 3
function calculateTotal() {
  totalPrice = cartList.reduce(
    (accumulator, product) => accumulator + product.price,
    0
  );
}

// Exercise 4
function generateCart(cartList) {
  let cartToCompute = [];
  let groceryItems = 0;

  cartList.forEach((product) => {

    if (cartToCompute.find((item) => item.id === product.id)) {
      product.quantity++;
    } else {
      product.quantity = 1;
      product.subtotalWithDiscount = 0;
      product.subtotal = product.quantity * product.price;
      cartToCompute.push(product);
    }
    
    if (product.type === "grocery") groceryItems++;
  });

  applyPromotionsCart(cartToCompute, groceryItems > 9);
}

// Exercise 5
function applyPromotionsCart(cartToCompute, isGroceryDiscount) {
  cartToCompute.forEach((product) => {

    if (product.type === "grocery" && isGroceryDiscount) {
      product.subtotalWithDiscount = product.subtotal - product.subtotal * (2 / 3);
      cart.push(product);
      return;
    }

    if (product.offer !== undefined && product.quantity >= product.offer.number) {
      product.subtotalWithDiscount = product.subtotal - product.subtotal * (product.offer.percent / 100);
      cart.push(product);
      return;
    }
    product.subtotalWithDiscount = product.subtotal;
    cart.push(product);
  });

}
*/

// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var totalPrice = 0;
var totalItems = document.querySelector('#count_product');
var productsTable = document.querySelector('#cart_list'); 

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

// Exercise 2
function cleanCart() {
  cartList = [];
  cart = [];
  totalPrice = 0;
  totalItems.innerHTML = 0;    
  //productsTable.remove(); 
  document.querySelector('#total_price').innerHTML = 0;
  
  while(productsTable.hasChildNodes()){
    productsTable.removeChild(productsTable.firstChild);
  }
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
    console.log(`cartList: ${product.name}`);
    if (cartToCompute.find((item) => item.id === product.id)) {
      product.quantity++;
    } else {
      product.quantity = 1;
      product.subtotalWithDiscount = 0;      
      cartToCompute.push(product);
    }
    product.subtotal = product.quantity * product.price;
    if (product.type === "grocery") groceryItems++;
  });

  applyPromotionsCart(cartToCompute, groceryItems > 9);
}

// Exercise 5
function applyPromotionsCart(cartToCompute, isGroceryDiscount) {
  cartToCompute.forEach((product) => {
    console.log(`cartToCompute: ${product.name}`);
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

// Exercise 6
function printCart() {
  document.querySelector('#total_price').innerHTML = totalPrice;
  cart.forEach(product => {
    var newProductRow = productsTable.insertRow(-1);
    newProductRow.insertCell(0).innerHTML = product.name;
    newProductRow.insertCell(1).innerHTML = '$' + product.price;
    newProductRow.insertCell(2).innerHTML = product.quantity;
    newProductRow.insertCell(3).innerHTML = '$' + product.subtotalWithDiscount;  
  });  
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
  // Refactor previous code in order to simplify it
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array or update its quantity in case it has been added previously.
  console.log(`cart: ${product.name}`);

}

// Exercise 8
function removeFromCart(id) {
  // 1. Loop for to the array products to get the item to remove to cart
  // 2. Remove found product to the cartList array
}

function open_modal() {
  console.log('open_modal');
  generateCart(cartList);
  printCart();
}

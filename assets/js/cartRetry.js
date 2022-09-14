document.addEventListener('DOMContentLoaded', function (event) {
	const cartButtons = document.querySelectorAll('.cart-button');

	cartButtons.forEach((button) => {
		button.addEventListener('click', cartClick);
	});

	function cartClick() {
		let button = this;
		button.classList.add('clicked');
	}
});

// Grabbing a nodeList of every product on shop.html
let carts = document.querySelectorAll('.add-cart');

// Product objects in array
let products = [
	{
		name: 'YuGi Cap',
		tag: 'yugicap',
		price: 90,
		inCart: 0
	},
	{
		name: 'YuGi Bag',
		tag: 'yugibag',
		price: 190,
		inCart: 0
	},
	{
		name: 'Blue Eyes Black Shirt',
		tag: 'blueeyesblackshirt',
		price: 120,
		inCart: 0
	},
	{
		name: 'Red Eyes Jacket',
		tag: 'redeyesjacket',
		price: 150,
		inCart: 0
	},
	{
		name: 'Baseball Jersey',
		tag: 'baseballjersey',
		price: 150,
		inCart: 0
	},
	{
		name: 'Dark Magician Girl Shirt',
		tag: 'darkmagiciangirlshirt',
		price: 120,
		inCart: 0
	},
	{
		name: 'DMG Hoodie',
		tag: 'dmghoodie',
		price: 150,
		inCart: 0
	},
	{
		name: 'Yami Face Mask',
		tag: 'yamifacemask',
		price: 40,
		inCart: 0
	},
	{
		name: 'Exodia Hoodie',
		tag: 'exodiahoodie',
		price: 150,
		inCart: 0
	},
	{
		name: 'Yami Hoodie',
		tag: 'yamihoodie',
		price: 150,
		inCart: 0
	},
	{
		name: 'Black Grey Hoodie',
		tag: 'blackgreyhoodie',
		price: 150,
		inCart: 0
	},
	{
		name: 'Blue Eyes White Shirt',
		tag: 'blueeyeswhiteshirt',
		price: 120,
		inCart: 0
	}
];

// Looping products and adding event Listeners which will execute two functions
for (let i = 0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		// cartNumbers() keeps track of the number of items in cart to display
		cartNumbers(products[i]);
		// totalCost() generates the total amount of the products in cart/localStorage
		totalCost(products[i]);
	});
}

// Displays the cart number of total products
function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');
	if (productNumbers) {
		document.querySelector('.shop_cart_link_cart span').textContent = productNumbers;
	}
}

function onLoad() {
	localStorage.setItem('deliveryFee', 0);
}

// The function that is added to the eventListener of each product tag
function cartNumbers(product, action) {
	let productNumbers = JSON.parse(localStorage.getItem('cartNumbers'));

	if (action === 'decrease') {
		localStorage.setItem('cartNumbers', productNumbers - 1);
		document.querySelector('.shop_cart_link_cart span').textContent = productNumbers - 1;
	} else if (productNumbers) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.shop_cart_link_cart span').textContent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.shop_cart_link_cart span').textContent = 1;
	}
	// setItems() runs when cartNumbers() is envoked
	setItems(product);
}

// Sets all items/products which was selected and saves it to localStorage
function setItems(product) {
	let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

	if (cartItems !== null) {
		if (cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			};
		}
		cartItems[product.tag].inCart += 1;
	} else {
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		};
	}

	localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Get the complete cost of all products
function totalCost(product, action) {
	let cartCost = JSON.parse(localStorage.getItem('totalCost'));

	if (action === 'decrease') {
		localStorage.setItem('totalCost', cartCost - product.price);
	} else if (cartCost !== null) {
		localStorage.setItem('totalCost', cartCost + product.price);
	} else {
		localStorage.setItem('totalCost', product.price);
	}
	manageDelivery();
}

// When invoked this function will clear the localStorage
function clearCart() {
	localStorage.removeItem('productsInCart');
	localStorage.removeItem('totalCost');
	localStorage.setItem('cartNumbers', 0);
}

// After products was selected and client/user navigates to cart.html, all the information will be displayed for client/user
function displayCart() {
	let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

	let cartCost = localStorage.getItem('totalCost');
	let productContainer = document.querySelector('.products');
	let checkingOut = document.querySelector('.checkingOut');
	let deliveryAmount = JSON.parse(localStorage.getItem('deliveryFee'));
	console.log(deliveryAmount);

	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		checkingOut.innerHTML = '';
		Object.values(cartItems).map((item) => {
			productContainer.innerHTML += `
										<div class="product">
											<ion-icon name="close-circle"></ion-icon>
											<img class="cartProductImage" src="/assets/images/${item.tag}.png">
											<span class="productName">
											 	${item.name}
											</span> 
										</div>
										<div class="price">
											R${item.price},00
										</div>
										<div class="quantity">
										<ion-icon class="decrease" name="arrow-back-circle-outline"></ion-icon>
											<span>
											${item.inCart}
											</span>
											<ion-icon class="increase" name="arrow-forward-circle-outline"></ion-icon>
										</div>
										<div class="total">
											R${item.inCart * item.price},00
										</div>         
        `;
		});
		checkingOut.innerHTML += `
    
				<div class="row justify-content-center text-center my-5">
					<div class="col-5 shipmentContainer">
						<div class="checkoutCartDisplay">
							<h4 class="pt-3 pb-3">Confirm Order</h4>

							<ul class="list-group list-group-flush">
					  			<li class="list-group-item">
									<div class="d-flex justify-content-between">Delivery Fee
					  					<p class="secondary-content px-5">R ${deliveryAmount}</p>
					  				</div>
								</li>
					  			<li class="list-group-item">
									<div class="d-flex justify-content-between">Discount
					  					<p class="secondary-content px-5">R 150</p>
					  				</div>
								</li>
					  			<li class="list-group-item">
									<div class="d-flex justify-content-between">Total Excl. VAT
					  					<p class="secondary-content px-5">R ${Math.round(cartCost)}</p>
					  				</div>
								</li>
					  			<li class="list-group-item">
									<div class="d-flex justify-content-between">Total Incl. VAT
					  					<p class="secondary-content px-5">R ${Math.round(cartCost * 1.15)}</p>
					  				</div>
								</li>
							</ul>
				  	
							<a id="checkOutBtn" class="btn">Checkout</a>
						</div>
					</div>
				</div>
    		`;
	}

	// Functions that are invoked when displayCart() is called
	manageQuantity();
	deleteButtons();
	manageDelivery();
}

// Redirects client back to home page after checkout is confirmed
function redirectToHome() {
	window.location = '/index.html';
}

// Referencing the client with their generated number
function referenceGenerator() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function manageDelivery() {
	let deliveryFees = document.querySelectorAll('input[name="deliveryFees"]');
	let totalAmount = JSON.parse(localStorage.getItem('totalCost'));

	deliveryFees.forEach((fee) => {
		fee.addEventListener('click', () => {
			if (fee.value === '20') {
				totalAmount += 20;
				console.log(totalAmount);
			} else if (fee.value == '100') {
				totalAmount += 100;
				console.log(totalAmount);
			} else {
				totalAmount += 250;
				console.log(totalAmount);
			}
			localStorage.setItem('totalCost', totalAmount);
			localStorage.setItem('deliveryFee', fee.value);

			displayCart();
		});
	});
	finishCheckout();
}
function finishCheckout() {
	let payment = document.getElementById('checkOutBtn');
	payment.addEventListener('click', () => {
		alert('Thank you for your purchase, your reference is: ' + referenceGenerator());
		redirectToHome();
		clearCart();
	});
}

// This functions deletes the entire product from the cart.html page and also localStorage
function deleteButtons() {
	let deleteButtons = document.querySelectorAll('.product ion-icon');
	let productName;
	let productNumbers = localStorage.getItem('cartNumbers');
	let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
	let cartCost = localStorage.getItem('totalCost');

	for (let i = 0; i < deleteButtons.length; i++) {
		deleteButtons[i].addEventListener('click', () => {
			productName = deleteButtons[i].parentElement.textContent
				.trim()
				.toLowerCase()
				.replace(/ /g, '');

			localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
			localStorage.setItem(
				'totalCost',
				cartCost - cartItems[productName].price * cartItems[productName].inCart
			);

			delete cartItems[productName];
			localStorage.setItem('productsInCart', JSON.stringify(cartItems));
			// Runs when function is called
			onLoadCartNumbers();
			displayCart();
		});
	}
}

// Manages the quantity/amount of the certain type of product/products
function manageQuantity() {
	let decreaseButtons = document.querySelectorAll('.decrease');
	let increaseButtons = document.querySelectorAll('.increase');
	let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
	let currentQuantity = 0;
	let currentProduct = '';

	for (let i = 0; i < decreaseButtons.length; i++) {
		decreaseButtons[i].addEventListener('click', () => {
			currentQuantity =
				decreaseButtons[i].parentElement.querySelector('span').textContent;
			currentProduct = decreaseButtons[
				i
			].parentElement.previousElementSibling.previousElementSibling
				.querySelector('span')
				.textContent.toLowerCase()
				.replace(/ /g, '')
				.trim();

			if (cartItems[currentProduct].inCart > 1) {
				cartItems[currentProduct].inCart -= 1;
				cartNumbers(cartItems[currentProduct], 'decrease');
				totalCost(cartItems[currentProduct], 'decrease');
				localStorage.setItem('productsInCart', JSON.stringify(cartItems));
				displayCart();
			}
		});
	}
	for (let i = 0; i < increaseButtons.length; i++) {
		increaseButtons[i].addEventListener('click', () => {
			currentQuantity =
				increaseButtons[i].parentElement.querySelector(' span').textContent;
			currentProduct = increaseButtons[
				i
			].parentElement.previousElementSibling.previousElementSibling
				.querySelector('span')
				.textContent.toLowerCase()
				.replace(/ /g, '')
				.trim();

			cartItems[currentProduct].inCart += 1;
			cartNumbers(cartItems[currentProduct]);
			totalCost(cartItems[currentProduct]);
			localStorage.setItem('productsInCart', JSON.stringify(cartItems));
			displayCart();
		});
	}
}

// checkBoxes.addEventListener('click', () => {
//   console.log(checkBoxes[i].value);
//   if (checkBoxes[i].value === '20') {
//     totalAmount += 20;
//     console.log(totalAmount);
//     totalCost(totalAmount);
//     localStorage.setItem('totalCost', totalAmount);
//     displayCart();
//   }
// });

// function manageDelivery() {
//   let checkBoxes = document.querySelectorAll('input[name="group1"]');
//   console.log(checkBoxes);
//   let totalAmount = JSON.parse(localStorage.getItem('totalCost'));
//   //console.log(totalAmount);
//   checkBoxes.forEach((checkBox) => {
//     checkBox.addEventListener('click', () => {
//       if (checkBox.value == '20') {
//         totalAmount += 20;
//         console.log(totalAmount);
//       } else if (checkBox.value == '100') {
//         totalAmount += 100;
//         console.log(totalAmount);
//       } else if (checkBox.value == '250') {
//         totalAmount += 250;
//         console.log(totalAmount);
//       } else {
//         alert('Jy dan nou net mooi fokkol gekies');
//       }
//       localStorage.setItem('totalCost', totalAmount);
//       displayCart();
//     });
//   });

// for (let i = 0; i < checkBoxes.length; i++) {
//   checkBoxes[i].addEventListener('click', () => {
//     console.log(checkBoxes[i].value);
//   });
// }

//Manages the delivery cost on what the client decides
// function manageDelivery() {
//   let checkBoxes = document.querySelectorAll('input[name="deliveryOptions"]');
//   //console.log(checkBoxes);
//   let totalAmount = JSON.parse(localStorage.getItem('totalCost'));

//   checkBoxes.forEach((checkBox) => {
//     checkBox.addEventListener('click', () => {
//       // if (checkBox.value == '20') {
//       //   totalAmount += 20;
//       //   console.log(totalAmount);
//       // }
//     });
//   });

// Runs as app is loaded
onLoad();
onLoadCartNumbers();
displayCart();

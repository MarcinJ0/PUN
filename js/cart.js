// cart.js
function addToCart(productId) {
	let cart = JSON.parse(localStorage.getItem("cart")) || []
	const product = products.find((p) => p.id == productId)
	if (product) {
		cart.push(product)
		localStorage.setItem("cart", JSON.stringify(cart))
		alert("Product added to cart!")
	}
}

function removeFromCart(index) {
	let cart = JSON.parse(localStorage.getItem("cart")) || []
	cart.splice(index, 1)
	localStorage.setItem("cart", JSON.stringify(cart))
	alert("Product removed from cart!")
	location.reload() // Refresh the page to update the cart
}

function displayCartItems() {
	const cartItems = document.getElementById("cart-items")
	let cart = JSON.parse(localStorage.getItem("cart")) || []

	cartItems.innerHTML = "" // Clear existing items

	cart.forEach((product, index) => {
		const cartItemHTML = `
            <tr>
                <td class="align-middle"><img src="${product.image}" alt="${product.name}" style="width: 50px;"> ${product.name}</td>
                <td class="align-middle">$${product.price}</td>
                <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-minus"><i class="fa fa-minus"></i></button>
                        </div>
                        <input type="text" class="form-control form-control-sm bg-secondary text-center" value="1">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-plus"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </td>
                <td class="align-middle">$${product.price}</td>
                <td class="align-middle"><button class="btn btn-sm btn-primary remove-from-cart" data-index="${index}"><i class="fa fa-times"></i></button></td>
            </tr>
        `
		cartItems.insertAdjacentHTML("beforeend", cartItemHTML)
	})

	// Add event listeners for remove buttons
	document.querySelectorAll(".remove-from-cart").forEach((button) => {
		button.addEventListener("click", function () {
			const index = this.getAttribute("data-index")
			removeFromCart(index)
		})
	})
}

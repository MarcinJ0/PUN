// cart.js
import { games } from "./games.js"
document.addEventListener("DOMContentLoaded", function () {
	const cart = JSON.parse(localStorage.getItem("cart")) || []
	const cartItemsContainer = document.getElementById("cart-items")
	const subtotalElement = document.getElementById("subtotal")
	const totalElement = document.getElementById("total")

	let subtotal = 0

	cart.forEach((game) => {
		const totalPrice = game.price * game.quantity
		subtotal += totalPrice

		const cartItem = `
            <tr>
                <td class="align-middle"><img src="${
									game.image
								}" alt="" style="width: 50px;"> ${game.name}</td>
                <td class="align-middle">$${game.price.toFixed(2)}</td>
                <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-minus" data-id="${
															game.id
														}">-</button>
                        </div>
                        <label for="cart_quantity" class="visually-hidden">Quantity</label>
                        <input type="text" id="cart_quantity" class="form-control form-control-sm bg-secondary text-center quantity-input" value="${
													game.quantity
												}" data-id="${game.id}">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-plus" data-id="${
															game.id
														}">+</button>
                        </div>
                    </div>
                </td>
                <td class="align-middle">$${totalPrice.toFixed(2)}</td>
                <td class="align-middle">
                    <button class="btn btn-sm btn-primary remove-from-cart" data-id="${
											game.id
										}">x</button>
                </td>
            </tr>
        `
		cartItemsContainer.insertAdjacentHTML("beforeend", cartItem)
	})

	subtotalElement.textContent = `$${subtotal.toFixed(2)}`
	totalElement.textContent = `$${subtotal.toFixed(2)}`

	// Obsługa zmiany ilości
	document.querySelectorAll(".btn-minus").forEach((button) => {
		button.addEventListener("click", function () {
			const gameId = this.getAttribute("data-id")
			updateQuantity(gameId, -1)
		})
	})

	document.querySelectorAll(".btn-plus").forEach((button) => {
		button.addEventListener("click", function () {
			const gameId = this.getAttribute("data-id")
			updateQuantity(gameId, 1)
		})
	})

	// Obsługa ręcznej zmiany ilości
	document.querySelectorAll(".quantity-input").forEach((input) => {
		input.addEventListener("change", function () {
			const gameId = this.getAttribute("data-id")
			const newQuantity = parseInt(this.value)
			if (newQuantity > 0) {
				updateQuantity(gameId, newQuantity, true)
			}
		})
	})

	// Obsługa usuwania z koszyka
	document.querySelectorAll(".remove-from-cart").forEach((button) => {
		button.addEventListener("click", function () {
			const gameId = this.getAttribute("data-id")
			removeFromCart(gameId)
		})
	})
})

function updateQuantity(gameId, change, setExact = false) {
	let cart = JSON.parse(localStorage.getItem("cart")) || []
	const game = cart.find((g) => g.id == gameId)

	if (game) {
		if (setExact) {
			game.quantity = change // Ustaw dokładną ilość
		} else {
			game.quantity += change // Zwiększ lub zmniejsz ilość
		}

		if (game.quantity <= 0) {
			// Jeśli ilość spadnie do 0, usuń produkt z koszyka
			cart = cart.filter((g) => g.id != gameId)
		}

		localStorage.setItem("cart", JSON.stringify(cart))
		location.reload() // Odśwież stronę, aby zaktualizować koszyk
	}
}

function removeFromCart(gameId) {
	let cart = JSON.parse(localStorage.getItem("cart")) || []
	cart = cart.filter((g) => g.id != gameId)
	localStorage.setItem("cart", JSON.stringify(cart))
	location.reload() // Odśwież stronę, aby zaktualizować koszyk
}

import { games } from "./games.js"

document.addEventListener("DOMContentLoaded", function () {
	const urlParams = new URLSearchParams(window.location.search)
	const gameId = urlParams.get("id")

	const game = games.find((g) => g.id == gameId)
	console.log(game)

	if (game) {
		document.getElementById("game-image").src = game.image
		document.getElementById("game-name").textContent = game.name
		document.getElementById("game-price").textContent = `$${game.price.toFixed(
			2
		)}`
		document.getElementById("game-description").textContent = game.description
		document.getElementById("game-details").textContent = game.details

		if (game.baseGameId) {
			const baseGame = games.find((g) => g.id == game.baseGameId)
			if (baseGame) {
				const baseGameLink = document.getElementById("base-game-link")
				const baseGameUrl = document.getElementById("base-game-url")
				baseGameLink.style.display = "block"
				baseGameUrl.href = `detail.html?id=${baseGame.id}`
			}
		}
	}

	document.getElementById("add-to-cart").addEventListener("click", function () {
		const quantity = parseInt(document.getElementById("quantity").value)
		addToCart(gameId, quantity)
	})
})

document.querySelectorAll(".add-to-cart-carousel").forEach((button) => {
	button.addEventListener("click", function (e) {
		e.preventDefault()
		const gameId = this.getAttribute("data-id")
		addToCart(gameId)
	})
})

function addToCart(gameId, quantity = 1) {
	const game = games.find((g) => g.id == gameId)
	if (game) {
		let cart = JSON.parse(localStorage.getItem("cart")) || []
		const existingProduct = cart.find((item) => item.id == gameId)

		if (existingProduct) {
			existingProduct.quantity += quantity
		} else {
			game.quantity = quantity
			cart.push(game)
		}

		localStorage.setItem("cart", JSON.stringify(cart))
		updateCartCount()
	}
}

function updateCartCount() {
	const cart = JSON.parse(localStorage.getItem("cart")) || []
	const cartCount = document.querySelector(".badge")
	if (cartCount) {
		const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
		cartCount.textContent = totalQuantity
	}
}

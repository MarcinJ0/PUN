// shop.js
import { games } from "./games.js"

document.addEventListener("DOMContentLoaded", function () {
	const gamesContainer = document.getElementById("games-container")
	const priceFilterForm = document.getElementById("price-filter")
	const typeFilterForm = document.getElementById("type-filter")

	// Wyświetl wszystkie gry na starcie
	displayGames(games)

	// Obsługa filtrowania po cenie
	priceFilterForm.addEventListener("change", function () {
		filterGames()
	})

	// Obsługa filtrowania po typie
	typeFilterForm.addEventListener("change", function () {
		filterGames()
	})

	// Funkcja do filtrowania gier
	function filterGames() {
		const selectedPrices = getSelectedValues(priceFilterForm, "price")
		const selectedTypes = getSelectedValues(typeFilterForm, "type")

		const filteredGames = games.filter((game) => {
			const priceMatch = selectedPrices.some((priceRange) => {
				if (priceRange === "all") return true
				const [min, max] = priceRange.split("-").map(Number)
				return game.price >= min && game.price <= max
			})

			const typeMatch =
				selectedTypes.includes("all") || selectedTypes.includes(game.type)

			return priceMatch && typeMatch
		})

		displayGames(filteredGames)
	}

	// Funkcja do pobierania wybranych wartości z formularza
	function getSelectedValues(form, name) {
		return Array.from(form.elements[name])
			.filter((input) => input.checked)
			.map((input) => input.value)
	}

	// Funkcja do wyświetlania gier
	function displayGames(gamesToDisplay) {
		gamesContainer.innerHTML = "" // Wyczyść kontener

		gamesToDisplay.forEach((game) => {
			const gameCard = `
                <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                    <div class="card product-item border-0 mb-4">
                        <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                            <img class="img-fluid w-100" src="${
															game.image
														}" alt="${
				game.name
			}" style="height: 300px; object-fit: cover;">
                        </div>
                        <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                            <span class="text-truncate mb-3" style="font-size: 1.25em; font-weight: 600; display: block;">${
															game.name
														}</span>
                            <div class="d-flex justify-content-center">
                                <span style="font-size: 1.25em; font-weight: 600;">$${game.price.toFixed(
																	2
																)}</span>
                            </div>
                        </div>
                        <div class="card-footer d-flex justify-content-between bg-light border">
                            <a href="detail.html?id=${
															game.id
														}" class="btn btn-sm text-dark p-0">
                                <i class="fas fa-eye text-primary mr-1"></i>View Detail
                            </a>
                            <a href="#" class="btn btn-sm text-dark p-0 add-to-cart" data-id="${
															game.id
														}">
                                <i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart
                            </a>
                        </div>
                    </div>
                </div>
            `
			gamesContainer.insertAdjacentHTML("beforeend", gameCard)
		})

		// Obsługa dodawania do koszyka
		document.querySelectorAll(".add-to-cart").forEach((button) => {
			button.addEventListener("click", function (e) {
				e.preventDefault()
				const gameId = this.getAttribute("data-id")
				addToCart(gameId)
			})
		})
	}

	// Funkcja do dodawania do koszyka
	function addToCart(gameId) {
		const game = games.find((g) => g.id == gameId)
		if (game) {
			let cart = JSON.parse(localStorage.getItem("cart")) || []
			const existingProduct = cart.find((item) => item.id == gameId)

			if (existingProduct) {
				existingProduct.quantity += 1
			} else {
				game.quantity = 1
				cart.push(game)
			}

			localStorage.setItem("cart", JSON.stringify(cart))
			updateCartCount()
		}
	}

	// Funkcja do aktualizacji liczby produktów w koszyku
	function updateCartCount() {
		const cart = JSON.parse(localStorage.getItem("cart")) || []
		const cartCount = document.querySelector(".badge")
		if (cartCount) {
			cartCount.textContent = cart.length
		}
	}
})

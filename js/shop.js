// shop.js
document.addEventListener("DOMContentLoaded", function () {
	const productList = document.getElementById("product-list")

	products.forEach((product) => {
		const productHTML = `
            <div class="col-lg-4 col-md-6 col-sm-12 pb-1">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3">${product.name}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>$${product.price}</h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <a href="detail.html?id=${product.id}" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                        <button class="btn btn-sm text-dark p-0 add-to-cart" data-id="${product.id}"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                    </div>
                </div>
            </div>
        `
		productList.insertAdjacentHTML("beforeend", productHTML)
	})

	// Add to cart functionality
	document.querySelectorAll(".add-to-cart").forEach((button) => {
		button.addEventListener("click", function () {
			const productId = this.getAttribute("data-id")
			addToCart(productId)
		})
	})
})

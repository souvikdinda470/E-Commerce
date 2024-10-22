const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

async function fetchProductDetails() {
    let response = await fetch("https://dummyjson.com/products");
    let data = await response.json();
    let product = data.products.find((p) => p.id == productId);
    if (product) {
        let productImage = document.getElementById("productImage");
        productImage.src = product.images[0];
        document.getElementById("productTitle").innerText = product.title;
        document.getElementById("productPrice").innerText = `$${product.price}`;
        document.getElementById("productDescription").innerText = `Description - ${product.description}`;
        document.getElementById("productBrand").innerText = `Brand Name - ${product.brand}`;
        document.getElementById("productCategory").innerText = `Category - ${product.category}`;
        document.getElementById("productRating").innerText = `Rating - ${product.rating}`;
        document.getElementById("productPolicy").innerText = `Return Policy - ${product.returnPolicy}`;
        document.getElementById("productWarranty").innerText = `Product Warranty - ${product.warrantyInformation}`;
        document.getElementById("productShipping").innerText = `Shipping Information - ${product.shippingInformation}`;
        document.getElementById("productThumbnail").src = product.thumbnail;
        document.getElementById("productThumbnail1").src = product.thumbnail;
        
    }
}
fetchProductDetails();

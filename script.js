function loadCategories(){
    fetch("http://fakestoreapi.com/products/categories")
    .then(function(response){
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function(categories){
        categories.unshift("all");
        categories.map(function(category){
            var option=document.createElement("option");
            option.text=category.toUpperCase();
            option.value=category;
            document.querySelector("select").appendChild(option);
        })
    })
}

function loadProducts(url){
    fetch(url)
    .then(function(response){
        return response.json();
    })
    .then(function(products){
        const mainElement = document.querySelector("main");
        mainElement.innerHTML = '';
        products.map(function(product){
            var div=document.createElement("div");
            div.className="card p-2 m-2";
            div.style.width="200px";
            div.innerHTML=`
                <div class="card-header">
                    <img src=${product.image} height="140" class="card-img">
                </div>
                <div class="card-body">
                    <div>${product.title}</div>
                    <div>Price:${product.price}</div>
                    <div>Rating: ${product.rating.rate} <span class="bi bi-star-fill text-success"></span></div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger w-100" onclick="AddClick(${product.id})">
                        <span class="bi bi-cart3">Add to cart</span>
                    </button>
                </div>
            `;
                document.querySelector("main").appendChild(div)
        })
    })
}
function categoryChanged(){
    var categoryName=document.getElementById("lstCategories").value;
    if(categoryName=="all") {
    loadProducts("http://fakestoreapi.com/products");
    } 
    else {
    loadProducts(`http://fakestoreapi.com/products/category/${categoryName}`)
     }
}

function bodyLoad(){
    loadCategories();
    loadProducts("http://fakestoreapi.com/products")
    getCartCount();    
}
var cartItems=[];
var count=0;
function getCartCount(){
    document.getElementById("lblCount").innerHTML=cartItems.length;

}
function AddClick(id){
   fetch(`http://fakestoreapi.com/products/${id}`)
   .then(function(response){
    return response.json();
   })
   .then(function(product){
    cartItems.push(product);
    alert(`${product.title}\nAdded to cart`)
    getCartCount();
   })
}
function showCart(){
    document.querySelector("tbody").innerHTML=""
    cartItems.map(function(item){
        var tr=document.createElement("tr")
        var tdTitle=document.createElement("td")
        var tdPreview=document.createElement("td")
        var tdPrice=document.createElement("td")

        tdTitle.innerHTML=item.title;
        tdPrice.innerHTML=item.price;
        tdPreview.innerHTML=`<img width="100" height="100" src=${item.image}> `;

        tr.appendChild(tdTitle)
        tr.appendChild(tdPrice)
        tr.appendChild(tdPreview)

        document.querySelector("tbody").appendChild(tr);
    })
}

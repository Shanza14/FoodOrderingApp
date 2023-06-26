import {menuArray} from './data.js'


let cartHtml =``
let noOfItem = ``
let pricesOfItem = ``
let totalPrice = 0
let displayClass = ``
let modalHtml=``
let modalIsCalled = false
let ordrMsg = ``



document.addEventListener('click', function(e)
    {  
    if(e.target.dataset.add){
        console.log('add button is clicked')
        let clickedAdd = JSON.parse(e.target.dataset.add)
        handleAddButton(clickedAdd)
         }
      else if(e.target.dataset.odr){
             console.log('order button is clicked')
            callModal()
          }
        else if(e.target.dataset.pay){
            confirmOrder()
        }
    })
 
 function handleAddButton(itemId){
     const targetItemObj = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    
    if (!targetItemObj.addedtToCart)
    {targetItemObj.addedtToCart = true
    displayClass = 'display'
    addToCart(targetItemObj)
    }
 }
 
    
 function addToCart(cartId){
      noOfItem += `<th class = ${displayClass}>${cartId.name}<span id="remove-btn">remove</span></th>`
      pricesOfItem += `<td class = ${displayClass}>$${cartId.price}</td>`
      totalPrice += cartId.price
      
 cartHtml = `
            <p id="ur-ordr" class = ${displayClass}>Your Order</p>
                    <table class="bill-tbl" id="bill-tbl">
                        <thead class="addedIem">
                            ${noOfItem}
                        </thead>
                        <tbody class = "itemsPrice">
                            ${pricesOfItem}
                        </tbody>
                    </table>
                    <table class="total-bill" id="total-bill">
                        <thead>
                            <th>Total</th>
                        </thead>
                        <tbody>
                            <td>$${totalPrice}</td>
                        </tbody>
                    </table>
                
                <button class="green-btn" id = 'order-btn' data-odr='order button'>Complete Order</button>`
                 render()
}


function callModal(){
    console.log('modal function is called')
    modalIsCalled = true
    console.log(modalIsCalled)
    modalHtml = `
                <form class="order-form" id="order-form">
                    <p>Enter card details</p>
                    <input required type="text" placeholder="Enter your name"></input>
                    <input required type="number" placeholder="Enter card number"></input>
                    <input required type="number" placeholder="Enter CVV"></input>
                    <button class="green-btn" id="pay-btn" data-pay = 'pay button'>Pay</button>
                </form>`
                render()
}

function confirmOrder(){
    displayClass = ``
     modalIsCalled = false
     ordrMsg = `
       <p id='message-box'>Thanks, Your order is on the way</p>`
     render()
}


function getMenuHtml(){
    let menuHtml = ``
    
menuArray.forEach(function(item){
    menuHtml +=`
        <section class="section" id="section-1">
            <p class="item-icon">${item.emoji}</p>
            <div class="item-details">
                <p class="name">${item.name}</p>
                <p class="ingredients">${item.ingredients}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </section>
        `
})
    if(displayClass)
        {menuHtml +=`
        <div class="cart ${displayClass}">
            ${cartHtml}
            <!-- cart items here -->
            </div>`
            }
            
    if(modalIsCalled){
        menuHtml +=`
                    <div class="modal ${displayClass}">
                    ${modalHtml}
                    <!-- modal form here -->
                    </div>
                    `
    }
    menuHtml += ordrMsg
return menuHtml}

function render(){
    document.getElementById('menus').innerHTML = getMenuHtml()
}

render()
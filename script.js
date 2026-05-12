

let our_quote_items = []; // our price list
let c_quote_items = []; // customer quote items
let total_price = 0;

document.addEventListener("DOMContentLoaded", async function() {

    await loadData();
    main();


});


function main() 
{  

    console.log(c_quote_items);
        
    renderQuote(c_quote_items);

}


// load initial data (price list)
async function loadData() 
{
    // get price list
    const response = await axios.get("/data.json");
    our_quote_items = response.data.quote_items;
console.log(our_quote_items);

    // render price list
    /*
    let oneItemHTML = "";

    for (let qi of our_quote_items) 
    {
        oneItemHTML += `<li>
        
        <button id="btn-${qi.quote_item_id}" class="btn btn-primary mb-3" data-qid="${qi.quote_item_id}" onClick="addToQuoteList(this.dataset.qid);">Add Item</button> | 
        ${qi.quote_item_category} | 
        ${qi.quote_item_id} | 
        ${qi.quote_item_name} | 
        ${qi.quote_item_unit_price}
        </li>`;
        
    }
        document.querySelector("#price-list").innerHTML = "<ul>" + oneItemHTML + "</ul>";

*/

renderPriceList(our_quote_items);

    
}

function renderPriceList(in_quote_items) 
{
    const quoteItemList = document.querySelector("#our-list-table-body");
    quoteItemList.innerHTML = '';
    
    for (let item of in_quote_items) 
    {
      const elTR = document.createElement('tr');
      elTR.innerHTML = `
        <td><button id="btn-add-${item.quote_item_id}" class="btn btn-primary mb-3" data-qid="${item.quote_item_id}" onClick="addToQuoteList(this.dataset.qid);">Add Item</button></td>
        <td>${item.quote_item_category}</td>
        <td>${item.quote_item_id}</td>
        <td>${item.quote_item_name}</td>
        <td>$${item.quote_item_unit_price.toFixed(2)}</td>
      `;
      quoteItemList.appendChild(elTR);
    }
}

function renderQuote(in_quote_items) 
{
    const quoteItemList = document.querySelector("#customer-list-table-body");
    quoteItemList.innerHTML = '';
    
    for (let item of in_quote_items) 
    {
      const elTR = document.createElement('tr');
      elTR.innerHTML = `
        <td><button id="btn-del-${item.quote_item_uuid}" class="btn btn-primary mb-3" data-qid="${item.quote_item_id}" data-uuid="${item.quote_item_uuid}" onClick="deleteFromQuoteList(this.dataset.uuid);">Remove Item</button></td>
        <td>${item.quote_item_category}</td>
        <td>${item.quote_item_id}</td>
        <td>${item.quote_item_name}</td>
        <td>$${item.quote_item_unit_price.toFixed(2)}</td>
      `;
      quoteItemList.appendChild(elTR);
    }

    document.querySelector("#customer-price").innerHTML = total_price;


}


function addToQuoteList(in_QID)
{

    console.log(in_QID);
    addQuoteItem(c_quote_items, in_QID);
    calculateQuotePrice();
    renderQuote(c_quote_items);

}


function deleteFromQuoteList(in_UUID)
{
console.log(in_UUID);

    deleteQuoteItem(c_quote_items, in_UUID);
    calculateQuotePrice();
    renderQuote(c_quote_items);


}

function calculateQuotePrice()
{

    total_price = 0;
    for (let item of c_quote_items) 
    {
        total_price = total_price + item.quote_item_unit_price;
    
    }


}

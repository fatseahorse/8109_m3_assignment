

let our_quote_items = []; // our price list
let c_quote_items = []; // customer quote items
let total_price = 0;


document.addEventListener("DOMContentLoaded", async function() {

    await loadData();
    main();

    //let testQID = await loadCustomerQuote();
    //console.log(testQID);

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


const saveButton = document.querySelector("#btn-save-quote");
saveButton.addEventListener("click", async function() {


    let cqid = document.querySelector("#c-qid").value;
    let cname = document.querySelector("#c-name").value;
    let cmobile = document.querySelector("#c-mobile").value;

    if ((cqid.trim().length > 0) && (cname.trim().length > 0) && (cmobile.trim().length > 0))
    {
        saveCustomerQuote(cqid, cname, cmobile, total_price);
    }
    else
    {
        alert("Please enter all fields [Quote ID / Name / Mobile].");
    }
    

    
      

})


let our_quote_items = []; // our price list
let c_quote_items = []; // customer quote items


document.addEventListener("DOMContentLoaded", async function() {

    await loadData();
    main();


});


function main() 
{  

    addQuoteItem(c_quote_items, "seo03");
    addQuoteItem(c_quote_items, "smm01");
    addQuoteItem(c_quote_items, "smm02");

console.log(c_quote_items);
    renderQuote(c_quote_items);


}



async function loadData() 
{
    const response = await axios.get("/data.json");

    our_quote_items = response.data.quote_items;
console.log(our_quote_items);

    let oneItemHTML = "";

    for (let qi of our_quote_items) 
    {
        oneItemHTML += `<li>
        
        <button id="btn-${qi.quote_item_id}" class="btn btn-primary mb-3" data-qid="${qi.quote_item_id}">Add Item</button> | 
        ${qi.quote_item_category} | 
        ${qi.quote_item_id} | 
        ${qi.quote_item_name} | 
        ${qi.quote_item_unit_price}
        </li>`;




        
    }

    document.querySelector("#price-list").innerHTML = "<ul>" + oneItemHTML + "</ul>";

}

function renderQuote(c_quote_items) {
    const quoteItemList = document.querySelector("#customer-list-table-body");
    quoteItemList.innerHTML = '';
    
    for (let item of c_quote_items) 
    {
      const elTR = document.createElement('tr');
      elTR.innerHTML = `
        <td>${item.quote_item_category}</td>
        <td>${item.quote_item_id}</td>
        <td>${item.quote_item_name}</td>
        <td>$${item.quote_item_unit_price.toFixed(2)}</td>
      `;
      quoteItemList.appendChild(elTR);
    }
  }



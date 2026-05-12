
// data layer


function getQuoteItem(in_quote_items, id)
{

  for (let i = 0; i < in_quote_items.length; i++) 
  {

    if (in_quote_items[i].quote_item_id == id) {
      return in_quote_items[i];
    }
    
  }
}

function addQuoteItem(c_quote_items, id) 
{
  let quote_item = getQuoteItem(our_quote_items, id);
  
  if (!quote_item) 
  {
    console.log("Item not found");
    return;
  }

  let newQuoteItem = {
    "quote_item_uuid" : crypto.randomUUID(),
    "quote_item_category" : quote_item.quote_item_category, 
    "quote_item_id" : quote_item.quote_item_id, 
    "quote_item_name" : quote_item.quote_item_name, 
    "quote_item_unit_price" : quote_item.quote_item_unit_price
  };
  c_quote_items.push(newQuoteItem);
}


function deleteQuoteItem(c_quote_items, c_uuid) 
{

  let idToDelete = null;
  
  for (let i = 0; i < c_quote_items.length; i++) 
  {
    if (c_quote_items[i].quote_item_uuid == c_uuid) {
      idToDelete = i;
      break;
    }
  }
  
  if (idToDelete !== null) 
  {
    c_quote_items.splice(idToDelete, 1);
  } 
  else 
  {
    console.log("item not found");
  }
}
  
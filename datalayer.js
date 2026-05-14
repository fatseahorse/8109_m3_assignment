
// data layer
const BASE_JSONBIN_URL = "https://api.jsonbin.io/v3/b";
const JSONBIN_BIN_ID = "6a043855adc21f119a92b1ae";
const JSONBIN_MASTER_KEY = "$2a$10$Ux9j81gTghRP/ZdK010f8./ju1p13Rj7WAnb3llY1vhvSjsRuhVkK";


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
 

async function loadCustomerQuote(inQID) {

  const response = await axios.get(BASE_JSONBIN_URL + "/" + JSONBIN_BIN_ID + "/latest");
  return response.data.record;

}

async function saveCustomerQuote(in_QID, in_cname, in_cmobile, in_cprice) {

  let quotes = []

  // get existing quote recordset
  const resp01 = await axios.get(BASE_JSONBIN_URL + "/" + JSONBIN_BIN_ID + "/latest");
  if (resp01.data.record.length > 0)
  {
    quotes = resp01.data.record;
  }

  let customer_quote = {
    "quote_id": in_QID,
    "customer_name": in_cname,
    "mobile_no": in_cmobile,
    "total_price": in_cprice,
    "quote_items": c_quote_items
  };

  quotes.push(customer_quote);

  console.log(customer_quote);
  console.log(quotes);
  
  const response = await axios.put(`${BASE_JSONBIN_URL}/${JSONBIN_BIN_ID}`, quotes, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_MASTER_KEY
    }
  });
  
  return (response.status == 200) ? 1 : 0;

}


async function retrieveCustomerQuote(in_QID)
{

  let quotes = []
  let selectedQuote = {};

  // get existing quote recordset
  const resp01 = await axios.get(BASE_JSONBIN_URL + "/" + JSONBIN_BIN_ID + "/latest");
  if (resp01.data.record.length > 0)
  {
    quotes = resp01.data.record;
  }

  for (let item of quotes)   
  {
    if (item.quote_id == in_QID) {
      selectedQuote = item;
      break;
    }
  }

  console.log(selectedQuote);

  /*
  let customer_quote = {
    "quote_id": in_QID,
    "customer_name": in_cname,
    "mobile_no": in_cmobile,
    "total_price": in_cprice,
    "quote_items": c_quote_items
  };

  quotes.push(customer_quote);

  console.log(customer_quote);
  console.log(quotes);
  
  const response = await axios.put(`${BASE_JSONBIN_URL}/${JSONBIN_BIN_ID}`, quotes, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": JSONBIN_MASTER_KEY
    }
  });
  */
  return selectedQuote;




}
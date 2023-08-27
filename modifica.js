// Dichiarazione variabili url e token

const url = `https://striveschool-api.herokuapp.com/api/product/`
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0YTIxM2RmZmI4YjAwMTQ0MTNjMTAiLCJpYXQiOjE2OTMwNjYzNTksImV4cCI6MTY5NDI3NTk1OX0.eU4qeKtTWwqehSdS_maw0o1lHVPf0xShTRpgNoXjEsg`

// dichiarazione variabili da HTML

const form = document.getElementById(`product-form`)

const productIdInput = document.getElementById(`product-id`)
const productName = document.getElementById(`name`)
const description = document.getElementById(`description`)
const brand = document.getElementById(`brand`)
const imageUrl = document.getElementById(`image`)
const price = document.getElementById(`price`)

// event listener al submit del form

form.addEventListener(`submit`, async (event) =>{

  // funzione che previene eventi di default
    event.preventDefault()
    
  // validazione del form
    const isFormValid = handelFormValidation();
    if (!isFormValid) return false

// dichiarazione dell'oggetto

    const product = {
    name: productName.value,
    description: description.value,
    brand: brand.value,
    imageUrl: imageUrl.value,
    price: price.value
  }

  try {

// dichiarazione dell'url corretto in relazione se presente o no un productId

    const URL = productIdInput.value 
    ? `${url}${productIdInput.value}`
    : `${url}`
    
// dichiarazione del metodo da utilizzare in relazione se presente o no productIdInput value

    const HTTP_METHOD = productIdInput.value ? 'PUT' : 'POST'

// chiamata

    const response = await fetch(URL, {
      method: HTTP_METHOD,
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}` 
      }
    })
    
    if (response.ok) {
      window.location.href = productIdInput.value 
        ? 'index.html?status=edit-ok' 
        : 'index.html?status=create-ok'
    } else {
      alert('Si è verificato un errore durante la creazione del prodotto.')
    }
    
    
  } catch (error) {
    console.log('Errore durante il salvataggio: ', error);
    alert('Si è verificato un errore durante il salvataggio.')
  }
  
})

function handelFormValidation() {
  
    const validation = validateForm()
    let isValid = true;
  
    if (!validation.isValid) {
      for (const field in validation.errors) {
        const errorElement = document.getElementById(`${field}-error`)
        errorElement.textContent = '';
        errorElement.textContent = validation.errors[field]
      }
      isValid = false  
    }
    return isValid
  }

function validateForm() {
    const errors = {}
   
    if (!productName.value) errors.name = `Il campo nome è obbligadorio`
    else errors.name = ``
    if (!description.value) errors.description = `Il campo descrizione è obbligadorio`
    else errors.description = ``
    if (!brand.value) errors.brand = `Il campo brand è obbligadorio`
    else errors.brand = ``
    if (!image.value) errors.image = `Il campo Url Immagine è obbligadorio`
    else errors.image = ``
    if (!price.value) errors.price = `Il campo prezzo è obbligadorio`
    else if (isNaN(price.value)) {errors.price = 'Il prezzo deve essere un valore numerico'}
    else errors.price = ``
   

    return {
        isValid: Object.values(errors).every(value => value === ''),
        errors
      }
}

function titleModifier(productId) {
  const pageTitle = document.getElementById('pageTitle');
  pageTitle.innerHTML = productId ? 'Edit product' : 'Create new product';
}

async function getProductData() {
  const qsParams = new URLSearchParams(window.location.search);
  const productId = qsParams.get('id')
  console.log(productId)

  titleModifier(productId);

  if (productId) {

    try {
      const data = await fetch(`${url}${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      const product = await data.json()
      console.log(product)

     
      if (!(`name` in product)) {
        console.log('Product doesn\'t exist');
        return
      }
    
      productIdInput.value = product._id;
      
      productName.value = product.name;
      description.value = product.description;
      brand.value = product.brand;
      imageUrl.value = product.imageUrl;
      price.value = product.price;

    } catch (error) {
      console.log('Errore nel recupero del prodotto: ', error);
    }
    
  } 
}

function goBack() {
  window.location.href = `index.html`
}


getProductData()


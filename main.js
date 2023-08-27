const url = `https://striveschool-api.herokuapp.com/api/product/`
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0YTIxM2RmZmI4YjAwMTQ0MTNjMTAiLCJpYXQiOjE2OTMwNjYzNTksImV4cCI6MTY5NDI3NTk1OX0.eU4qeKtTWwqehSdS_maw0o1lHVPf0xShTRpgNoXjEsg`



async function fetchProduct() {
  handleAlertMessage()
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Errore nel recupero dati: ${response.status}`);
    }

    const data = await response.json();
    
// spinner 
    setTimeout( () => {
      document.querySelector('.spinner-container').classList.add('d-none');
      displayProducts(data);
    }, 1000)
  } catch (error) {
    console.error('Error:', error);
  }
}

function handleAlertMessage() {
  const qsParams = new URLSearchParams(window.location.search);
  const status = qsParams.get('status')
  if (status && status === 'create-ok') showAlert('create');
  if (status && status === 'edit-ok') showAlert('update');
  if (status && status === 'cancel-ok') showAlert('cancel');
  clearQueryString()
}


function displayProducts(products){

  const productList = document.getElementById(`productList`)
  productList.innerHTML = ``

  products.forEach(product => {

    const card = `
    <div class="card my-card">
    <h5 class="card-header">${product.name} <br> <span id="productCode">Cod. ${product._id} </span></h5>
    <div class="card-body container-fluid">
        <div class="row align-items-center">
          <div class="col-2">
            <img src="${product.imageUrl}" alt="test">
          </div>
          <div class="col-2 text-center">
          <h6 id="brand" class="card-title"><span class="fst-italic fw-bold">${product.brand}</span></h6>
          <h6 id="prezzo">€ ${product.price}</h6>
          </div>
          <p class="card-text col-6">${product.description} <br> <a href="descrizione.html?id=${product._id}">Read More</a></p>
          <div class="col-2">
            <button class="btn btn-primary mb-3" onclick="editProduct('${product._id}')">Edit Product</button>
            <button class="btn btn-danger mb-3" onclick="deleteProduct('${product._id}')">Delete Product</button>
          </div>
        </div>
    </div>
  </div>
    `
productList.innerHTML += card

  })
}

function addProduct() {
  window.location.href = 'aggiungiModificaProdotti.html' 
  
 }

function editProduct (productId) {
  window.location.href = `aggiungiModificaProdotti.html?id=${productId}`
}


async function deleteProduct(product) {
  // Richiede una conferma prima di eliminare il prodotto
  const userConfirmed = confirm('Are you sure you want to delete this product?');
  
  if (userConfirmed) {
    
    try {
      const response = await fetch(`${url}${product}`, { 
        method: 'DELETE', 
        headers: {
          Authorization: `Bearer ${token}` 
        },
      });
      
      window.location.href = 'index.html?status=cancel-ok';

      if (response.ok) {
        // La richiesta è andata a buon fine
        console.log('Product successfully.');
        // Puoi aggiungere un reindirizzamento o un aggiornamento dell'interfaccia qui
      } else {
        // La risposta del server indica un errore
        console.log('Error during the product elimination process:', response.statusText);
      }
    } catch (error) {
      console.log('Error during the product elimination process:', error);
    }
  }
} 


// funzione alert
function showAlert(actionType) {
  const alertCnt = document.getElementById('alert-container');
  alertCnt.classList.remove('d-none');
  alertCnt.innerHTML = actionType === 'create'
    ? 'Product created successfully'
    : actionType === 'update'
      ? 'Product edited successfully'
      : 'Product deleted successfully'
  setTimeout( () => {
    alertCnt.classList.add('d-none');
  }, 4000)
}

// funcione che refresga la querystring
function clearQueryString() {
  const url = new URL(window.location.href);
  url.search = '';
  window.history.replaceState({}, '', url.toString());
}

fetchProduct();



// Ottenimento URL corrente
const currentUrl = window.location.href;

// token
const originalUrl = `https://striveschool-api.herokuapp.com/api/product/`
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0YTIxM2RmZmI4YjAwMTQ0MTNjMTAiLCJpYXQiOjE2OTMwNjYzNTksImV4cCI6MTY5NDI3NTk1OX0.eU4qeKtTWwqehSdS_maw0o1lHVPf0xShTRpgNoXjEsg`

// Parsing dell'URL utilizzando l'oggetto URL
const url = new URL(currentUrl);

// Estrazione del parametro "id" dall'URL
const id = url.searchParams.get("id");


// Dichiarazione variabili da popolare
const headerId = document.getElementById(`productId`)
const nome = document.getElementById(`nomeProdotto`) 
const brand = document.getElementById(`brandProdotto`) 
const immagine = document.getElementById(`fotoProdotto`)
const prezzo = document.getElementById(`prezzoProdotto`) 
const descrizione = document.getElementById(`descrizioneProdotto`) 

// riempimento pagina
headerId.innerText = `ID:${id}`



async function popolamento(url,id) {
    try {
        const data = await fetch(url+id, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(data)
        const product = await data.json()
        console.log(product)
        
        nome.innerText = product.name;
        brand.innerText = `${product.brand}`;
        immagine.innerHTML = `<img src="${product.imageUrl}" alt="">`
        prezzo.innerText = `€${product.price}`;
        descrizione.innerText = product.description;

        } catch (error) {
        console.log('Errore nel recupero del prodotto: ', error);
        }
}
  popolamento(originalUrl,id)

  function goBack(){
    window.location.href = `index.html`
  }
  
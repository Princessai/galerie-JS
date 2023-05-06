let xhr = new XMLHttpRequest();
let url = new URL('https://pixabay.com/api/');
let key = '31651174-1e9a279a33aade1494d1b59a2';
let p = 1;

//Création de la fenêtre de navigation contenant le gestionnaire d'évènement
window.addEventListener('DOMContentLoaded', function () {
    // Création de la requête vers Pixabay
    xhr.open ("GET", `${url}?key=${key}&q=photo&page=${p}&per_page=20`);
    // Envoie de la requête au serveur
    xhr.send();
    // Chargement de la page 
    xhr.onload= function (){
        // Afficger un msg d'erreur dans la console lorsque le statut de la demande !=200 
        if (xhr.status != 200) {
            console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
        }
      
        data = JSON.parse(xhr.response);
        // appeler la fct affiche avec data en parametre
        affiche(data.hits);


    }
})

function affiche(tab){
  // 1.parcourir le tableau hits
  for (let i=0; i<20; i++) {
      // 2.creer une balise  image avec le lien du 'hits'
    let img= document.createElement('img');
    img.setAttribute('src', tab[i].previewURL);
    img.setAttribute('class', 'image');
    img.setAttribute('data-gros_plan', tab[i].largeImageURL);

  // 3.ratacher l'image à la div miniature
    document.getElementById('miniature').appendChild(img);
  };

  // sélectionner toutes les classes contenant "image"
document.querySelectorAll('.image').forEach(image => {
  // création de l'évènement
  image.addEventListener('click', function() {
      // afficher l'image en gros plan
      document.getElementById('gros_plan').style.display= 'flex';
      // Récupération des differentes images
      imageClique= image.getAttribute("data-gros_plan");
      document.getElementById('img_gros_plan').setAttribute('src', imageClique);
  });
});
}

function fermer (){
    // fermeture de l'image en gros plan
    document.getElementById('gros_plan').style.display= 'none';
}

function suivant (){
  // incrémenter les pages à chaque clique
  p=p+1;
  // faire une nouvelle requête à chaque fois
  xhr.open ('GET', `${url}?key=${key}&q=photo&page=${p}&per_page=20`);
  xhr.send();
  xhr.onload = function (){
    data = JSON.parse(xhr.response); 
    // remplacement des images précédentes
    document.getElementById('miniature').innerHTML=""
    affiche(data.hits);  
  };
  document.getElementById('gros_plan').style.display= 'none';
}

function précédent (){
  // décrémenter les pages à chaque clique
  p=p-1;
  // faire une nouvelle requête à chaque fois
  xhr.open ('GET', `${url}?key=${key}&q=photo&page=${p}&per_page=20`);
  xhr.send();
  xhr.onload = function (){
    data = JSON.parse(xhr.response); 
    // remplacement des images précédentes
    document.getElementById('miniature').innerHTML=""
    affiche(data.hits);  
  };
  document.getElementById('gros_plan').style.display= 'none';
}

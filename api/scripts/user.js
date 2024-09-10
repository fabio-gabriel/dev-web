function loadDocJSON(url, id) {
  fetch(url)
    .then(response => {
      response.json().then((data) => {
        document.getElementById(id).innerHTML = arrToUl(data);
      });
    }).catch(err => {
      console.error('Failed retrieving information', err);
    });
}

function arrToUl(response) {
  lista = response.lista;
  str = "<h3>" + response.nome + "</h3> <ul>";
  for (i = 0; i < lista.length; i++)
    str += "<li>" + lista[i] + "</li>";
  str += "</ul>";
  return str;
}

loadDocJSON("../data/users.json", "demo2");
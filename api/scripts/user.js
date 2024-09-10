function getDados(){
    fetch('../data/users.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.status);
        }
        return response.json();
      })
}
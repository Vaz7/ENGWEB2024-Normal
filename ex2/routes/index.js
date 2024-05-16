var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:16000/contratos')
                    .then(resposta => {
                      res.render('contratosList', {lista: resposta.data,data: d});
                    })
                    .catch( erro => {
                      res.render('error',{erro,message:'Erro ao recuperar os contratos.'})
                    })
});

router.get('/:id', function(req, res){
  var d = new Date().toISOString().substring(0, 16)
  axios.get('http://localhost:16000/contratos/' + req.params.id)
                    .then(resposta => {
                      res.render('contrato', {contrato: resposta.data,data: d});
                    })
                    .catch( erro => {
                      res.render('error',{erro,message:'Erro ao recuperar o contrado.'})
                    })
});


function calcularSomatorioContratos(contratos) {
  return contratos.reduce((total, contrato) => {
    const preco = parseFloat(contrato.precoContratual.replace(',', '.'));
    return total + (isNaN(preco) ? 0 : preco);
  }, 0);
}


router.get('/entidades/:id', function(req, res) {
  var d = new Date().toISOString().substring(0, 16);
  axios.get('http://localhost:16000/contratos?entidade=' + req.params.id)
    .then(resposta => {
      const lista = resposta.data;
      
      // Use the external function to calculate the sum
      let sum = calcularSomatorioContratos(lista);

      // Ensure sum is a string with two decimal places
      const formattedSum = sum.toFixed(2);

      console.log('Formatted Sum:', formattedSum); // Debugging log

      res.render('entidade', { lista: lista, data: d, sum: formattedSum });
    })
    .catch(erro => {
      res.render('error', { erro, message: 'Erro ao recuperar a entidade.' });
    });
});




module.exports = router;

var express = require('express');
var router = express.Router();
var Contrato = require("../controllers/contrato")


router.get('/contratos/entidades', function (req, res, next) {
  Contrato.listUniqueEntidades()
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error));
});

router.get('/contratos/tipos', function (req, res, next) {
  Contrato.listUniqueTipos()
      .then(data => res.jsonp(data))
      .catch(error => res.status(500).jsonp(error));
});

router.get('/contratos', function(req, res, next) {
  if(req.query.entidade){
    Contrato.listByEntidade(req.query.entidade)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
  }
  else if(req.query.tipo){
    Contrato.listByTipo(req.query.tipo)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
  }
  else if(Object.keys(req.query).length > 0){
    res.status(400).jsonp({ error: "Unknown query parameter" });
  }
  else{
    Contrato.list()
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
  }
  
});

router.get('/contratos/:id', function(req, res, next) {
  Contrato.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(error => res.jsonp(error));
});


router.post('/contratos', function(req, res) {
  const contratoData = req.body;
  Contrato.create(contratoData)
      .then(newContrato => {
          res.status(201).jsonp(newContrato);
      })
      .catch(error => {
          res.status(500).jsonp({ error: 'Failed to create contrato' });
      });
});

router.delete('/contratos/:id', function (req, res) {
  const contratoId = req.params.id;
  Contrato.delete(contratoId)
      .then(() => res.status(200).json({ message: `Deleted contrato id: ${contratoId}` }))
      .catch(error => res.status(500).json({ error: 'Failed to delete contrato' }));
});

router.put('/contratos/:id', function (req, res) {
  Contrato.edit(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.status(523).jsonp(erro))
});
module.exports = router;

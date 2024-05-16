var Contrato = require("../models/contrato")


module.exports.list=()=>{
    return Contrato.find()
    .sort({_id:1})
    .exec()
}

module.exports.findById = id =>{
    return Contrato
    .findOne({_id : id})
    .exec()
}


module.exports.listByEntidade = entidade =>{
    return Contrato
    .find({NIPC_entidade_comunicante: entidade})
    .exec()
}

module.exports.listByTipo = tipo =>{
    return Contrato
    .find({tipoprocedimento: tipo})
    .exec()
}

var Contrato = require("../models/contrato");

// Other methods...
function compareStrings(a, b) {
    return a.localeCompare(b, undefined, { sensitivity: 'base', ignorePunctuation: true });
  }


module.exports.listUniqueEntidades = () => {
    return Contrato.distinct('entidade_comunicante').then(tipos => {
        return tipos.sort(compareStrings);
      });
    }
  

module.exports.listUniqueTipos = () => {
    return Contrato.distinct("tipoprocedimento")
    .then(tipos => tipos.sort())
};



module.exports.create = (data) => {
    return Contrato.create(data); // Assuming 'Contrato' is your Mongoose model
};

module.exports.delete = (id) => {
    return Contrato.deleteOne({ _id: id }).exec();
};

module.exports.update = (id, newData) => {
    return Contrato.findByIdAndUpdate(id, newData, { new: true }).exec();
};
module.exports.edit = (id, comp) => {
    return Contrato.updateOne({_id : id}, comp)
  }
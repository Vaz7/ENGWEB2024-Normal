const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contratoSchema = new Schema({
  _id: Number,
  nAnuncio: String,
  tipoprocedimento: String,
  objectoContrato: String,
  dataPublicacao: String,
  dataCelebracaoContrato: String,
  precoContratual:String,
  prazoExecucao:Number,
  NIPC_entidade_comunicante:Number,
  entidade_comunicante:String,
  fundamentacao:String
}, { versionKey: false });

const Pessoa = mongoose.model('contrato', contratoSchema);

module.exports = Pessoa;

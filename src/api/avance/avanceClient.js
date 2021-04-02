const restful = require('node-restful')
const mongoose = restful.mongoose


const avanceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    telefone: {type: String, required: true},
    email:{ type: String, required: true},
    servico:{type: String, required: true},
    mensagem:{type:String, required: true}
})

module.exports = restful.model('AvanceClient', avanceSchema)
const avanceClient = require('./avanceClient');
const errorHandler = require('../common/errorHandler');

avanceClient.methods(['get','post','put','delete']);
avanceClient.updateOptions({new: true, runValidators: true});
avanceClient.after('post',errorHandler).after('put',errorHandler)

avanceClient.route('count',(req,res,next) =>{
    avanceClient.count((error, value) =>{
        if(error){
            res.status(500).json({errors:[error]})
        }else{
            res.json({value})
        }
    })
})

module.exports = avanceClient
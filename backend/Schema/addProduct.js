var mongoose = require('mongoose')

var addProductSchema = new mongoose.Schema(
    {
       slug:{type:String,require:true,unique:true},
        image:{type:String},
        title:{type:String,unique:true,required:true},
        images:[{
            public_id:{
                type:String
            },
            url:{
                type:String
            }
        }],
        Company:{type:String,required:true},
        price:{type:Number,required:true},
        Operating:{type:String},
        Camera:{type:String},
        Battery:{type:String},
        Dimension:{type:String},
        Weight:{type:String},
        Connectivity:{type:String},
        Signal:{type:String},
        ScreenSize:{type:String},
        
        Processor:{type:String},
        SimType:{type:String},
        MemoryCard:{type:String},
        variants:[
            {
                color:{type:String},
                storage:{type:String},
                price:{type:Number}
            }
        ]
    },
    {
        timestamps:true
    }
)

//image is a model which has a schema newproducts

const Product = mongoose.model('newproducts', addProductSchema)
module.exports = Product
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"],
        minlength:3,
        maxlength:20,
        trim:true,
        validate:{
            validator:function(value){
                const nameRegex =/^[a-zA-z\s]*$/;
                return nameRegex.test(value);
            },
            message:"First name must contain only alphabetic characters"
        }

    },
    lastName:{
        type:String,
        required:[true,"Last name is required"]
    },
    emailAddress:{
        type:String,
        required:[true,"Email Id is required"],
        unique:true
    },
    age:{
        type:Number,
        required:false
    }
});

module.exports = mongoose.model("Contact",contactSchema);
//Contact Routes

const express = require("express");
const router = express.Router();
const Contact = require("../models/Contacts")

// /api/contact
//Create Functionality
router.post('/contact',async(req,res)=>{
    try{
        const newContact= new Contact(req.body);
        await newContact.save()
        .then((savedContact)=>{
            console.log(savedContact);
            res.status(201).json({msg:"Contact successfully saved"});
        })
        .catch((error)=>{
            console.log(error);
            if(error.code==11000 && error.keyPattern && error.keyPattern.emailAddress){
                res.status(500).json({msg:"Email Address already exists"});

            }else{
                res.status(500).json({msg:"unable to create contact"});
            }
        });

    }catch(error){
        console.log(error);
        res.status(500).json({msg:"unable to save contact"});
    }
})
//Read Functionality - Read All Contacts
router.get('/contact',async(req,res)=>{
    try{
        Contact.find()
        .then((contacts)=>{
            console.log(contacts);
            res.status(200).json({contacts:contacts});


        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"Unable to get contacts"});
        })

        
    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Unable to fetch contacts"});
    }
})
//Read Functionality - Read single Contact
//api/contact/id

router.get('/contact/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        Contact.findById(id)
        .then((contactId)=>{
            console.log(contactId);
            res.status(200).json({contactId:contactId});

        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"Unable to get contacts"});
        })


    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Unable to fetch contact id"});
    }

})

//Search Functionality - Search Contacts
// api/contact/search

router.get('/search',async(req,res)=>{
    try{
        const searchTerm = req.query.searchTerm;
        console.log(searchTerm);

        const searchRegex = new RegExp(searchTerm,"i");

         await Contact.find({
            $or: [
                {firstName:searchRegex},
                {lastName:searchRegex},
                {emailAddress:searchRegex}
            ]
        })
        .then((contacts)=>{
            if(contacts.length){
            res.status(200).json({contacts:contacts})
            } else {
                res.status(500).json({contacts:[],msg:"No matching records found"});
            }

        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"unable to get the searchterm"});
        })


    }catch(error){
        console.log(error);
        res.status(500).json({msg:"No matchong records founds"});
    }
})

//Update Functionality 
//api/contact/:id

router.put('/contact/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedContact = req.body;
        await Contact.findOneAndUpdate({_id:id},updatedContact,{new:true})
        .then((updatedContact)=>{
            console.log(updatedContact);
            res.status(200).json({msg:"Contact successfully saved",contact:updatedContact});

        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json({msg:"Unable to update the data"});
        })




    }catch(error){
        console.log(error);
        res.status(500).json({msg:"Unable to update the data"});
    }
})

//Type of delete
// 1. Soft Delete -> update the field "active" ->Y/N
// 2. Hard Delete -> deletion of the record/document
//Delete Functionality
//api/delete/:id

router.delete('/contact/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        await Contact.findByIdAndDelete(id)
        .then((deletedContact)=>{
            console.log(deletedContact);
            res.status(200).json({msg:"Contact deleted successfully",contact:deletedContact})

        })
        .catch((error)=>{
            console.log(error);
            res.status(500).json("Unable to delete the conatact");
        })


    }catch(error){
        console.log(error);
        res.status(500).json("Unable to delete the conatact");
    }
})
module.exports = router;
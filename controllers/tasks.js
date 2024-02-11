const express = require('express')
const { Categorie, Post } = require('../schemas')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient;
const db = mongoose.connection;
const path = require("path")
const multer = require('multer');
const fileUpload = require("express-fileupload")

const GetAllCategories = (req, res) => {
    return res.send('Toate categoriile')
}
const AddNewCategory = async (req, res) => {
    const categoryName = req.body.categoryName;
    try {
        // const CategoryPost = mongoose.model(categoryName, Post.schema); NU E OK :)
        
        const existingCategory = await Categorie.findOne({ name: categoryName });
        
        if (existingCategory) {
            console.log('Category with the same name already exists');
            return res.status(409).json({ error: 'Category with the same name already exists' });
        }

        const categorie = new Categorie({name: categoryName, numberOfPosts: 0})
        await categorie.save()
        return res.json('Category added');
    } catch (error) {
        console.log('Error saving category:', error);
        return res.status(500).send('Error adding category'); 
    }
}
const GetAllFromCategory = (req, res) => {
    const category = req.params.category
    return res.send('ai intrat la ' + category)
}
const EditCategory = async (req, res) => {
    const oldCollectionName = req.params.category;
    const newCollectionName = req.body.newCategoryName; 

    const oldCollectionNameModified = oldCollectionName.toLowerCase() + 's';
    const newCollectionNameModified = newCollectionName.toLowerCase() + 's';    
    
    try {
        const dbClient = mongoose.connection.getClient(); 
        const db = dbClient.db(); 
                //rename the specific collection
                await db.renameCollection(oldCollectionNameModified, newCollectionNameModified);
                // rename the name field of the item coresponding to the category
        const updatedCategorie = await Categorie.findOneAndUpdate({name: oldCollectionName },{ name: newCollectionName }, { new: true });
      
          if (!updatedCategorie) {
            return res.status(404).json({ message: 'Categorie not found' });
          }
      
                //rename all of the posts from the post collection
        const filter = { Type: oldCollectionName }; // Filter to select documents with oldCollectionName
        const update = { Type: newCollectionName }; // Update to set the newCollectionName
        
        await Post.updateMany(filter, update)

                //rename all posts from the specific collection
        // await newCollectionName.updateMany(filter, update); 

          return res.json('Category eddited', updatedCategorie);
      } catch (error) {
        console.error('Error renaming collection:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    
}
const DeleteFromCategory = async (req, res) => {
    try {
        const name = req.params.category
        
        await Categorie.deleteOne({ name });
        await Post.deleteMany({ Type: name });

        return res.status(200).send('Category and related posts deleted successfully.');

    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

const EditPost =  async (req, res) => { 
    try {

        let fileName, file, uploadPath;

        // Check if an image was provided
        if (req.files && req.files.image) {
            fileName = Date.now() + "_" +  req.files.image.name;
            file = req.files.image;
            uploadPath = "C:\\Users\\negoi\\Desktop\\Vs code\\Copie_Airbnb_pentru_pisici\\public\\img\\" + fileName;

            file.mv(uploadPath, (err) => {
                if(err){
                    return res.send(err);
                }
            });
        }
        const postUpdates = {
            title: req.body.title,
            pricePerRoom: req.body.pricePerRoom,
            priceWholePlace: req.body.priceWholePlace,
            image: 'img/' + fileName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            checkInHour: req.body.checkInHour,
            checkOutHour: req.body.checkOutHour,
            Description: req.body.Description,
            aboutProperty: JSON.parse(Array.isArray(req.body.aboutProperty) ? req.body.aboutProperty : [req.body.aboutProperty]),
            facilities: JSON.parse(Array.isArray(req.body.facilities) ? req.body.facilities : [req.body.facilities]),
            extraServices: JSON.parse(Array.isArray(req.body.extraServices) ? req.body.extraServices : [req.body.extraServices]),
            rules: JSON.parse(Array.isArray(req.body.rules) ? req.body.rules : [req.body.rules]),
        };
        Object.keys(postUpdates).forEach(key => (postUpdates[key] == null ||
                                                 postUpdates[key] === "" ||
                                                 postUpdates[key] === undefined ||
                                                 postUpdates[key] === "img/undefined" || /*special pentru cazul in care nu adaug o imagine noua */
                                                 (Array.isArray(postUpdates[key]) && postUpdates[key].length === 1 && postUpdates[key][0] === ""))
                                                 && delete postUpdates[key]);
        const postId = req.params.post

        const editedPost = await Post.findOneAndUpdate({_id: postId }, { $set: postUpdates }, { new: true });

        if(!editedPost){
            return res.status(404).json({ message: 'Post not found' });
        }
        
        return res.json('Post Edited')
    } catch (error) {
        console.log('Error editing post by ID: ', error);
    }
    
}

const DeletePost = async (req, res) => {

    try {
        const postId = req.params.post
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
          }

        return res.json('Post Deleted')
    } catch (error) {
        console.log('Error deleting post by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}

const AddPost = async (req, res) => { 

    const fileName = Date.now() + "_" +  req.files.image.name;
    const file = req.files.image
    let uploadPath = "C:\\Users\\negoi\\Desktop\\Vs code\\Copie_Airbnb_pentru_pisici\\public\\img\\" + fileName;
    file.mv(uploadPath, (err) => {
      if(err){
        return res.send(err)
      }
    })


    const {type, title, pricePerRoom, priceWholePlace, phoneNumber, email, startDate, endDate, checkInHour, checkOutHour, Description} = req.body

    const aboutProperty = JSON.parse(Array.isArray(req.body.aboutProperty) ? req.body.aboutProperty : [req.body.aboutProperty]);
    const facilities = JSON.parse(Array.isArray(req.body.facilities) ? req.body.facilities : [req.body.facilities]);
    const extraServices = JSON.parse(Array.isArray(req.body.extraServices) ? req.body.extraServices : [req.body.extraServices]);
    const rules = JSON.parse(Array.isArray(req.body.rules) ? req.body.rules : [req.body.rules]);
    try {

       
        const post = new Post({
            Type: type,
            title: title,
            pricePerRoom: pricePerRoom,
            priceWholePlace: priceWholePlace,
            aboutProperty: aboutProperty,
            facilities: facilities,
            extraServices: extraServices,
            rules: rules,
            image: 'img/' + fileName,
            phoneNumber: phoneNumber,
            email: email,
            startDate: startDate,
            endDate: endDate,
            checkInHour: checkInHour,
            checkOutHour: checkOutHour,
            Description: Description,
            // Date: Date.now()
        })
        post.save()
        
        res.json('post added')

    } catch (error) {
        console.log('Error saving post:', error);
        return res.status(500).json('Error adding post'); 
    }

    
    
}

const IncrementNumber = async (req, res) => {
    try {
        const Type = req.body.Type;

        // Use $inc to increment the numberOfPosts field by 1
        const updatedCategorie = await Categorie.findOneAndUpdate(
            { name: Type },
            { $inc: { numberOfPosts: 1 } }, // Increment numberOfPosts by 1
            { new: true }
        );

        if (!updatedCategorie) {
            return res.status(404).json({ message: 'Categorie not found' });
        }

        console.log('update:', updatedCategorie);
        return res.json('Category edited', updatedCategorie);
    } catch (error) {
        console.log('Error incrementing number of posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const DecrementNumber = async (req, res) => {
    try {
        const category = req.body.category
        const updatedCategorie = await Categorie.findOneAndUpdate(
            { name: category },
            { $inc: { numberOfPosts: -1 } },
            { new: true }
        );

        if (!updatedCategorie) {
            console.log(category)
            return res.status(404).json({ message: 'Categorie not found' });
        }
        return res.status(200).json({ message: 'Category decremented' });
    } catch (error) {
        const category = req.body.category
        console.log(category)
        console.log('Error decrementing number of posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const AddComment = async (req, res) => {
    try {
        const postId = req.params.post;
        const userName = req.body.userName;
        const content = req.body.content;

        const newComment = {
            postId: postId,
            userName: userName,
            content: content,
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: newComment } },
            { new: true } // Return the updated document
        );
        res.json('Great success!')

        console.log(updatedPost);
    } catch (error) {
        console.error('Error adding a new comment: ', error)
    }
}
const GetAllInfoPost = (req, res) => {
    const post = req.params.post
    return res.send('all info ' + post)
}


const GetAllPosts = (req, res) => {
    const q = "SELECT * FROM posts"

    db.query( q, (err, data) => {
        if(err){
            res.send(err)
        }
        else{
            res.send(data)
            
        }
    })
}




module.exports = {
    GetAllCategories,
    AddNewCategory,
    GetAllFromCategory,
    EditCategory,
    DeleteFromCategory,
    GetAllInfoPost,
    EditPost,
    DeletePost,
    AddPost,
    IncrementNumber,
    DecrementNumber,
    AddComment,

    GetAllPosts,
    }
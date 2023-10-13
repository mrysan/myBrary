const express = require('express');
const router = express.Router(); // object to handle requests
const Author = require('../models/author')

// All authors route
router.get('/', async (req,res) => {
    let searchOptions = {};
    // this is triggered when a user hits search in the form
    if(req.query != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try{
        const authors = await Author.find(searchOptions); // get all of the authors
        res.render('authors/index', {
            authors:authors,
            searchOptions: req.query}); // renders the index authors file
    }catch{
        res.redirect('/');
    }
});

// New Author Route (for displaying the form)
router.get('/new',(req,res) => {
    // doesnt save anything, just creates an author object that can be used in the EJS file
    res.render('authors/new', {author: new Author()});
});

// Create Author Route
router.post('/',async (req,res) => {
    // doesnt need a file because it creates the author, it doesnt render anything 
    const author = new Author({
        name: req.body.name
    });

    try{
        const newAuthor = await author.save();
        console.log(newAuthor)
        //res.redirect(`authors/${newAuthor.id}`);
        res.redirect('authors');
    }catch{
        res.render('authors/new',{
            author:author,
            errorMessage: 'Error creating Autor'
        });
    }

    // // if it saves, display the author page
    // author.save().then((newAuthor,err)=>{
    //     console.log("saved author");
    //     console.log(newAuthor);
    //     console.log(err);
    //     if(err){
    //         res.render('authors/new',{
    //             author:author,
    //             errorMessage: 'Error creating Autor'
    //         })
    //     } else {
    //         //res.redirect(`authors/${newAuthor.id}`);
    //         console.log("redirecting");
    //         res.redirect('authors');
    //     }
    // });
});

module.exports = router;
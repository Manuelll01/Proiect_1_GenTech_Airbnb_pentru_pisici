const express = require('express')
const cors = require('cors')
const path = require('path')
const router = require('./routes/tasks')
const bodyParser = require('body-parser')
const multer = require('multer')

const mongoose = require('mongoose')
const { Categorie, Post } = require('./schemas');


const app = express();

// mongoose.connect("mongodb+srv://user1:parola1@cluster0.gmlp5sy.mongodb.net/")

// Configure cors to allow requests from your client-side origin
app.use(cors({
  origin: 'http://127.0.0.1:5500',
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use(express.static('public'))

//test multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img')
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({storage: storage})

  app.post("/upload", upload.single('image'), (req, res) => {
    res.send("image Uploaded!")
  })

//

  //mongoose
// const categorie = new Categorie({name: "Out in the garden", numberOfPosts: 0})
// categorie.save().then(() => console.log('Categorie salvata ' + categorie.name))


  //Templates with ejs 
app.set('view engine', 'ejs');
app.get('/', async (req, res) => {
  try {
    const categoriesData = await Categorie.find();
    const last3Posts = await Post.find().sort({ Date: -1 }).limit(3) // Sort by Date field in descending order (most recent first).limit(3)
    res.render('index', {data: {categories: categoriesData, posts: last3Posts}})
  } catch (error) {
    console.error('Error fetching data from MongoDB: ' + error);
    res.status(500).send('Internal Server Error');
  }
  })

app.get('/AddCategory', (req, res) => {
  res.render('addCategory', {data: {userQuery: 'aici adaugam o categorie'}});
})
app.get('/AddPost', async (req, res) => {
  try {
    const categoriesData = await Categorie.find();
    res.render('addPost', {data: {categories: categoriesData
   }})
  } catch (error) {
    console.error('Error fetching data from MongoDB: ' + error);
    res.status(500).send('Internal Server Error');
  }
  })
app.get('/:category', async (req, res) => {
  try {
    const category = req.params.category
    const posturiCategorie = await Post.find({ Type: category })
    if(!posturiCategorie){
      return res.status(404).send('Post not found');
    }

    res.render('category', {data: {posts: posturiCategorie, uri: req.params.category}});
  } catch (error) {
    console.error('Error fetching post categorie:', error);
    return res.status(500).send('Error fetching post categorie');
  }

  
})
app.get('/:category/edit', (req, res) => {
  let category = req.params.category
  res.render('categoryEdit', {data: {userQuery: `Aici vom edita categoria: ${category} `}});
})
app.get('/:category/:post/edit', (req, res) => {
  let category = req.params.category
  let post = req.params.post
  res.render('categoryEditPost', {data: {category: category, post: post} });
})

app.get('/:category/:post', async (req, res) => {
  
 try {
  let category = req.params.category
  let postId = req.params.post

  const post = await Post.findOne({ _id: postId });
  if (!post) {
    return res.status(404).send('Post not found');
  }

  const currentUri = `${req.protocol}://${req.get('host')}${req.url}`.split('http://localhost:3000/')[1];

  res.render('categoryPost', { data: { post }, uri: currentUri });
 } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).send('Error fetching post');
 }

  // const currentUri = `${req.protocol}://${req.get('host')}${req.url}`.split('http://localhost:3000/')[1];
  // res.render('categoryPost', {data: {userQuery: `categoria: ${category}, post: ${post}` }, uri: currentUri});
})



  //Router
app.use('/', router); 

app.listen(port, () => {
  console.log(`App listens on port ${port}...`);
});
mongoose.connect("mongodb+srv://user1:parola1@cluster0.gmlp5sy.mongodb.net/")
   .then(() => {
     console.log('Connected to MongoDB');
   })
   .catch((error) => {
     console.error('Failed to connect to MongoDB:', error);
   });

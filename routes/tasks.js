const express = require('express')
const router = express.Router(); 
const {
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
} = require('../controllers/tasks')

router.route('/').get(GetAllCategories);
router.route('/IncrementNumber').patch(IncrementNumber);
router.route('/DecrementNumber').patch(DecrementNumber);
router.route('/:category/:post/addComment').patch(AddComment);
router.route('/AddCategory').post(AddNewCategory)
router.route('/AddPost').post(AddPost); 
router.route('/:category').get(GetAllFromCategory).delete(DeleteFromCategory)
router.route('/:category/edit').patch(EditCategory)
router.route('/:category/:post').get(GetAllInfoPost).put(EditPost).delete(DeletePost);
router.route('/:category/:post/edit').patch(EditPost);





router.route('/GetAllPosts').post(GetAllPosts)

module.exports = router
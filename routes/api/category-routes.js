const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

/* req.body should look like this...
    {
     "category_name": "buffalo bills"
    }
  */

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
      const categoryInfo = await Category.findAll({
        include:[Product]
      });
      if(!categoryInfo){
        res.status(400).json({message: "Error, can't find categories"})
        return
      }
        res.status(200).json(categoryInfo)
    } catch(err){
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryInfo = await Category.findOne({
      where: {
        id: req.params.id
      },
      include:[Product]
    });
    if(!categoryInfo){
      res.status(400).json({message: "Error, can't find the category"})
      return
    }
      res.status(200).json(categoryInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategoryInfo = await Category.create(req.body);
    res.status(200).json(newCategoryInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryInfo = await Category.update(req.body, {
      where:{
        id: req.params.id
      }
    });
    res.status(200).json(categoryInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryInfo = await Category.destroy({
      where:{
        id: req.params.id
      }
    });
    res.status(200).json({categoryInfo, status: 'deleted category'})
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

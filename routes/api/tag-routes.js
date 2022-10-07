const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findAll({
      include:[{
        model: Product, 
        through: ProductTag
      }]
    });
    if(!tagInfo){
      res.status(400).json({message: "Error, can't find any tags"})
      return
    }
      res.status(200).json(tagInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include:[{
        model: Product,
        through: ProductTag
      }]
    });
    if(!tagInfo){
      res.status(400).json({message: "Error, can't find the tag"})
      return
    }
      res.status(200).json(tagInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTagInfo = await Tag.create(req.body);
    res.status(200).json(newTagInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const newTagInfo = await Tag.update(req.body, {
      where:{
        id: req.params.id
      }
    });
    res.status(200).json(newTagInfo)
  } catch(err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const newTagInfo = await Tag.destroy({
      where:{
        id: req.params.id
      }
    });
    res.status(200).json({newTagInfo, status: 'deleted tag'})
  } catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;

const router = express.Router()

router.get('/', async (req, res) => {
  const blog = await Blog
    .find()
    .then((blog) => {
      return blog
    })
    .catch((err) => {
      return err
    })

  res.status(200).json({
    data: blog
  })
})

router.get('/:id', async (req, res) => {
  const blog = await Blog
    .findOne()
    .where({
      _id: req.params.id
    })
    .then((blog) => {
      return blog
    })
    .catch((err) => {
      return err
    })

  res.status(200).json({
    data: blog
  })
})

router.post('/', (req, res) => {

  const newBlog = new Blog(req.body)
  newBlog
    .save()
    .then((blog) => {
      res.status(200).json({
        data: blog
      })
    })
    .catch((error) => {
      res
        .status(error.statusCode)
        .json(error)
    })

})

router.put('/', async (req, res) => {

  const where = {
    _id: req.body._id
  }

  delete req.body._id

  req.body.update = new Date()

  const blog = await Blog
    .update(where, req.body)
    .then((blog) => {
      return blog
    })

  res.status(200).json({
    data: blog
  })
})

router.delete('/', async (req, res) => {

  const where = {
    _id: req.body._id
  }

  const blog = await Blog
    .deleteOne(where)
    .then((blog) => {
      return blog
    })

  res.status(200).json({
    data: blog
  })
})

module.exports = router
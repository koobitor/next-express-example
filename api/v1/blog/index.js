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

// /api/v1/blog/1
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

router.put('/', (req, res) => {
  res.status(200).json({
    method: 'put',
    data: req.body
  })
})

router.delete('/', (req, res) => {
  res.status(200).json({
    method: 'delete',
    data: req.body
  })
})

module.exports = router

// http://localhost:3000/api/v1/blog/
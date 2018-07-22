const router = express.Router()

router.get('/', async (req, res) => {
  const todo = await Todo
    .find()
    .then((todo) => {
      return todo
    })
    .catch((err) => {
      return err
    })

  res.status(200).json({
    data: todo
  })
})

router.get('/:id', async (req, res) => {
  const todo = await Todo
    .findOne()
    .where({
      _id: req.params.id
    })
    .then((todo) => {
      return todo
    })
    .catch((err) => {
      return err
    })

  res.status(200).json({
    data: todo
  })
})

router.post('/', (req, res) => {

  const newTodo = new Todo(req.body)
  newTodo
    .save()
    .then((todo) => {
      res.status(200).json({
        data: todo
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

  const todo = await Todo
    .update(where, req.body)
    .then((todo) => {
      return todo
    })

  res.status(200).json({
    data: todo
  })
})

router.delete('/', async (req, res) => {

  const where = {
    _id: req.body._id
  }

  const todo = await Todo
    .deleteOne(where)
    .then((todo) => {
      return todo
    })

  res.status(200).json({
    data: todo
  })
})

module.exports = router
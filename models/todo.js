const todoSchema = Schema({
  task: String,
  status: String,
  group: String,
  create: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  }
})

Todo = mongoose.model('Todo', todoSchema)
const blogSchema = Schema({
  title: String,
  body: String,
  create: {
    type: Date,
    default: Date.now
  },
  update: {
    type: Date,
    default: Date.now
  }
})

Blog = mongoose.model('Blog', blogSchema)
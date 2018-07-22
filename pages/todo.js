import axios from 'axios'

class todo extends React.Component {

  static async getInitialProps() {
    const todo = await axios
      .get('http://localhost:3000/api/v1/todo')
      .then((todo) => {
        return todo
      })
    return { todo: todo.data.data }
  }

  constructor(props) {
    super(props)
    this.state = {
      todo: this.props.todo,
      task: ''
    }
    this.fetch = this.fetch.bind(this)
    this.submit = this.submit.bind(this)
    this.change = this.change.bind(this)
  }

  async submit(e) {
    e.preventDefault()
    await axios
      .post('http://localhost:3000/api/v1/todo',{ task:  this.state.task })
    this.fetch()
  }

  async fetch() {
    const todo = await axios
      .get('http://localhost:3000/api/v1/todo')
      .then((todo) => {
        return todo
      })
    this.setState({
      todo: todo.data.data,
      task: ''
    })
  }

  change(e) {
    this.setState({
      task: e.target.value
    })
  }

  async update(e,id) {
    let status
    if(e.target.checked){
      status = "complete"
    }else{
      status = "pending"
    }
    await axios
      .put('http://localhost:3000/api/v1/todo',{ _id: id, status: status })
    this.fetch()
  }

  render() {
    const { todo } = this.state
    return(
      <div>
        <form onSubmit={this.submit}>
          <input onKeyUp={this.change} />
        </form>
        <ul>
          {todo.map((item) => (
            <li style={{ textDecoration: item.status == "complete" ? 'line-through':'none' }}>
              <input
                type="checkbox"
                onClick={(e) => this.update(e, item._id)}
                checked={item.status == "complete" ? 'checked':''} />
                {item.task} - {item.status}
              </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default todo
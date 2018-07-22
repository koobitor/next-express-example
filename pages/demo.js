const Test = (props) => (
  <div style={{ color: 'red' }}>{props.title}</div>
)

class Demo extends React.Component {

  state = {
    data: 'Hello'
  }

  constructor() {
    super()
    this.changeData = this.changeData.bind(this)
  }

  changeData(){
    console.log('changeData',this)
    this.setState({
      data: 'Hi React'
    })
  }

  getTopic(e){
    console.log(e.target)
  }

  check(e) {
    console.log(e.target.value)
  }

  submit(e) {
    e.preventDefault()
    console.log(e.target)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input onChange={this.check} />
        </form>
        <h1 id="hello" onClick={this.getTopic}>{ this.state.data }</h1>
        <button onClick={this.changeData} >Change</button>
        <Test title={this.state.data} />
      </div>
    )
  }
}

export default Demo
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts'
import 'isomorphic-fetch'

class Index extends React.Component {

  static async getInitialProps() {
    const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
    const res = await fetch(url)
    const json = await res.json()
    const result = {
      key: new Date()
    }
    Object.keys(json.bpi).map((item) => {
      result[item] = json.bpi[item].rate_float
    })
    return { bitcoin: result }
  }

  constructor(props){
    super(props)

    this.state = {
      data: [this.props.bitcoin]
    }

    this.fetch = this.fetch.bind(this)
  }

  componentDidMount() {
    setInterval(() => {
      this.fetch()
    }, 5000)
  }

  async fetch() {
    const url = "https://api.coindesk.com/v1/bpi/currentprice.json"
    const res = await fetch(url)
    const json = await res.json()
    const result = {
      key: new Date()
    }
    Object.keys(json.bpi).map((item) => {
      result[item] = json.bpi[item].rate_float + 1
    })

    let { data } = this.state
    data.push(result)
    this.setState({
      data: data
    })
  }

  render() {
    const { data } = this.state
    console.log('render',data)
    return(
      <div>
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="USD" />
          <Line type="monotone" dataKey="GBP" />
          <Line type="monotone" dataKey="EUR" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="key" />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}

export default Index
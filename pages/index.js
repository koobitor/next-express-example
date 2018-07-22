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
    const res = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-07-01&end=2018-07-20')
    const json = await res.json()
    const data = Object.keys(json.bpi).map((item) => {
      return {
        key: item,
        value: json.bpi[item]
      }
    })
    return { bitcoin: data }
  }

  constructor(props){
    super(props)

    this.state = {
      bitcoin: this.props.bitcoin
    }
  }

  render() {
    const { bitcoin } = this.state
    return(
      <div>
        <LineChart width={400} height={400} data={bitcoin}>
          <Line type="monotone" dataKey="value" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="key" />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}

export default Index
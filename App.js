import React from 'react'
import SvgChart from './SvgChart'


const dataGraph = [
  {
    price: 12,
    time: 0,
    rawTime: 'Jan 1 2019'
  },
  {
    price: 14,
    time: 1,
    rawTime: 'Jan 10 2019'
  },
  {
    price: 13,
    time: 2,
    rawTime: 'Jan 15 2019'
  },
  {
    price: 8,
    time: 3,
    rawTime: 'Jan 20 2019'
  },
  {
    price: 9,
    time: 4,
    rawTime: 'Jan 25 2019'
  },
  {
    price: 15,
    time: 5,
    rawTime: 'Jan 31 2019'
  }
]

export default class App extends React.PureComponent {

  render () {
    return <SvgChart 
      dataGraph={dataGraph}
      avgPrice={9}
    />
  }
}
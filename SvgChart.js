import React from 'react'
import styled from 'styled-components'
import { View, Text as BaseText } from 'react-native'
import { LineChart } from 'react-native-svg-charts'
import { Circle, G, Line, Rect, Text } from 'react-native-svg'

const StyledGraph = styled(View).attrs({
})`
  flex: 1;
  justify-content: center;
  padding: 0 8px;
  border-bottom-width: 1;
  border-color: #DEDEDE;
  background-color: #fff;
`

const StyledAvgText = styled(BaseText).attrs({
})`
  margin-top: 8px;
  font-size: 11.2;
  font-weight: 400;
  color: grey;
`

export default class SvgChart extends React.PureComponent {

  state = {
    pointIndex: this.props.dataGraph.length > 1 ? this.props.dataGraph.length - 1 : 1
  }

  renderText = (x, y, data) => {
    const { pointIndex } = this.state
    const title = pointIndex === data.length - 1 ? 'Now' : data[pointIndex].rawTime
    return <G
      x={x(pointIndex)}
      y={y(data[pointIndex].price) - 10}>
      <Rect
        x={-35}
        y={-33}
        width="65" height="30" fillOpacity={.5} />
      <Text
        fontSize="10"
        // fontWeight="bold"
        dy={-25}
        dx={-5}
        fill={'white'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}>{title}</Text>
      <Text
        fontSize="10"
        // fontWeight="bold"
        dy={-10}
        dx={-5}
        fill={'white'}
        alignmentBaseline={'middle'}
        textAnchor={'middle'}>{'$' + data[pointIndex].price}</Text>
    </G>
  }

  render () {
    const { dataGraph, avgPrice } = this.props
    let data = [...dataGraph]
    if (dataGraph.length === 1) {
      data.push({
        price: dataGraph[0].price,
        time: 1,
        rawTime: dataGraph[0].rawTime
      })
    }

    const AvgPriceLine = ({ x, y, data }) =>
      <Line
        key={'zero-axis'}
        // x1={'0%'}
        // x2={'100%'}
        x1={x(0)}
        x2={x(data.length - 1)}
        y1={y(avgPrice)}
        y2={y(avgPrice)}
        stroke={'black'}
        strokeDasharray={[4, 8]}
        strokeWidth={1} />

    const Circles = ({ x, y, data }) => {
      const { pointIndex } = this.state
      const areaTouch = (25 * 7) / data.length // 7 items => radius 22
      return data.map((value, index) => {
        return <G>
          {index === pointIndex ? this.renderText(x, y, data) : null}
          <Circle
            cx={x(index)}
            cy={y(value.price)}
            r={pointIndex === index ? 5 : 3}
            stroke={pointIndex === index ? 'white' : 'black'}
            fill={pointIndex === index ? 'black' : 'white'} />
          <Circle
            onPress={() => this.setState({
              pointIndex: index
            })}
            key={value.index}
            cx={x(index)}
            cy={y(value.price)}
            r={areaTouch}
            strokeOpacity={.1}
            opacity={0} />
          {index === 0
            ? <G>
              <Text
                x={x(index)}
                y={y(data[index].price)}
                dy={20}
                dx={-5}
                alignmentBaseline={'left'}
                textAnchor={'left'}>Open</Text>
              <Text
                fontSize="11.2"
                fontWeight="bold"
                x={x(index)}
                y={y(data[index].price)}
                dy={35}
                dx={-5}
                alignmentBaseline={'left'}
                textAnchor={'left'}>${data[index].price}</Text>
            </G>
            : null}
        </G>
      })
    }

    return <StyledGraph>
      <StyledAvgText>{'Avg Price $' + avgPrice}</StyledAvgText>
      <LineChart
        style={{ height: 140 }}
        data={data}
        yAccessor={({ item }) => item.price}
        xAccessor={({ item }) => item.time}
        svg={{ stroke: 'black', strokeWidth: 2 }}
        contentInset={{ left: 20, right: 20, top: 45, bottom: 60 }}>
        <AvgPriceLine />
        <Circles />
      </LineChart>
    </StyledGraph>
  }
}
import React from 'react'
import PropTypes from 'prop-types'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

class JapanMap extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    defaultColor: PropTypes.string,
    strokeColor: PropTypes.string,
    prefectures: PropTypes.object
  }

  static defaultProps = {
    width: 500,
    height: 500,
    defaultColor: "#888888",
    strokeColor: "#333333",
    prefectures: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      prefectures: [],
    }
  }

  projection() {
    return geoMercator()
      .scale(1000)
      .center([150, 36])
  }

  componentDidMount() {
    fetch('/static/japan.topojson')
      .then(response => {
        if (response.status !== 200) {
          console.error(`There was a problem: ${response.status}`);
          return;
        }
        response.json().then(worldData => {
          this.setState({
            prefectures: feature(worldData, worldData.objects.japan).features
          });
        })
      })
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
        <g className="prefectures">
          {this.state.prefectures.map((d, i) => {
            const prefecture = d.properties.nam_ja;
            const color = this.props.prefectures[prefecture] && this.props.prefectures[prefecture].color || this.props.defaultColor
            return (
              <path
                key={`path-${i}`}
                d={geoPath().projection(this.projection())(d)}
                className="prefecture"
                fill={color}
                stroke={this.props.strokeColor}
                strokeWidth={0.5}
              />
            )
          })}
        </g>
      </svg>
    )
  }
}

export default JapanMap

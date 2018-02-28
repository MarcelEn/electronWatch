import React, { Component } from 'react';
import './App.css';
import moment from 'moment';


const transition = '0.7s';
const restTimeout = 700;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      hours: 0,
      minutes: 0,
      tSeconds: transition,
      tMinutes: transition,
      tHours: transition
    }
  }
  componentWillMount() {
    const start = moment().seconds();
    let sync = setInterval(() => {
      if (moment().seconds() > start) {
        clearInterval(sync)
        this.setState({
          seconds: moment().seconds(),
          minutes: moment().minutes(),
          hours: moment().hours()
        })
        setInterval(() => {
          let seconds = moment().seconds();
          let minutes = moment().minutes();
          let hours = moment().hours();
          let tSeconds = transition;
          let tMinutes = transition;
          if (seconds === 0) {
            seconds = 60;
          }
          if (minutes === 0) {
            minutes = 60;
          }
          if (hours === 0) {
            hours = 24;
          }
          this.setState({
            seconds,
            minutes,
            hours,
            tSeconds,
            tMinutes
          })

        }, 1000)
      }
    }, 1)
  }
  convert60InDeg(number) {
    return number / 60 * 360
  }
  convert12InDeg(number) {
    return number / 12 * 360
  }
  componentDidUpdate() {
    if (this.state.seconds === 60) {
      setTimeout(() => {
        this.setState({ tSeconds: '0s', seconds: 0 });
      }, restTimeout)
    }
    if (this.state.minutes === 60) {
      setTimeout(() => {
        this.setState({ tMinutes: '0s', minutes: 0 });
      }, restTimeout)
    }
    if (this.state.hours === 24) {
      setTimeout(() => {
        this.setState({ tHours: '0s', hours: 0 });
      }, restTimeout)
    }
  }
  render() {
    return (
      <div className="center">
        <div>
          <div className="theme" id="circle" />
        </div>
        <div style={{ transform: "rotate(" + this.convert12InDeg(this.state.hours) + "deg)", transition: this.state.tHours }}>
          <div className="theme pointer" id="hpointer" />
        </div>
        <div style={{ transform: "rotate(" + this.convert60InDeg(this.state.minutes) + "deg)", transition: this.state.tMinutes }}>
          <div className="theme pointer" id="mpointer" />
        </div>
        <div style={{ transform: "rotate(" + this.convert60InDeg(this.state.seconds) + "deg)", transition: this.state.tSeconds }}>
          <div className="theme pointer" id="spointer" />
        </div>
      </div>
    );
  }
}

export default App;

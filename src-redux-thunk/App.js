import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment,decrement,incrementAsync} from './redux/actions'
class App extends Component {
  // state={
  //   count: 0
  // }
  static propTypes={
    count: PropTypes.number.isRequired,
    increment:PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,

  }
  constructor(props){
    super(props)
    this.selectoption=React.createRef()
  }
  increment=()=>{
    const number = this.selectoption.current.value*1
    this.props.increment(number)
    
  }
  decrement=()=>{
    const number = this.selectoption.current.value*1
    this.props.decrement(number)

  }
  Odd=()=>{
    const number = this.selectoption.current.value*1
    if(this.props.count%2===1){
      this.props.increment(number)
    }

  }
  async=()=>{
    const number = this.selectoption.current.value*1
    this.props.incrementAsync(number)

  }
  render() {
    const count= this.props.count

    return (
      <div>
        <span>click {count} times</span>
        <div>

          <select ref={this.selectoption}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button onClick={this.increment}>+</button>
          <button onClick={this.decrement}>-</button>
          <button onClick={this.Odd}>increment if odd</button>
          <button onClick={this.async}>increment async</button>
        </div>
        
      </div>
    )
  }
}

// const mapStateToProps=(state)=>{

//   return {
//     count: state
//   }
// }
// const mapDispatchToProps=(dispatch)=>{
//   return {
//     increment:(number)=>dispatch(increment(number)),
//     decrement:(number)=>dispatch(decrement(number)),
//   }
// }
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(App)

export default connect(
  state=>({count:state}),
  {increment,decrement,incrementAsync}
)(App)
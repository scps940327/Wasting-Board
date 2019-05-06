import { connect } from 'react-redux';
import StateBoard from '../presentational/StateBoard.js';
import { add, sub } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    value: state.calculator.value
  }
}

function mapDispatchToProps(dispatch){
  return {
    onClickAdd: () => {
      dispatch(add());
    },
    onClickSub: () =>{
      dispatch(sub());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StateBoard);
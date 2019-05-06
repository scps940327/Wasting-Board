import { connect } from 'react-redux';
import BoardBody from '../presentational/BoardBody.js';
import { male, female } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    value: state.memberControl.name
  }
}

function mapDispatchToProps(dispatch){
  return {
    onClickMale: () => {
      dispatch(male());
    },
    onClickFemale: () =>{
      dispatch(female());
    }
  }
}

export default connect(mapStateToProps)(BoardBody);
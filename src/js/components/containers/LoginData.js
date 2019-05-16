import { connect } from 'react-redux';
import Login from '../presentational/Login.js';
import { getFbMemberInfo } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data: state.Control.member
  }
}

export default connect(mapStateToProps)(Login);
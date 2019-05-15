import { connect } from 'react-redux';
import Login from '../presentational/Login.js';
import { getFbMemberInfo } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data:{
      member: state.Control.member
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    getFbMemberInfo: (data) => {
      dispatch(getFbMemberInfo(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
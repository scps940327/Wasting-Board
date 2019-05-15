import { connect } from 'react-redux';
import Login from '../presentational/Login.js';
import { getFbMemberInfo } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data:{
      memberName: state.Control.member.name || ''
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
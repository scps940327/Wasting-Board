import { connect } from 'react-redux';
import Header from '../presentational/Header.js';
import { setFbMemberInfo } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data: state.Control.member
  }
}

function mapDispatchToProps(dispatch){
  return {
    setFbMemberInfo: (data) => {
      dispatch(setFbMemberInfo(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
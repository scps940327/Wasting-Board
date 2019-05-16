import { connect } from 'react-redux';
import BoardBody from '../presentational/BoardBody.js';
import { refreshPost, setFbMemberInfo } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data:{
      postData: state.Control.postItem || '',
      member: state.Control.member
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    refreshPost: (data) => {
      dispatch(refreshPost(data));
    },
    setFbMemberInfo: (data) => {
      dispatch(setFbMemberInfo(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardBody);
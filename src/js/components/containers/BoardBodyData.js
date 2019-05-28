import { connect } from 'react-redux';
import BoardBody from '../presentational/BoardBody.js';
import { refreshPost, setFbMemberInfo } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data:{
      postData: state.Control.postItem || '',
      pageState: state.Control.pageState,
      member: state.Control.member
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    refreshPost: (data, dataType) => {
      dispatch(refreshPost(data, dataType));
    },
    setFbMemberInfo: (data) => {
      dispatch(setFbMemberInfo(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardBody);
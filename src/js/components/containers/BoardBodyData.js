import { connect } from 'react-redux';
import BoardBody from '../presentational/BoardBody.js';
import { refreshPost } from '../../actions/action.js';

function mapStateToProps (state){
  return {
    data:{
      memberName: state.Control.member.name || '',
      postData: state.Control.postItem || ''
    }
  }
}

function mapDispatchToProps(dispatch){
  return {
    refreshPost: (data) => {
      dispatch(refreshPost(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardBody);
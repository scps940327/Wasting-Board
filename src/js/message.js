import React from "react"
import ReactDOM from "react-dom"
//從react-redux匯入Provider組件
import {Provider} from "react-redux"
//從index.js中匯出store，如果大大的路徑和我不同，記得要改一下！
import store from "./store.js"
//從react-redux匯入connect
import {connect} from "react-redux"

//上方的data會被傳入這個function中的state
const mapStateToProps = state => {
    /*透過回傳的物件來指定要取的資料，
    這裡把message取走，然後key值用data回傳*/
    return { data: state.message }
}

class MessageList extends React.Component {
    render(){
        let message = this.props.data.map((item)=>{
            return <li key={item.key}>{item.name}：{item.message}</li>
        })
        
        return(
            <ul>
                {message}
            </ul>
        )
    }
}

/*建立一個變數來存放connect回傳的組件，
注意這邊不是兩個參數哦！是兩個括號，
第一個給入mapStateToProps，第二個給要使用資料的組件*/
const List = connect(mapStateToProps)(MessageList);

class MessageForm extends React.Component {
    render(){
        return(
            //使用Provider組件記得要透過store屬性傳入import進來的store資料
            <Provider store={store}>
                //原本的MessageList已經被connect包成List了
                <List />
            </Provider>
        )
    }
}

ReactDOM.render(<MessageForm/>,document.getElementById('root'))
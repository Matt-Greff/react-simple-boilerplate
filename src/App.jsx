import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
var messSock = new WebSocket('ws://localhost:3001', 'connection');

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      currentUser: {name: 'anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
      };
      this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const content = e.target.content.value;
    
    messSock.send(
      JSON.stringify({//double qoutes needed for JSON
        "username": username,
        "content" : content
      })
    );
    e.target.content.value = '';
  }
  componentDidMount() {
    console.log('componentDidMount <App />');
    messSock.onopen = () => {
    };
    messSock.onmessage = (ev) => {
      const newMessage = JSON.parse(ev.data);
      const userCount = newMessage.userCount;
      if(userCount) this.setState({userCount})
      const messages = this.state.messages.concat(newMessage);
      this.setState({
        messages
      });
    }
  }
  render() {
    
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a><h2><strong>{this.state.userCount}</strong> users online</h2>
        </nav>
        <MessageList userColor={this.state.userColor} messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.onSubmit}/>  
      </div>
    );
  }
}
export default App;

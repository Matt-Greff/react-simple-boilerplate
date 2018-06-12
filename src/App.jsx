import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
              {
                  username: 'Bob',
                  content: 'Has anyone seen my marbles?',
              },
              {
                  username: 'Anonymous',
                  content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
              },
              {
                  username: 'Anonymous1',
                  content: 'changed their name to nomnom.'
              }
          ]
      };
      this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const content = e.target.content.value;
    const newMessage = {id: 3, username: username, content: content};
    const messages = this.state.messages.concat(newMessage);
    this.setState({messages: messages});
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
      
    }
  render() {

    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.onSubmit}/>  
      </div>
    );
  }
}
export default App;

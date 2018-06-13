import React, {Component} from 'react';
import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {
    constructor(props) {
      super(props);
    }
  render() {
    const messages = this.props.messages.map((message) => (
    message.type === 'message' ? <Message key={message.id} userColor={message.userColor} username={message.username} content={message.content} /> 
    : <Notification key={message.id} username={message.username} content={message.content} />));
    return (
    <main className='messages'>
      {messages}
    </main>
    );
  }
}
export default MessageList;
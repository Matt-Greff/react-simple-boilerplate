import React, {Component} from 'react';
class Message extends Component {
    constructor(props) {
        super(props);
      }
  render() {
      const username = this.props.username;
      const content = this.props.content;
    return (
        <div className="message">
          <span className="message-username">{username}</span>
          <span className="message-content">{content}</span>
        </div>
/* */
    );
  }
}
export default Message;
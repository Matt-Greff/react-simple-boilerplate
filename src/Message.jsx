import React, {Component} from 'react';

class Message extends Component {
    constructor(props) {
        super(props);
      }
  render() {

      const username = this.props.username; 
      const img = [];
      const content = this.props.content
      .replace(/(https?:\/\/\S*\.(png|jpg|gif))/gi, (match, p1)=> {
        img.push(<img src={p1}/>); 
        return '';
      });

      const userColor = this.props.userColor;
      const style = {color: userColor}
      console.log(...img);

    return (
        <div className="message">
          <span className="message-username" style={style}>{username}</span>
          <span className="message-content">{content}{img}</span>
        </div>
    );
  }
}
export default Message;
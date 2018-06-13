import React, {Component} from 'react';

class Notification extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const content = this.props.content;
    return (
    <main className="messages">
        <div className="message system">
          {content}
        </div> 
    </main>
    );
  }
}
export default Notification;
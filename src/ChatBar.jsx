import React, {Component} from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form className='chatbar' onSubmit={this.props.onSubmit}>
                    <input name='username' className='chatbar-username' placeholder={this.props.currentUser.name} />
                    <input name='content' className='chatbar-message' placeholder='Type a message and hit ENTER' />
                    <button style={{display:'none'}} type='submit'></button>
            </form>
        );
    }
}
export default ChatBar;
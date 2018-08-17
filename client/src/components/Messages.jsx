import React from 'react';
import Message from './Message.jsx';

class Messages extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<span>
			{this.props.messages.length ? (
					this.props.messages.map((message, index) => {
						return (
							<Message key={index} message={message}/>
							)
					})
					) : ''}
					</span>
			)
	}
}

export default Messages;


	
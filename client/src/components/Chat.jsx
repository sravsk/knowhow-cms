import React from 'react';
import { Grid, Header, Container, Button, Segment, Comment, Form} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import Message from './Message.jsx';
import Messages from './Messages.jsx';

class Chat extends React.Component {
	constructor(props) {
    super(props);
		this.state = {
			users : [],
			message : '',
			user: this.props.user,
			showUser : 'customer-name',
			messages : this.props.messages,
			uid : this.props.uid,
			appid : this.props.appid
		}
  }

  componentDidMount(){
		this.initializeChat();
	}


	initializeChat(){
		localStorage.setItem('user', this.state.user);
		localStorage.setItem('appid', this.state.appid)
		this.props.socket.on('message', (message) => {
			this.setState({
				messages : this.state.messages.concat([message])
			})
		})
	}

	onChange(e) {
		this.setState({
			message : e.target.value
		})
	}

	onKeyUp(e) {
		this.setState({
			showUser : 'customer-name-show'
		})
		if(e.key === 'Enter') {
			if(this.state.message.length){
				this.sendMessage({
					type : 'message',
					text : this.state.message
				})
				e.target.value = '';
				this.setState({
					showUser : 'customer-name'
				})
			} else {
				alert('Please enter a message');
			}
		 }
	}

	sendMessage(message, e){
		this.props.socket.emit('message', {
			user : this.state.user,
		  uid : localStorage.getItem('uid'),
			message : message,
			appid : this.state.appid
		})
	}

	render(){
    const isTyping = this.state.user;
		let user;
		if(isTyping) {
			user = isTyping + ' is typing...'
		}  else {
			user = ''
		}
		return(
			<Segment raised >
        <Header as='h2' textAlign='center'>
          Chat
        </Header>
        <Grid  style = {{ marginLeft: '2vw', marginRight: '2vw', 'border': 'none' }}>
          <Grid.Row>
          	<Comment.Group style={{ width: '100%', 'minHeight': '70vh', 'border': 'none' }}>
	           <Messages messages={this.state.messages} sendMessage={this.sendMessage.bind(this)} user={this.state.user} uid={this.state.uid}></Messages>
		           <Form reply>
				        <Form.Input 
				          autoComplete="off" 
				          placeholder="reply to customer" 
				          onChange={this.onChange.bind(this)} 
				          onKeyUp={this.onKeyUp.bind(this)} />
				       </Form>
				       <Comment.Metadata>
				       	<div className={this.state.showUser}>{this.state.user} is typing...</div>
				       </Comment.Metadata>
						 </Comment.Group>
          </Grid.Row>
        </Grid>
      </Segment>
			)
	}
}

export default Chat;


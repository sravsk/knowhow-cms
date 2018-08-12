import React from 'react';
import { Grid, Header, Container, Button, Segment, Comment, Form} from 'semantic-ui-react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import Message from './Message.jsx';

class Chat extends React.Component {
	constructor(props) {
    super(props);
    this.socket = null;
		this.state = {
			users : [],
			messages : [],
			message : '',
			user: '',
			isLoggedIn : false,
			showUser : 'customer-name'
		}
  }

  componentDidMount(){
		this.initializeChat();
		this.checkUser();
	}

	checkUser(){
		axios.get('/user')
	      .then(result => {
	        if (result.data) {
	          let name = result.data.user;
	          let companyId = result.data.companyId;
	          this.setState({
	            isLoggedIn: true,
	            user: name
	          });
	        }
	     })
    }

	initializeChat(){
		//expose a standalone build of socket io client by socket.io server 
		this.socket = socketIOClient('ws://localhost:5000');
		this.socket.on('message', (message) => {
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
		this.setState({
			messages : this.state.messages.concat({message : message })
		})
		this.socket.emit('message', {
			message : message
		})
	}

	render(){
		let renderMessages = this.state.messages.map((message, i) => {
      return (<Segment raised key={i}><Message user={this.state.user} message={message} /></Segment>);
    })
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
	           {renderMessages}
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


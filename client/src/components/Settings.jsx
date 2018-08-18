import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Message, Header } from 'semantic-ui-react';

class Settings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Segment raised style={{ 'height': '100vh' }}>
        <Header as='h2' textAlign='center'>
          Settings
        </Header>
        { (this.props.role === 'admin') && <div style={{display: 'flex', justifyContent: 'center', marginTop: '5vh'}}><Button><Link to='/inviteuser'>Invite a new user for your company</Link></Button></div>}<br/>
        <Message>
        <h4>Intall Know-How widget on your website (for logged-out visitors)</h4>
        <pre><code>{`<script src="https://s3-us-west-1.amazonaws.com/knowhow-s3/widget.js"></script>`}</code></pre>
        <pre><code>{`<script src="http://localhost:5000/chat-service.js"></script>`}</code></pre>
        <pre><code>{`<script type="text/javascript">`}</code></pre>
        <pre><code>{`EmbeddableWidget.mount(${this.props.companyId});`}</code></pre>
        <pre><code>{`EmbeddableChatService.mount();`}</code></pre>
        <pre><code>{`</script>`}</code></pre>
        <br/>
        <h4>Intall Know-How widget on your website (for logged-in users)</h4>
        <pre><code>{`<script src="https://s3-us-west-1.amazonaws.com/knowhow-s3/widget.js"></script>`}</code></pre>
        <pre><code>{`<script src="http://localhost:5000/chat-service.js"></script>`}</code></pre>
        <pre><code>{`<script type="text/javascript">`}</code></pre>
       <pre><code>{`EmbeddableWidget.mount(${this.props.companyId});`}</code></pre>
        <pre><code>{`EmbeddableChatService.mount({ app_id : name : 'sample name' // Full name })`}</code></pre>
        <pre><code>{`</script>`}</code></pre>
        </Message>
      </Segment>);
  }
}

export default Settings;
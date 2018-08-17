import React from 'react';
import { Grid, Header, Container, Button, Segment, Comment, Form} from 'semantic-ui-react';

const Message = (props) => {

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }


  var d = new Date();
  return(
      <Comment>
        <Comment.Avatar src='https://s3-us-west-1.amazonaws.com/knowhow-s3/assets/matt.jpg' />
        <Comment.Content>
          <Comment.Author as='a'>{props.message.user}</Comment.Author>
          <Comment.Metadata>
            <div>Today at {formatAMPM(d)}</div>
          </Comment.Metadata>
          <Comment.Text>
           {props.message.message.text}
          </Comment.Text>
        </Comment.Content>
      </Comment>
    )
}

export default Message;


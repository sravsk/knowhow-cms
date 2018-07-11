import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar.jsx';

const Dashboard = () => {
  return (
    <Container>
    <NavBar />
    <div>This is the Dashboard page</div>
    </Container>
  );
}

export default Dashboard;
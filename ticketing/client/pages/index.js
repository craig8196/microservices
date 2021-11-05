import axios from 'axios';
import ssrclient from '../api/ssr-client';


const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page {currentUser ? 'Signed In as ' + currentUser.email : 'Signed Out'}</h1>;
};

LandingPage.getInitialProps = async (context) => {
  try {
    const response = await ssrclient(context).get('/api/users/currentuser');
    return response.data;
  } catch (err) {
    console.log(err.message);
    return { currentUser: null };
  }
};

export default LandingPage;


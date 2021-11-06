

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page {currentUser ? 'Signed In as ' + currentUser.email : 'Signed Out'}</h1>;
};

export default LandingPage;


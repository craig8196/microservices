import 'bootstrap/dist/css/bootstrap.css';
import ssrclient from '../api/ssr-client';
import Header from '../components/header';


const AppComponent = ({ Component, pageProps, currentUser }) => {
  pageProps.currentUser = currentUser;
  const headerProps = { currentUser };
  return (
    <div>
      <Header { ...headerProps } />
      <Component { ...pageProps } />;
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  let data = { currentUser: null };

  try {
    const client = ssrclient(appContext.ctx);
    const response = await client.get('/api/users/currentuser');
    data = response.data;
  } catch (err) {
    console.log(err.message);
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data
  };
};

export default AppComponent;

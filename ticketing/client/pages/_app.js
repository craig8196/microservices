import 'bootstrap/dist/css/bootstrap.css';

const applyToComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default applyToComponent;

// /pages/_app.js
import '../styles/global.css'; // Ensure this path is correct

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
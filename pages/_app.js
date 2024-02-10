import Layout from "../components/Layout/Layout";
import "../styles/globals.css";
import rootReducer from "../reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer, composeWithDevTools());

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

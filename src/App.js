import logo from './logo.svg';
import './App.css';
import HomePage from './pages/homepage/HomePage';
import Navbar from './componets/navbar/Navbar';
import AppLunch from './componets/routes/AppLunch';
import store from './redux/store';
import { Provider } from 'react-redux';
import {Cloudinary} from "@cloudinary/url-gen";
function App() {
  
  return (
  <>
  <Provider store={store}>
  <AppLunch/>
  </Provider>
  </>
  );
}

export default App;

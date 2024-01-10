
import './App.css';
import AppLunch from './componets/routes/AppLunch';
import store from './redux/store';
import { Provider } from 'react-redux';

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

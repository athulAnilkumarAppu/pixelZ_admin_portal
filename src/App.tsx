import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminPortalIndex from './components';
import IndexRouter from './components/router/Index';

function App() {
  return (
    <div style={{backgroundColor: 'yellow'}}>

    <IndexRouter />
    
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"

/>
    </div>

  );
}

export default App;

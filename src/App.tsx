import { Provider as ReduxProvider } from "react-redux";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import { store } from "./store";
import Home from "./pages/Home";
import PairingCode from "./pages/PairingCode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

function App() {
  return (
    <ReduxProvider store={store}>
      <div className="App">
        <HashRouter>
          <Routes>
            <Route path="/" element={<PairingCode />} />
            <Route path="home" element={<Home />} />
          </Routes>
        </HashRouter>
      </div>
    </ReduxProvider>
  );
}

export default App;

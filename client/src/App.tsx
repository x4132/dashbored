import Clock from "./components/Clock";
import InternetStatus from "./components/InternetStatus";
import ShopifyStatus from "./components/ShopifyStatus";
import System from "./components/System";
import "./css/theme.scss";

function App() {

  return (
    <div id="root" className="bg-dark text-light p-4">
      <div className="d-flex flex-column h-100">
        <div className="d-flex h-25" >
          <Clock />
          <ShopifyStatus />
          <InternetStatus />
        </div>
        <div className="d-flex h-25" >
          <System />
        </div>
      </div>
    </div>
  )
}

export default App;
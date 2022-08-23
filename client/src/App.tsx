import Clock from "./components/Clock";
import "./css/theme.scss";

function App() {

  return (
    <div id="root" className="bg-dark text-light p-4">
      <div className="d-flex flex-column h-100">
        <div className="d-flex h-25" >
          <Clock />
        </div>
      </div>
    </div>
  )
}

export default App;
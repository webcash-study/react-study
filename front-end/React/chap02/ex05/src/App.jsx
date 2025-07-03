import Alert from "./Alert";
import Form from "./Form";
import Propagation from "./Propagation";

function App() {
  return (
    <div>
      <Alert onAlert={() => alert("world")} />
      <Form />
      <Propagation />
    </div>
  );
}

export default App;

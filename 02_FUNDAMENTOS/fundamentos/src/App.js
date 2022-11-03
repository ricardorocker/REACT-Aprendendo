// Components
import FirstComponent from "./components/FirstComponent";
import TemplateExpressions from "./components/TemplateExpressions";
import MyComponent from "./components/MyComponent";

// Styles / CSS
import './App.css';
import Events from "./components/Events";

function App() {
  return (
    <div className="App">
      <h1>Fundamentos React</h1>
      <FirstComponent />
      <TemplateExpressions />
      <MyComponent />
      <Events />
    </div>
  );
}

export default App;

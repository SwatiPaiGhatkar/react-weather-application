import "./App.css";
import Weather from "./Weather";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <Weather defaultCity="Tokyo" />
        <footer className="footer">
          This project was coded by{" "}
          <a
            href="https://github.com/SwatiPaiGhatkar?tab=repositories"
            target="_blank"
            rel="noreferrer"
          >
            Swati Pai
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/SwatiPaiGhatkar/react-weather-application"
            target="_blank"
            rel="noreferrer"
          >
            open-sourced on GitHub.
          </a>
        </footer>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/homePage";
import Boneco from "./assets/boneco.png";
import "./App.css";
import Question1 from "./pages/question1";
import FinalMessage from "./pages/finalMessage";
import Question2 from "./pages/question2";
import Question3 from "./pages/question3";
import Question4 from "./pages/question4";
import Question5 from "./pages/question5";

export const Menino = () => {
  return <img className="boneco" src={Boneco} />;
};

function App() {
  const navigate = useNavigate();
  const [ruim, setRuim] = useState(0);
  const [neutro, setNeutro] = useState(0);
  const [bom, setBom] = useState(0);
  const [animate, setAnimate] = useState(false); 

  useEffect(() => {
    navigate("/");
  }, []);

  useEffect(() => {
    setAnimate(true); 
    const timeout = setTimeout(() => setAnimate(false), 500); 
    return () => clearTimeout(timeout);
  }, [ruim, neutro, bom]); 

  return (
    <div className="pageBg">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/pergunta1"
          element={<Question1 ruim={ruim} setRuim={setRuim} neutro={neutro} setNeutro={setNeutro} bom={bom} setBom={setBom} animate={animate} />}
        />
        <Route
          path="/pergunta2"
          element={<Question2 ruim={ruim} setRuim={setRuim} neutro={neutro} setNeutro={setNeutro} bom={bom} setBom={setBom} animate={animate} />}
        />
        <Route
          path="/pergunta3"
          element={<Question3 ruim={ruim} setRuim={setRuim} neutro={neutro} setNeutro={setNeutro} bom={bom} setBom={setBom} animate={animate} />}
        />
        <Route
          path="/pergunta4"
          element={<Question4 ruim={ruim} setRuim={setRuim} neutro={neutro} setNeutro={setNeutro} bom={bom} setBom={setBom} animate={animate} />}
        />
        <Route
          path="/pergunta5"
          element={<Question5 ruim={ruim} setRuim={setRuim} neutro={neutro} setNeutro={setNeutro} bom={bom} setBom={setBom} animate={animate} />}
        />
        <Route path="/final" element={<FinalMessage ruim={ruim} neutro={neutro} bom={bom} animate={animate} />} />
      </Routes>
    </div>
  );
}

export default App;

import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const Question3 = ({ ruim, setRuim, neutro, setNeutro, bom, setBom, animate }) => {
    const navigate = useNavigate();
    const [message] = useState(
        <>
            <strong>Você está no intervalo e vê um grupo de alunos falando mal de outro, como você reage?</strong>
            <div onClick={() => handleButton('A')}><strong>A:</strong> Fico em silêncio, não quero me meter.</div>
            <div onClick={() => handleButton('B')}><strong>B:</strong> Dou risada, já que todo mundo está participando.</div>
            <div onClick={() => handleButton('C')}><strong>C:</strong> Tento conversar com o grupo e sugerir que parem, pois isso não é legal.</div>
        </>
    );

    const handleButton = (option) => {
        if (option === "A") {
            setNeutro(neutro + 1);
        } else if (option === "B") {
            setRuim(ruim + 1);
        } else if (option === "C") {
            setBom(bom + 1);
        }
        navigate('/pergunta4');
    };

    return (
        <>
            <div className={`messageLayout ${animate ? "fade-in" : ""}`} >
                {message}
            </div>
            <Menino />
            <div className="descHub">
                Clique na alternativa desejada.
            </div>
        </>
    );
};

export default Question3;

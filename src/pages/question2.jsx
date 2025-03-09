import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const Question2 = ({ ruim, setRuim, neutro, setNeutro, bom, setBom, animate }) => {
    const navigate = useNavigate();
    const [message] = useState(
        <>
            <strong>Você está em uma roda de amigos e um deles começa a imitar alguém da turma de uma forma engraçada, mas meio humilhante. O que você faz?</strong>
            <div onClick={() => handleButton('A')}><strong>A:</strong> Eu também começo a imitar, todo mundo vai rir.</div>
            <div onClick={() => handleButton('B')}><strong>B:</strong> Tento mudar de assunto, para não ficar incomodando ninguém.</div>
            <div onClick={() => handleButton('C')}><strong>C:</strong> Falo para o meu amigo parar, porque pode magoar a pessoa que está sendo imitada.</div>
        </>
    );

    const handleButton = (option) => {
        if (option === "A") {
            setRuim(ruim + 1);
        } else if (option === "B") {
            setNeutro(neutro + 1);
        } else if (option === "C") {
            setBom(bom + 1);
        }
        navigate('/pergunta3');
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

export default Question2;

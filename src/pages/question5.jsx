import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const Question5 = ({ ruim, setRuim, neutro, setNeutro, bom, setBom, animate }) => {
    const navigate = useNavigate();
    const [message] = useState(
        <>
            <strong>Você está vendo uma briga acontecendo entre dois colegas. O que você faz?</strong>
            <div onClick={() => handleButton('A')}><strong>A:</strong> Fico assistindo, não quero me envolver.</div>
            <div onClick={() => handleButton('B')}><strong>B:</strong> Chamo algum adulto para resolver a situação.</div>
            <div onClick={() => handleButton('C')}><strong>C:</strong> Incentivo a briga para ver no que vai dar.</div>
        </>
    );

    const handleButton = (option) => {
        if (option === "A") {
            setNeutro(neutro + 1);
        } else if (option === "B") {
            setBom(bom + 1);
        } else if (option === "C") {
            setRuim(ruim + 1);
        }
        navigate('/final');
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

export default Question5;

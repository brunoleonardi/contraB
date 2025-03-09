import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const Question4 = ({ ruim, setRuim, neutro, setNeutro, bom, setBom, animate }) => {
    const navigate = useNavigate();
    const [message] = useState(
        <>
            <strong>Um colega novo na escola está tentando se enturmar, mas não sabe como. Como você o recebe?</strong>           
            <div onClick={() => handleButton('A')}><strong>A:</strong> Eu nem ligo para ele, ele que se vire.</div>
            <div onClick={() => handleButton('B')}><strong>B:</strong> Tento ajudar ele a se enturmar, chamando ele para se juntar ao grupo.</div>
            <div onClick={() => handleButton('C')}><strong>C:</strong> Ignoro, talvez ele nem queira se juntar a nós.</div>
        </>
    );

    const handleButton = (option) => {
        if (option === "A") {
            setRuim(ruim + 1);
        } else if (option === "B") {
            setBom(bom + 1);
        } else if (option === "C") {
            setNeutro(neutro + 1);
        }
        navigate('/pergunta5');
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

export default Question4;

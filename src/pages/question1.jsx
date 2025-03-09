import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const Question1 = ({ ruim, setRuim, neutro, setNeutro, bom, setBom }) => {
    const navigate = useNavigate()
    const [message] = useState(
        <>
            <strong>O que você faria se visse um colega rindo da roupa de outro estudante?</strong>
            <div onClick={() => handleButton('A')}><strong>A:</strong> Eu perguntaria ao colega por que ele está rindo e tentaria entender o motivo.</div>
            <div onClick={() => handleButton('B')}><strong>B:</strong> Eu riria junto com ele, já que todo mundo está rindo.</div>
            <div onClick={() => handleButton('C')}><strong>C:</strong> Eu falaria com o colega que está sendo alvo da piada, para ele se sentir melhor.</div>
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
        navigate('/pergunta2')
    }

    return (
        <>
            <div className="messageLayout">
                {message}
            </div>
            <Menino />
            <div className="descHub">
                Clique na alternativa desejada.
            </div>
        </>
    )
}

export default Question1
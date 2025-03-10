import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [message, setMessage] = useState('Oi sou Enzo. Que bom te ver por aqui! Eu adoro observar como as pessoas lidam com diferentes situações no dia a dia.')
    const [buttonText, setButtonText] = useState('Avançar')
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()


    const handleButton = () => {
        setCounter(counter + 1)
        if (counter === 0) {
            setMessage('Já parou para pensar em como reagimos quando alguém faz uma brincadeira que pode passar do limite? Ou como nos sentimos quando estamos em um grupo novo?')
        } else if (counter === 1) {
            setMessage('Hoje, quero testar seu jeito de lidar com algumas situações comuns na escola. Você topa? É só responder o que faria em cada caso.')
        } else {
            setMessage('No final, vou te contar um pouco mais sobre o seu estilo de convivência! Bora lá? 🚀')
            setButtonText('Bora!')
        }

        if (buttonText === 'Bora!') {
            navigate('/pergunta1')
        }
    }

    return (
        <>
            <div className="messageLayout slide-in">
                {message}
            </div>
            <Menino className="slide-in" />
            <div className="buttonHub slide-in">
                <Button sx={{fontSize: '20px'}} onClick={handleButton} color="info" variant="contained">{buttonText}</Button>
            </div>
        </>
    )
}

export default HomePage
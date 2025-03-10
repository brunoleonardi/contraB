import { Button } from "@mui/material";
import React, { useState } from "react";
import { Menino } from "../App";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    //   
    const [message, setMessage] = useState('E aí, que bom te ver por aqui! Já parou pra pensar em como a gente manda ver (ou dá aquela vacilada) quando rola uma zoeira que passa do ponto?')
    const [buttonText, setButtonText] = useState('Avançar')
    const [counter, setCounter] = useState(0)
    const navigate = useNavigate()


    const handleButton = () => {
        setCounter(counter + 1)
        if (counter === 0) {
            setMessage('Ou quando chegamos num grupo novo e bate aquele misto de ansiedade e empolgação?')
        } else if (counter === 1) {
            setMessage('Bora trocar uma ideia e ver como você lida com essas situações no dia a dia!')
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
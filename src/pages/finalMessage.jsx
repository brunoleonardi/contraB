import React, { useState, useEffect } from "react";
import { Menino } from "../App";
import BonecoBom from "../assets/bonecoBom.png";
import BonecoNormal from "../assets/bonecoNormal.png";
import BonecoJoia from "../assets/bonecoJoia.png";
import { Button } from "@mui/material";

const FinalMessage = ({ ruim, neutro, bom }) => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");
    const [buttonText, setButtonText] = useState("Avançar");
    const [counter, setCounter] = useState(0);
    const [style, setStyle] = useState({});
    const [classname, setClassname] = useState('');

    useEffect(() => {
        if (ruim > neutro && ruim > bom) {
            setImage(BonecoNormal);
            setMessage("Suas respostas indicam que, em alguns momentos, suas atitudes podem reforçar ou incentivar situações prejudiciais. É sempre possível mudar e repensar nossas escolhas. Se colocar no lugar do outro pode fazer toda a diferença! Pequenas mudanças no seu comportamento podem tornar o ambiente mais respeitoso e seguro para todos.");
        } else if (neutro > ruim && neutro > bom) {
            setImage(BonecoBom);
            setMessage("Você tende a se manter à parte em algumas situações, talvez sem perceber o impacto que isso pode ter. Mesmo sem agir diretamente contra alguém, ficar em silêncio pode fortalecer comportamentos negativos. Que tal tentar se posicionar mais quando vir algo injusto? Sua atitude pode transformar o dia de alguém.");
        } else if (bom > ruim && bom > neutro) {
            setImage(BonecoJoia);
            setMessage("Parabéns! Suas escolhas mostram que você se preocupa com o bem-estar dos outros e contribui para um ambiente mais respeitoso e acolhedor. Pequenas atitudes como as suas podem fazer uma grande diferença na vida de alguém. Continue assim!");
        } else {
            setImage(BonecoBom);
            setMessage("Você demonstra empatia em algumas situações, mas pode acabar reforçando certos comportamentos sem perceber. O importante é refletir sobre o impacto de cada atitude. Todos nós podemos evoluir e tornar nossas relações mais saudáveis e respeitosas!");
        }
        sendResponses(ruim, neutro, bom);
    }, [ruim, neutro, bom]);

    const sendResponses = async (ruim, neutro, bom) => {
        try {
            const response = await fetch('/api/saveResponses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ruim, neutro, bom }),
            });

            const data = await response.json();
            console.log('Exito ao enviar respostas', data.message);
        } catch (error) {
            console.error('Erro ao enviar respostas:', error);
        }
    };

    const handleButton = () => {
        setCounter(counter + 1);
        if (counter === 0) {
            setClassname('')
            setMessage(`Se você está passando por uma situação de bullying ou viu alguém sofrendo, lembre-se: você não está sozinho.
            Falar com alguém de confiança — como seus pais, um professor ou um amigo — pode ser o primeiro passo para mudar tudo.`);
        } else if (counter === 1) {
            setClassname('')
            setMessage(`Não deixe o bullying calar sua voz. Você merece ser respeitado e apoiado!
            Não tenha medo de pedir ajuda. Sua coragem pode transformar sua história!`);
        } else if (counter === 2) {
            setClassname('lastFont')
            setStyle({ background: '#000', color: '#fff' })
            setMessage(`BULLYING É CRIME!

            A Lei 14.811/2024, em vigor desde 2024, incluiu o bullying no Código Penal Brasileiro. 
            A pena para quem praticar bullying é uma multa, enquanto quem cometer cyberbullying poderá ser punido com reclusão de dois a quatro anos, além de multa.`);
        }
    };

    return (
        <>
            <div className={`messageLayout slide-in ${classname}`} style={style}>
                {message}
                {counter !== 3 && (
                    <>
                        <Button sx={{ fontSize: '20px', mt: 4 }} onClick={handleButton} color="info" variant="contained">
                            {buttonText}
                        </Button>
                    </>
                )}
                {counter === 3 && (
                    <div className="university">
                        UNIDADE CURRICULAR DE EXTENSÃO:
                        Prevenção e Combate ao Bullying
                        <br />
                        PRODUZIDO POR ALUNOS DA UNIVERSIDADE NOVE DE JULHO – PSICOLOGIA:
                        Alane, Alessandra, Brenda, Dani, Herivelto, Igor, Luis, Renata e Thales.
                    </div>
                )}
            </div>
            {counter !== 3 && (
                <Menino image={image} className="slide-in" />
            )}
        </>
    );
};

export default FinalMessage;

import React, { useState, useEffect } from "react";
import { Menino } from "../App";
import BonecoBom from "../assets/bonecoBom.png";
import BonecoNormal from "../assets/bonecoNormal.png";
import BonecoJoia from "../assets/bonecoJoia.png";

const FinalMessage = ({ ruim, neutro, bom }) => {
    const [message, setMessage] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (ruim > neutro && ruim > bom) {
            setImage(BonecoNormal)
            setMessage("Suas respostas indicam que, em alguns momentos, suas atitudes podem reforçar ou incentivar situações prejudiciais. É sempre possível mudar e repensar nossas escolhas. Se colocar no lugar do outro pode fazer toda a diferença! Pequenas mudanças no seu comportamento podem tornar o ambiente mais respeitoso e seguro para todos.");
        } else if (neutro > ruim && neutro > bom) {
            setImage(BonecoBom)
            setMessage("Você tende a se manter à parte em algumas situações, talvez sem perceber o impacto que isso pode ter. Mesmo sem agir diretamente contra alguém, ficar em silêncio pode fortalecer comportamentos negativos. Que tal tentar se posicionar mais quando vir algo injusto? Sua atitude pode transformar o dia de alguém.");
        } else if (bom > ruim && bom > neutro) {
            setImage(BonecoJoia)
            setMessage("Parabéns! Suas escolhas mostram que você se preocupa com o bem-estar dos outros e contribui para um ambiente mais respeitoso e acolhedor. Pequenas atitudes como as suas podem fazer uma grande diferença na vida de alguém. Continue assim!");
        } else {
            setImage(BonecoBom)
            setMessage("Você demonstra empatia em algumas situações, mas pode acabar reforçando certos comportamentos sem perceber. O importante é refletir sobre o impacto de cada atitude. Todos nós podemos evoluir e tornar nossas relações mais saudáveis e respeitosas!");
        }
    }, [ruim, neutro, bom]);

    return (
        <>
            <div className="messageLayout">
                {message}
            </div>
            <Menino image={image} />
        </>
    );
};

export default FinalMessage;

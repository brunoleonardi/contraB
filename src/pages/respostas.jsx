import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";

const TabelaRespostas = () => {
    const [dados, setDados] = useState([])

    useEffect(() => {
        getResponses();
    }, [])

    const getResponses = async () => {
        const res = await fetch('/api/getResponses');
        const data = await res.json();
        setDados(data)
        console.log(data);
    };

    return (
        <div className="respostas">
            <div className="titleRespostas">RESPOSTAS</div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Ruim</strong></TableCell>
                            <TableCell><strong>Neutro</strong></TableCell>
                            <TableCell><strong>Bom</strong></TableCell>
                            <TableCell><strong>Data/Hora</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dados.map((linha) => (
                            <TableRow key={linha._id}>
                                <TableCell>{linha.ruim}</TableCell>
                                <TableCell>{linha.neutro}</TableCell>
                                <TableCell>{linha.bom}</TableCell>
                                <TableCell>{new Date(linha.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TabelaRespostas;

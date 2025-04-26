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
        setDados(data);
        console.log(data);
    };

    // CALCULA OS TOTAIS
    const totalRuim = dados.reduce((acc, curr) => acc + (curr.ruim || 0), 0);
    const totalNeutro = dados.reduce((acc, curr) => acc + (curr.neutro || 0), 0);
    const totalBom = dados.reduce((acc, curr) => acc + (curr.bom || 0), 0);

    return (
        <div className="respostas">
            <div className="titleRespostas">RESPOSTAS</div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Data/Hora</strong></TableCell>
                            <TableCell><strong>Ruim</strong></TableCell>
                            <TableCell><strong>Neutro</strong></TableCell>
                            <TableCell><strong>Bom</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dados.reverse.map((linha) => (
                            <TableRow key={linha._id}>
                                <TableCell>{new Date(linha.timestamp).toLocaleString()}</TableCell>
                                <TableCell>{linha.ruim}</TableCell>
                                <TableCell>{linha.neutro}</TableCell>
                                <TableCell>{linha.bom}</TableCell>
                            </TableRow>
                        ))}
                        {/* Linha de TOTAL */}
                        <TableRow style={{ backgroundColor: "#fff" }}>
                            <TableCell><strong>Total</strong></TableCell>
                            <TableCell><strong>{totalRuim}</strong></TableCell>
                            <TableCell><strong>{totalNeutro}</strong></TableCell>
                            <TableCell><strong>{totalBom}</strong></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TabelaRespostas;

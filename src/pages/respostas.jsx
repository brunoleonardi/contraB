import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from "@mui/material";

const TabelaRespostas = () => {
    const [dados, setDados] = useState([]);

    useEffect(() => {
        getResponses();
    }, []);

    const getResponses = async () => {
        const res = await fetch('/api/getResponses');
        const data = await res.json();
        setDados(data);
        console.log(data);
    };

    const limparRespostas = async () => {
        const confirmed = window.confirm('Tem certeza que deseja apagar todos os dados?');
        if (confirmed) {
            await fetch('/api/clearResponses', { method: 'POST' });
            getResponses();
        }
    };

    const totalRuim = dados.reduce((acc, curr) => acc + (curr.ruim || 0), 0);
    const totalNeutro = dados.reduce((acc, curr) => acc + (curr.neutro || 0), 0);
    const totalBom = dados.reduce((acc, curr) => acc + (curr.bom || 0), 0);

    return (
        <div className="respostas" style={{ padding: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div className="titleRespostas" style={{ fontSize: '24px', fontWeight: 'bold' }}>RESPOSTAS</div>
                <Button
                    variant="contained"
                    color="error"
                    onClick={limparRespostas}
                    sx={{ height: '40px', marginTop: { xs: 2, sm: 0 } }}
                >
                    Limpar Respostas
                </Button>
            </div>

            {/* Faz a tabela ser scrollável no mobile */}
            <div style={{ overflowX: "auto" }}>
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
                            {dados?.slice().reverse().map((linha) => (
                                <TableRow key={linha._id}>
                                    <TableCell>{new Date(linha.timestamp).toLocaleString()}</TableCell>
                                    <TableCell>{linha.ruim}</TableCell>
                                    <TableCell>{linha.neutro}</TableCell>
                                    <TableCell>{linha.bom}</TableCell>
                                </TableRow>
                            ))}
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
        </div>
    );
};

export default TabelaRespostas;

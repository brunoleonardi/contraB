import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from "@mui/material";

const TabelaRespostas = () => {
    const [dados, setDados] = useState([
        {
            "_id": "680d3d9f1852d2c92bbe40e6",
            "ruim": 3,
            "neutro": 1,
            "bom": 1,
            "timestamp": "2025-04-26T20:10:07.094Z"
        },
        {
            "_id": "680d3f14422f1b03cf37b62a",
            "ruim": 0,
            "neutro": 0,
            "bom": 0,
            "timestamp": "2025-04-26T20:16:20.631Z"
        },
        {
            "_id": "680d3f19422f1b03cf37b62b",
            "ruim": 3,
            "neutro": 2,
            "bom": 0,
            "timestamp": "2025-04-26T20:16:25.559Z"
        },
        {
            "_id": "680d42059d4f4f1d5bdfcd05",
            "ruim": 0,
            "neutro": 0,
            "bom": 0,
            "timestamp": "2025-04-26T20:28:53.806Z"
        },
        {
            "_id": "680d428109e0a01b5f2fb325",
            "ruim": 1,
            "neutro": 1,
            "bom": 3,
            "timestamp": "2025-04-26T20:30:57.842Z"
        },
        {
            "_id": "680d429c09e0a01b5f2fb326",
            "ruim": 0,
            "neutro": 0,
            "bom": 0,
            "timestamp": "2025-04-26T20:31:24.950Z"
        },
        {
            "_id": "680d43a2d52a182ac20c0363",
            "ruim": 0,
            "neutro": 0,
            "bom": 0,
            "timestamp": "2025-04-26T20:35:46.754Z"
        },
        {
            "_id": "680d43f1d52a182ac20c0364",
            "ruim": 0,
            "neutro": 4,
            "bom": 1,
            "timestamp": "2025-04-26T20:37:05.824Z"
        },
        {
            "_id": "680d463f78acc297df2ddeec",
            "ruim": 0,
            "neutro": 0,
            "bom": 0,
            "timestamp": "2025-04-26T20:46:55.003Z"
        }
    ]);

    useEffect(() => {
        getResponses();
    }, []);

    const getResponses = async () => {
        const res = await fetch('/api/getResponses');
        const data = await res.json();
        setDados(data);
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
        <div className="respostas">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div className="titleRespostas" style={{ fontSize: '24px', fontWeight: 'bold', height: '10px' }}>RESPOSTAS</div>
                <Button
                    variant="contained"
                    color="error"
                    onClick={limparRespostas}
                    sx={{ height: '40px', marginTop: { xs: 2, sm: 0 } }}
                >
                    Limpar Respostas
                </Button>
            </div>

            {/* Scroll só horizontal */}
            <div className="table-scroll">
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

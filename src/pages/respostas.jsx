import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Backdrop, CircularProgress
} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

const TabelaRespostas = () => {
    const [dados, setDados] = useState([]);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getResponses();
    }, []);

    const getResponses = async () => {
        try {
            setOpen(true)
            const res = await fetch('/api/getResponses');
            const data = await res.json();
            setOpen(false)
            setDados(data);
        } catch (error) {
            setOpen(false)
        }
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
        <>
            <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className="respostas">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <div className="titleRespostas" style={{ fontSize: '24px', fontWeight: 'bold', height: '10px' }}>RESPOSTAS</div>
                    <div style={{ marginTop: '15px' }}>
                        <IconButton style={{ marginRight: '10px' }} onClick={() => getResponses()}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => limparRespostas()}>
                            <DeleteOutlineIcon />
                        </IconButton>
                    </div>
                </div>

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
        </>
    );
};

export default TabelaRespostas;

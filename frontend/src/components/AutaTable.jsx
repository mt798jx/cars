// src/components/AutaTable.jsx
import React from 'react';
import {
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper,
    IconButton, Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function AutaTable({ auta, onEdit, onDelete }) {
    return (
        <TableContainer
            component={Paper}
            sx={{
                mt: 2,
                borderRadius: 2,  // zaoblené rohy
                boxShadow: 3       // mierny tieň
            }}
        >
            <Table
                sx={{ minWidth: 650 }}
                size="medium"
            >
                <TableHead>
                    <TableRow>
                        <TableCell><b>ID</b></TableCell>
                        <TableCell><b>Značka</b></TableCell>
                        <TableCell><b>Model</b></TableCell>
                        <TableCell><b>Rok výroby</b></TableCell>
                        <TableCell><b>Palivo</b></TableCell>
                        <TableCell><b>Cena</b></TableCell>
                        <TableCell><b>Dostupné</b></TableCell>
                        <TableCell><b>Akcie</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {auta.map((auto) => (
                        <TableRow
                            key={auto.id}
                            hover
                            sx={{
                                '&:nth-of-type(odd)': {
                                    backgroundColor: (theme) => theme.palette.action.hover
                                }
                            }}
                        >
                            <TableCell>{auto.id}</TableCell>
                            <TableCell>{auto.znacka}</TableCell>
                            <TableCell>{auto.model}</TableCell>
                            <TableCell>{auto.rok_vyroby}</TableCell>
                            <TableCell>{auto.palivo}</TableCell>
                            <TableCell>{auto.cena}</TableCell>
                            <TableCell>
                                {auto.dostupne ? (
                                    <Checkbox checked readOnly />
                                ) : (
                                    <Checkbox checked={false} readOnly />
                                )}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    color="primary"
                                    onClick={() => onEdit(auto)}
                                    sx={{ mr: 1 }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => onDelete(auto.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AutaTable;
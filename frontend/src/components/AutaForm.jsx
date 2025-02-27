// src/components/AutaForm.jsx
import React from 'react';
import {
    Box, TextField, FormControl, InputLabel, Select, MenuItem,
    FormControlLabel, Checkbox, Button, Paper, Typography
} from '@mui/material';

function AutaForm({ onSubmit, newAuto, setNewAuto }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(); // zavolá funkciu z App na vytvorenie záznamu
    };

    return (
        <Paper
            sx={{
                p: 3,
                mt: 3,
                borderRadius: 2,
                boxShadow: 2
            }}
        >
            <Typography variant="h6" gutterBottom>
                Pridať nové auto
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 400
                }}
            >
                <TextField
                    label="Značka"
                    value={newAuto.znacka}
                    onChange={(e) => setNewAuto({ ...newAuto, znacka: e.target.value })}
                    required
                />
                <TextField
                    label="Model"
                    value={newAuto.model}
                    onChange={(e) => setNewAuto({ ...newAuto, model: e.target.value })}
                    required
                />
                <TextField
                    label="Rok výroby"
                    type="number"
                    value={newAuto.rok_vyroby}
                    onChange={(e) =>
                        setNewAuto({ ...newAuto, rok_vyroby: parseInt(e.target.value) })
                    }
                />
                <FormControl fullWidth>
                    <InputLabel id="palivo-label">Palivo</InputLabel>
                    <Select
                        labelId="palivo-label"
                        label="Palivo"
                        value={newAuto.palivo}
                        onChange={(e) => setNewAuto({ ...newAuto, palivo: e.target.value })}
                    >
                        <MenuItem value="">-- Vyber palivo --</MenuItem>
                        <MenuItem value="benzín">benzín</MenuItem>
                        <MenuItem value="nafta">nafta</MenuItem>
                        <MenuItem value="elektrina">elektrina</MenuItem>
                        <MenuItem value="hybrid">hybrid</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Cena"
                    type="number"
                    inputProps={{ step: '0.01' }}
                    value={newAuto.cena}
                    onChange={(e) =>
                        setNewAuto({ ...newAuto, cena: parseFloat(e.target.value) })
                    }
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newAuto.dostupne}
                            onChange={(e) =>
                                setNewAuto({ ...newAuto, dostupne: e.target.checked })
                            }
                        />
                    }
                    label="Dostupné"
                />
                <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-start' }}>
                    Pridať
                </Button>
            </Box>
        </Paper>
    );
}

export default AutaForm;

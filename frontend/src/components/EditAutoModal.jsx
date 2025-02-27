// src/components/EditAutoModal.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, FormControl, InputLabel, Select, MenuItem,
    FormControlLabel, Checkbox, Slide, Typography
} from '@mui/material';

/**
 * Prechodová animácia (Slide) zospodu.
 * Ak chceš Fade, import { Fade } from '@mui/material a použi <Fade in={open}>.
 */
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * @param {boolean} open - či je modal otvorený
 * @param {object} autoData - objekt s hodnotami auta, ktoré ideme editovať
 * @param {function} onClose - funkcia na zatvorenie modalu bez uloženia
 * @param {function} onSave - funkcia, ktorá dostane "upravené" auto a uloží ho
 */
function EditAutoModal({ open, autoData, onClose, onSave }) {
    const [editedAuto, setEditedAuto] = useState({
        znacka: '',
        model: '',
        rok_vyroby: '',
        palivo: '',
        cena: '',
        dostupne: true,
    });

    useEffect(() => {
        if (autoData) {
            setEditedAuto({
                znacka: autoData.znacka || '',
                model: autoData.model || '',
                rok_vyroby: autoData.rok_vyroby || '',
                palivo: autoData.palivo || '',
                cena: autoData.cena || '',
                dostupne: autoData.dostupne || false
            });
        }
    }, [autoData]);

    const handleSave = () => {
        onSave(editedAuto);
    };

    const handleCancel = () => {
        onClose();
    };

    if (!autoData) return null;

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCancel}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>Upraviť auto (ID: {autoData.id})</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <Typography variant="subtitle1" color="textSecondary">
                    Tu môžeš zmeniť údaje o vybranom aute.
                </Typography>
                <TextField
                    label="Značka"
                    value={editedAuto.znacka}
                    onChange={(e) => setEditedAuto({ ...editedAuto, znacka: e.target.value })}
                />
                <TextField
                    label="Model"
                    value={editedAuto.model}
                    onChange={(e) => setEditedAuto({ ...editedAuto, model: e.target.value })}
                />
                <TextField
                    label="Rok výroby"
                    type="number"
                    value={editedAuto.rok_vyroby}
                    onChange={(e) => setEditedAuto({ ...editedAuto, rok_vyroby: parseInt(e.target.value) })}
                />
                <FormControl>
                    <InputLabel>Palivo</InputLabel>
                    <Select
                        value={editedAuto.palivo}
                        label="Palivo"
                        onChange={(e) => setEditedAuto({ ...editedAuto, palivo: e.target.value })}
                    >
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
                    value={editedAuto.cena}
                    onChange={(e) => setEditedAuto({ ...editedAuto, cena: parseFloat(e.target.value) })}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={editedAuto.dostupne}
                            onChange={(e) => setEditedAuto({ ...editedAuto, dostupne: e.target.checked })}
                        />
                    }
                    label="Dostupné"
                />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleCancel} color="inherit">
                    Zrušiť
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary">
                    Uložiť
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditAutoModal;

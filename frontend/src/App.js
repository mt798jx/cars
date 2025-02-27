// src/App.js
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, MenuItem, Select,
  FormControl, InputLabel, Stack, Paper
} from '@mui/material';

import { getAuta, createAuto, updateAuto, deleteAuto } from './services/api';
import AutaTable from './components/AutaTable';
import AutaForm from './components/AutaForm';
import EditAutoModal from './components/EditAutoModal';

function App() {
  const [auta, setAuta] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Stav pre formulár vytvárania nového auta
  const [newAuto, setNewAuto] = useState({
    znacka: '',
    model: '',
    rok_vyroby: '',
    palivo: '',
    cena: '',
    dostupne: true
  });

  // EDIT modál
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAutoData, setEditAutoData] = useState(null);

  // Načítanie áut z backendu
  const fetchAutaData = async () => {
    try {
      const data = await getAuta(searchTerm, sortBy, sortOrder);
      setAuta(data);
    } catch (error) {
      console.error('Chyba pri načítaní áut:', error);
    }
  };

  useEffect(() => {
    fetchAutaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy, sortOrder]);

  // Handler na vytvorenie nového auta
  const handleCreateAuto = async () => {
    try {
      await createAuto(newAuto);
      setNewAuto({
        znacka: '',
        model: '',
        rok_vyroby: '',
        palivo: '',
        cena: '',
        dostupne: true
      });
      fetchAutaData();
    } catch (error) {
      console.error('Chyba pri vytváraní auta:', error);
    }
  };

  // Handler na mazanie
  const handleDeleteAuto = async (id) => {
    try {
      await deleteAuto(id);
      fetchAutaData();
    } catch (error) {
      console.error('Chyba pri mazaní auta:', error);
    }
  };

  // Otvoriť modál na editáciu
  const handleOpenEditModal = (auto) => {
    setEditAutoData(auto);
    setEditModalOpen(true);
  };

  // Zatvoriť modál
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setEditAutoData(null);
  };

  // Uloženie (edit) – volá sa z EditAutoModal
  const handleSaveEdit = async (editedAuto) => {
    if (!editAutoData) return;
    try {
      await updateAuto(editAutoData.id, editedAuto);
      handleCloseEditModal();
      fetchAutaData();
    } catch (error) {
      console.error('Chyba pri úprave auta:', error);
    }
  };

  return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
          Prehľad áut
        </Typography>

        {/* Panel pre vyhľadávanie a triedenie */}
        <Paper sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
                label="Hľadaj značku/model"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 300 }}
            />

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="sortBy-label">Triediť podľa</InputLabel>
              <Select
                  labelId="sortBy-label"
                  label="Triediť podľa"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="">(žiadne)</MenuItem>
                <MenuItem value="znacka">Značka</MenuItem>
                <MenuItem value="model">Model</MenuItem>
                <MenuItem value="rok_vyroby">Rok výroby</MenuItem>
                <MenuItem value="cena">Cena</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="sortOrder-label">Poradie</InputLabel>
              <Select
                  labelId="sortOrder-label"
                  label="Poradie"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="asc">Vzostupne</MenuItem>
                <MenuItem value="desc">Zostupne</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Paper>

        {/* Tabuľka so zoznamom áut */}
        <AutaTable
            auta={auta}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteAuto}
        />

        {/* Formulár na pridanie nového auta */}
        <AutaForm
            onSubmit={handleCreateAuto}
            newAuto={newAuto}
            setNewAuto={setNewAuto}
        />

        {/* Modálny formulár na editáciu auta */}
        <EditAutoModal
            open={editModalOpen}
            autoData={editAutoData}
            onClose={handleCloseEditModal}
            onSave={handleSaveEdit}
        />
      </Container>
  );
}

export default App;

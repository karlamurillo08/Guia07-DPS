// components/ReservationForm.js
import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'react-id-generator';
import { Picker } from '@react-native-picker/picker';
import { v4 as uuidv4 } from 'uuid'; 
import colors from '../src/utils/colors';

const Formulario = ({ reservations, setReservations, showForm, saveReservationsToStorage }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState('');
  const [section, setSection] = useState('No fumadores');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    setDate(selectedDate.toISOString());
    hideDatePicker();
  };

  const createReservation = () => {
    if (name.trim() === '' || date.trim() === '' || people.trim() === '') {
      showAlert();
      return;
    }

    const newReservation = { name,
        date,
        people,
        section }; 
      newReservationid =  shortid();
      
    

    const updatedReservations = [...reservations, newReservation];
    setReservations(updatedReservations);
    saveReservationsToStorage(JSON.stringify(updatedReservations));
    showForm(false);

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setDate('');
    setPeople('');
    setSection('No fumadores');
  };

  const showAlert = () => {
    Alert.alert('Error', 'Todos los campos son obligatorios', [{ text: 'OK' }]);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput style={styles.input} onChangeText={setName} />
      </View>

      <View>
        <Text style={styles.label}>Fecha y Hora:</Text>
        <Button title="Seleccionar Fecha y Hora" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
        />
        <Text>{date ? new Date(date).toLocaleString() : ''}</Text>
      </View>

      <View>
        <Text style={styles.label}>Cantidad de Personas:</Text>
        <TextInput style={styles.input} onChangeText={setPeople} keyboardType="numeric" />
      </View>

      <View>
        <Text style={styles.label}>Sección:</Text>
        <Picker selectedValue={section} onValueChange={setSection}>
          <Picker.Item label="No fumadores" value="No fumadores" />
          <Picker.Item label="Fumadores" value="Fumadores" />
        </Picker>
      </View>

      <TouchableHighlight onPress={createReservation} style={styles.btnSubmit}>
        <Text style={styles.textSubmit}>Crear Nueva Reserva</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: colors.BUTTON_COLOR,
    marginVertical: 10,
  },
  textSubmit: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Formulario;

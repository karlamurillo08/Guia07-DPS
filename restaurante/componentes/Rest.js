// components/ReservationItem.js
import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';

const Rest = ({ item, deleteReservation }) => {

  const handleDelete = id => {
    deleteReservation(id);
  };

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.label}>Nombre: </Text>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha y Hora: </Text>
        <Text style={styles.text}>{new Date(item.date).toLocaleString()}</Text>
      </View>
      <View>
        <Text style={styles.label}>Personas: </Text>
        <Text style={styles.text}>{item.people}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sección: </Text>
        <Text style={styles.text}>{item.section}</Text>
      </View>
      <TouchableHighlight onPress={() => handleDelete(item.id)} style={styles.btnDelete}>
        <Text style={styles.textDelete}>Eliminar &times;</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  text: {
    fontSize: 18,
  },
  btnDelete: {
    padding: 10,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  textDelete: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Rest;

// App.js
import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Formulario from './componentes/Formulario';
import Rest from './componentes/Rest';
import Colors from './src/utils/colors';

const App = () => {
  const [reservations, setReservations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadReservationsFromStorage = async () => {
      try {
        const storedReservations = await AsyncStorage.getItem('reservations');
        if (storedReservations) {
          setReservations(JSON.parse(storedReservations));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadReservationsFromStorage();
  }, []);

  const deleteReservation = (id) => {
    const filteredReservations = reservations.filter((reservation) => reservation.id !== id);
    setReservations(filteredReservations);
    saveReservationsToStorage(JSON.stringify(filteredReservations));
  };

  const saveReservationsToStorage = async (reservationsJSON) => {
    try {
      await AsyncStorage.setItem('reservations', reservationsJSON);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Administrador de Reservas</Text>

        <TouchableHighlight onPress={() => setShowForm(!showForm)} style={styles.btnShowForm}>
                    <Text style={styles.textShowForm}>{showForm ? 'Cancelar Crear Reserva' : 'Crear Nueva Reserva'}</Text>
                    </TouchableHighlight>
            
                    <View style={styles.content}>
                      {showForm ? (
                        <>
                          <Text style={styles.title}>Crear Nueva Reserva</Text>
                          <Formulario
                            reservations={reservations}
                            setReservations={setReservations}
                            showForm={setShowForm}
                            saveReservationsToStorage={saveReservationsToStorage}
                          />
                        </>
                      ) : (
                        <>
                          <Text style={styles.title}>
                            {reservations.length > 0 ? 'Administra tus reservas' : 'No hay reservas, agrega una'}
                          </Text>
                          <FlatList
                            style={styles.list}
                            data={reservations}
                            renderItem={({ item }) => (
                              <Rest item={item} deleteReservation={deleteReservation} />
                            )}
                            keyExtractor={(item) => item.id}
                          />
                        </>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            };
            
            const styles = StyleSheet.create({
              container: {
                backgroundColor: Colors.PRIMARY_COLOR,
                flex: 1,
              },
              title: {
                color: '#FFF',
                marginTop: Platform.OS === 'ios' ? 40 : 20,
                marginBottom: 20,
                fontSize: 24,
                fontWeight: 'bold',
                textAlign: 'center',
              },
              content: {
                flex: 1,
                marginHorizontal: '2.5%',
              },
              list: {
                flex: 1,
              },
              btnShowForm: {
                padding: 10,
                backgroundColor: Colors.BUTTON_COLOR,
                marginVertical: 10,
              },
              textShowForm: {
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'center',
              },
            });
            
            export default App;
            

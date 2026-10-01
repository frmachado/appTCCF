import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MapaWeb from './MapaWeb';

export default function Tela4({ navigation }) {
  const [semaforoSelecionado, setSemaforoSelecionado] = useState(null);

  const semaforos = [
    {
      id: 1,
      nome: 'Semáforo Inteligente 01',
      descricao: 'Centro de Registro',
      status: 'Online',
      latitude: -24.4875,
      longitude: -47.8445,
    },
    {
      id: 2,
      nome: 'Semáforo Inteligente 02',
      descricao: 'Região Central',
      status: 'Online',
      latitude: -24.4915,
      longitude: -47.8485,
    },
    {
      id: 3,
      nome: 'Semáforo Inteligente 03',
      descricao: 'Cruzamento monitorado',
      status: 'Online',
      latitude: -24.4845,
      longitude: -47.8395,
    },
    {
      id: 4,
      nome: 'Semáforo Inteligente 04',
      descricao: 'Próximo à área comercial',
      status: 'Online',
      latitude: -24.4955,
      longitude: -47.8425,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#242B67" barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation && navigation.navigate('Tela1')}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>

        <Text style={styles.title}>
          Painel de Controle TCC
        </Text>

        <MaterialCommunityIcons
          name="earth"
          size={28}
          color="#FFF"
        />
      </View>

      {/* TEXTO */}
      <View style={styles.info}>
        <Text style={styles.infoText}>
          Painel de Monitoramento:
        </Text>
      </View>

      {/* MAPA */}
      <View style={styles.mapArea}>
        <MapaWeb
          semaforos={semaforos}
          onSelect={setSemaforoSelecionado}
        />
      </View>

      {/* CARD DO SEMÁFORO SELECIONADO */}
      {semaforoSelecionado && (
        <View style={styles.cardInfo}>
          <View style={styles.cardHeader}>

            <View style={styles.semaforoIconBox}>
              <Text style={styles.semaforoIcon}>
                🚦
              </Text>
            </View>

            <View style={styles.cardTexts}>
              <Text style={styles.cardTitle}>
                {semaforoSelecionado.nome}
              </Text>

              <Text style={styles.cardDescricao}>
                📍 {semaforoSelecionado.descricao}
              </Text>

              <Text style={styles.cardStatus}>
                🟢 {semaforoSelecionado.status}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setSemaforoSelecionado(null)}
            >
              <Ionicons
                name="close-circle"
                size={28}
                color="#D62828"
              />
            </TouchableOpacity>

          </View>
        </View>
      )}

      {/* LEGENDA */}
      <View style={styles.legend}>

        <View style={styles.legendItem}>
          <Text style={styles.legendIcon}>
            🚦
          </Text>

          <Text style={styles.legendText}>
            Semáforo Inteligente
          </Text>
        </View>

        <View style={styles.legendItem}>
          <View style={styles.onlineDot} />

          <Text style={styles.legendText}>
            Sistema online
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  header: {
    height: 85,
    backgroundColor: '#242B67',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  info: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  infoText: {
    color: '#242B67',
    fontSize: 15,
    fontWeight: '600',
  },

  mapArea: {
    flex: 1,
    minHeight: 400,
  },

  cardInfo: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 15,
    padding: 15,

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.15,
    shadowRadius: 8,

    elevation: 5,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  semaforoIconBox: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  semaforoIcon: {
    fontSize: 30,
  },

  cardTexts: {
    flex: 1,
  },

  cardTitle: {
    color: '#242B67',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  cardDescricao: {
    fontSize: 13,
    color: '#555',
  },

  cardStatus: {
    fontSize: 13,
    marginTop: 3,
  },

  legend: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 12,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendIcon: {
    fontSize: 18,
    marginRight: 6,
  },

  legendText: {
    fontSize: 13,
    color: '#333',
  },

  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
});
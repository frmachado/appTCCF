import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function Tecnologia({ navigation }) {

  const tecnologias = [
    {
      id: '1',
      icone: 'traffic-light-outline',
      titulo: 'Semáforos Inteligentes',
      texto:
        'Os semáforos inteligentes utilizam tecnologias para melhorar o controle do trânsito e aumentar a segurança de motoristas e pedestres.',
    },
    {
      id: '2',
      icone: 'hardware-chip-outline',
      titulo: 'Sensores',
      texto:
        'Sensores podem identificar veículos, pedestres e diferentes situações no trânsito, permitindo respostas mais rápidas e eficientes.',
    },
    {
      id: '3',
      icone: 'phone-portrait-outline',
      titulo: 'Aplicativos',
      texto:
        'Aplicativos auxiliam motoristas e pedestres com informações sobre rotas, trânsito, localização e mobilidade.',
    },
    {
      id: '4',
      icone: 'analytics-outline',
      titulo: 'Monitoramento',
      texto:
        'O monitoramento tecnológico permite acompanhar o fluxo de veículos e identificar locais que precisam de melhorias.',
    },
    {
      id: '5',
      icone: 'accessibility-outline',
      titulo: 'Acessibilidade',
      texto:
        'A tecnologia também pode tornar o trânsito mais acessível para idosos e pessoas com deficiência, oferecendo recursos que auxiliam na mobilidade.',
    },
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Tela6')}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Tecnologia
        </Text>

        <Ionicons
          name="hardware-chip-outline"
          size={28}
          color="#FFF"
        />

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >

        {/* INTRODUÇÃO */}

        <View style={styles.intro}>

          <View style={styles.introIcon}>
            <MaterialCommunityIcons
              name="car-connected"
              size={50}
              color="#242B67"
            />
          </View>

          <Text style={styles.introTitle}>
            Tecnologia no Trânsito
          </Text>

          <Text style={styles.introText}>
            A tecnologia está transformando a maneira como
            nos deslocamos e contribuindo para um trânsito
            mais seguro, inteligente e acessível.
          </Text>

        </View>

        {/* TÍTULO */}

        <Text style={styles.sectionTitle}>
          TECNOLOGIA E MOBILIDADE
        </Text>

        {/* CARDS */}

        {tecnologias.map((item) => (

          <View
            key={item.id}
            style={styles.card}
          >

            <View style={styles.iconContainer}>

              <Ionicons
                name={item.icone}
                size={30}
                color="#242B67"
              />

            </View>

            <View style={styles.cardContent}>

              <Text style={styles.cardTitle}>
                {item.titulo}
              </Text>

              <Text style={styles.cardText}>
                {item.texto}
              </Text>

            </View>

          </View>

        ))}

        {/* SPI */}

        <View style={styles.spiCard}>

          <View style={styles.spiHeader}>

            <MaterialCommunityIcons
              name="traffic-light"
              size={35}
              color="#FFF"
            />

            <Text style={styles.spiTitle}>
              SPI
            </Text>

          </View>

          <Text style={styles.spiSubtitle}>
            Semáforo Inteligente
          </Text>

          <Text style={styles.spiText}>
            O projeto SPI demonstra como a tecnologia pode
            ser utilizada para melhorar a segurança dos
            pedestres e tornar a travessia mais acessível.
          </Text>

          <View style={styles.spiLine} />

          <Text style={styles.spiSmallText}>
            Tecnologia • Segurança • Acessibilidade
          </Text>

        </View>

      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  /* HEADER */

  header: {
    height: 115,
    paddingTop: 34,
    backgroundColor: '#242B67',

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backButton: {
    width: 45,
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    flex: 1,

    color: '#FFF',

    fontSize: 22,
    fontWeight: 'bold',

    marginLeft: 8,
  },

  /* SCROLL */

  scroll: {
    paddingBottom: 40,
  },

  /* INTRO */

  intro: {
    backgroundColor: '#FFF',

    marginHorizontal: 18,
    marginTop: 25,

    padding: 22,

    borderRadius: 18,

    alignItems: 'center',

    elevation: 3,
  },

  introIcon: {
    width: 80,
    height: 80,

    borderRadius: 40,

    backgroundColor: '#E7E9F5',

    justifyContent: 'center',
    alignItems: 'center',
  },

  introTitle: {
    color: '#242B67',

    fontSize: 22,
    fontWeight: 'bold',

    marginTop: 12,
  },

  introText: {
    color: '#666',

    fontSize: 14,

    lineHeight: 21,

    textAlign: 'center',

    marginTop: 8,
  },

  /* TÍTULO */

  sectionTitle: {
    color: '#242B67',

    fontSize: 15,
    fontWeight: 'bold',

    marginHorizontal: 22,

    marginTop: 30,
    marginBottom: 12,
  },

  /* CARDS */

  card: {
    backgroundColor: '#FFF',

    marginHorizontal: 18,
    marginBottom: 14,

    padding: 15,

    borderRadius: 15,

    flexDirection: 'row',

    elevation: 3,
  },

  iconContainer: {
    width: 55,
    height: 55,

    borderRadius: 15,

    backgroundColor: '#E7E9F5',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    color: '#242B67',

    fontSize: 16,
    fontWeight: 'bold',

    marginBottom: 5,
  },

  cardText: {
    color: '#666',

    fontSize: 13,

    lineHeight: 19,
  },

  /* SPI */

  spiCard: {
    backgroundColor: '#242B67',

    marginHorizontal: 18,
    marginTop: 15,

    padding: 22,

    borderRadius: 18,

    alignItems: 'center',
  },

  spiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spiTitle: {
    color: '#FFF',

    fontSize: 28,
    fontWeight: 'bold',

    marginLeft: 10,
  },

  spiSubtitle: {
    color: '#BFC5FF',

    fontSize: 15,

    marginTop: 5,
  },

  spiText: {
    color: '#FFF',

    textAlign: 'center',

    fontSize: 14,

    lineHeight: 21,

    marginTop: 15,
  },

  spiLine: {
    width: '100%',

    height: 1,

    backgroundColor: 'rgba(255,255,255,0.3)',

    marginVertical: 15,
  },

  spiSmallText: {
    color: '#BFC5FF',

    fontSize: 12,

    textAlign: 'center',
  },

});
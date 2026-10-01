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

export default function Dicas({ navigation }) {

  const dicas = [
    {
      numero: '1',
      icone: 'walk',
      titulo: 'Aproxime-se da faixa',
      texto:
        'Ao chegar próximo à faixa de pedestres, localize o semáforo inteligente e prepare-se para utilizar o sistema.',
    },
    {
      numero: '2',
      icone: 'card-outline',
      titulo: 'Apresente o Cartão SPI',
      texto:
        'Aproxime o seu cartão SPI do leitor RFID para que o sistema reconheça sua presença.',
    },
    {
      numero: '3',
      icone: 'traffic-light-outline',
      titulo: 'Aguarde a sinalização',
      texto:
        'Após a identificação, aguarde o semáforo indicar o momento seguro para realizar a travessia.',
    },
    {
      numero: '4',
      icone: 'walk',
      titulo: 'Realize a travessia',
      texto:
        'Atravesse pela faixa de pedestres com atenção, respeitando a sinalização e observando o trânsito.',
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
          Dicas
        </Text>

        <MaterialCommunityIcons
          name="lightbulb-outline"
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
              name="traffic-light"
              size={45}
              color="#242B67"
            />

          </View>

          <Text style={styles.introTitle}>
            Como utilizar o SPI?
          </Text>

          <Text style={styles.introText}>
            Confira o passo a passo para utilizar o
            Semáforo Inteligente de forma segura.
          </Text>

        </View>


        {/* PASSOS */}

        <Text style={styles.sectionTitle}>
          PASSO A PASSO
        </Text>

        {dicas.map((dica) => (

          <View
            key={dica.numero}
            style={styles.card}
          >

            {/* NÚMERO */}

            <View style={styles.numero}>

              <Text style={styles.numeroText}>
                {dica.numero}
              </Text>

            </View>


            {/* ÍCONE */}

            <View style={styles.iconeContainer}>

              <Ionicons
                name={dica.icone}
                size={30}
                color="#242B67"
              />

            </View>


            {/* TEXTO */}

            <View style={styles.cardContent}>

              <Text style={styles.cardTitle}>
                {dica.titulo}
              </Text>

              <Text style={styles.cardText}>
                {dica.texto}
              </Text>

            </View>

          </View>

        ))}


        {/* ALERTA */}

        <View style={styles.alerta}>

          <Ionicons
            name="warning-outline"
            size={32}
            color="#C98B00"
          />

          <View style={styles.alertaContent}>

            <Text style={styles.alertaTitle}>
              Atenção
            </Text>

            <Text style={styles.alertaText}>
              O sistema auxilia na travessia, mas é
              importante sempre observar o trânsito e
              seguir as orientações de segurança.
            </Text>

          </View>

        </View>


        {/* SOBRE O SPI */}

        <View style={styles.sobre}>

          <MaterialCommunityIcons
            name="information-outline"
            size={28}
            color="#242B67"
          />

          <Text style={styles.sobreTitle}>
            Sobre o Semáforo Inteligente
          </Text>

          <Text style={styles.sobreText}>
            O SPI é um sistema desenvolvido para auxiliar
            pedestres durante a travessia, utilizando
            tecnologia para aumentar a segurança e melhorar
            a acessibilidade no trânsito.
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
    paddingTop: 34,
  },

  /* HEADER */

  header: {
    height: 115,
    paddingTop: 34,
    backgroundColor: '#242B67',
    paddingHorizontal: 18,
    paddingTop: 34,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -40,
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
    alignItems: 'center',

    marginHorizontal: 20,
    marginTop: 25,

    padding: 20,

    backgroundColor: '#FFF',

    borderRadius: 18,

    elevation: 3,
  },

  introIcon: {
    width: 75,
    height: 75,

    borderRadius: 40,

    backgroundColor: '#E7E9F5',

    justifyContent: 'center',
    alignItems: 'center',
  },

  introTitle: {
    color: '#242B67',

    fontSize: 21,
    fontWeight: 'bold',

    marginTop: 12,
  },

  introText: {
    textAlign: 'center',

    color: '#666',

    fontSize: 14,

    marginTop: 8,

    lineHeight: 20,
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


  /* CARD */

  card: {
    backgroundColor: '#FFF',

    marginHorizontal: 18,
    marginBottom: 15,

    padding: 15,

    borderRadius: 15,

    flexDirection: 'row',

    elevation: 3,
  },

  numero: {
    width: 30,
    height: 30,

    borderRadius: 15,

    backgroundColor: '#242B67',

    justifyContent: 'center',
    alignItems: 'center',
  },

  numeroText: {
    color: '#FFF',

    fontWeight: 'bold',

    fontSize: 15,
  },

  iconeContainer: {
    marginHorizontal: 12,

    justifyContent: 'center',
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


  /* ALERTA */

  alerta: {
    backgroundColor: '#FFF3D6',

    marginHorizontal: 18,
    marginTop: 10,

    padding: 15,

    borderRadius: 15,

    flexDirection: 'row',

    borderLeftWidth: 5,
    borderLeftColor: '#C98B00',
  },

  alertaContent: {
    flex: 1,
    marginLeft: 10,
  },

  alertaTitle: {
    color: '#A06B00',

    fontWeight: 'bold',

    fontSize: 16,
  },

  alertaText: {
    color: '#735B25',

    fontSize: 13,

    lineHeight: 19,

    marginTop: 4,
  },


  /* SOBRE */

  sobre: {
    backgroundColor: '#E7E9F5',

    marginHorizontal: 18,
    marginTop: 20,

    padding: 18,

    borderRadius: 15,

    alignItems: 'center',
  },

  sobreTitle: {
    color: '#242B67',

    fontWeight: 'bold',

    fontSize: 17,

    marginTop: 8,
  },

  sobreText: {
    color: '#555',

    textAlign: 'center',

    fontSize: 13,

    lineHeight: 19,

    marginTop: 8,
  },

});
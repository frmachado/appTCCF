import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function Campanhas({ navigation }) {
  return (
    <View style={styles.container}>

      <StatusBar
        backgroundColor="#F4F4F4"
        barStyle="dark-content"
      />
      <View style={styles.background}>

        {/* HEADER */}

        <View style={styles.header}>

          <Text style={styles.title}>
            Campanhas
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Tela1')}
            style={styles.backButton}
          >
            <Ionicons
              name="arrow-back"
              size={26}
              color="#242B67"
            />
          </TouchableOpacity>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        >

          {/* =====================================
            CAMPANHA MAIO AMARELO
        ====================================== */}

          <View style={styles.campanha}>

            <View style={styles.bannerContainer}>

              <Image
                source={require('../../../assets/imagens/BannerMaioAmarelo.png')}
                style={styles.banner}
                resizeMode="cover"
              />

              <View style={styles.bannerOverlay} />

              <View style={styles.bannerTextArea}>

                <Text style={styles.maio}>
                  Maio Amarelo
                </Text>

                <Text style={styles.subtituloBanner}>
                  Paz no trânsito começa por você
                </Text>

              </View>

            </View>

            {/* O QUE É */}

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                O QUE É?
              </Text>

              <Text style={styles.cardTexto}>
                Um movimento internacional de conscientização
                para reduzir acidentes e mortes no trânsito.
                Durante o mês de maio, diversas ações são
                realizadas para promover a segurança e o respeito
                entre todos que utilizam as vias.
              </Text>

            </View>

            {/* POR QUE */}

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                POR QUE MAIO AMARELO?
              </Text>

              <Text style={styles.cardTexto}>
                O amarelo simboliza atenção e também é utilizado
                como alerta no trânsito. A campanha busca chamar
                a atenção da população para a importância de
                atitudes mais seguras.
              </Text>

            </View>

            {/* OBJETIVO */}

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                OBJETIVO
              </Text>

              <Text style={styles.cardTexto}>
                Conscientizar motoristas, motociclistas,
                ciclistas e pedestres sobre a importância
                de respeitar as leis e adotar atitudes
                responsáveis no trânsito.
              </Text>

            </View>

          </View>

          {/* =====================================
            CAMPANHA 2 - CELULAR
        ====================================== */}

          <View style={styles.campanha}>

            <View style={styles.bannerContainer}>

              <Image
                source={require('../../../assets/imagens/CelularTransito.jpg')}
                style={styles.banner}
                resizeMode="cover"
              />

              <View style={styles.bannerOverlay} />

              <View style={styles.bannerTextArea}>

                <Text style={styles.campanhaTituloBanner}>
                  Celular no Trânsito
                </Text>

                <Text style={styles.subtituloBanner}>
                  Uma distração pode mudar tudo
                </Text>

              </View>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                O QUE É?
              </Text>

              <Text style={styles.cardTexto}>
                O uso do celular durante a condução ou durante
                uma travessia reduz a atenção e aumenta o risco
                de acidentes.
              </Text>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                POR QUE EVITAR?
              </Text>

              <Text style={styles.cardTexto}>
                Uma pequena distração pode fazer com que o
                motorista ou pedestre não perceba uma situação
                de perigo.
              </Text>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                OBJETIVO
              </Text>

              <Text style={styles.cardTexto}>
                Incentivar todos os usuários do trânsito a
                manterem a atenção e evitarem distrações
                causadas pelo celular.
              </Text>

            </View>

          </View>

          {/* =====================================
            CAMPANHA 3 - TRAVESSIA SEGURA
        ====================================== */}

          <View style={styles.campanha}>

            <View style={styles.bannerContainer}>

              <Image
                source={require('../../../assets/imagens/TravessiaSegura.png')}
                style={styles.banner}
                resizeMode="cover"
              />

              <View style={styles.bannerOverlay} />

              <View style={styles.bannerTextArea}>

                <Text style={styles.campanhaTituloBanner}>
                  Travessia Segura
                </Text>

                <Text style={styles.subtituloBanner}>
                  Segurança para todos os pedestres
                </Text>

              </View>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                COMO ATRAVESSAR?
              </Text>

              <Text style={styles.cardTexto}>
                Utilize a faixa de pedestres, observe os dois
                lados da via e certifique-se de que os veículos
                perceberam sua presença.
              </Text>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                ATENÇÃO
              </Text>

              <Text style={styles.cardTexto}>
                Evite atravessar distraído, utilizando o celular
                ou surgindo repentinamente entre veículos
                estacionados.
              </Text>

            </View>

            <View style={styles.card}>

              <Text style={styles.cardTitulo}>
                OBJETIVO
              </Text>

              <Text style={styles.cardTexto}>
                Promover uma travessia mais segura e acessível,
                especialmente para idosos e pessoas com
                deficiência.
              </Text>

            </View>

          </View>

          {/* FINAL */}

          <View style={styles.final}>

            <MaterialCommunityIcons
              name="traffic-light-outline"
              size={35}
              color="#FFF"
            />

            <Text style={styles.finalText}>
              Um trânsito mais seguro depende de todos nós.
            </Text>

          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingTop: 34,
  },
  background: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },

  /* HEADER */

  header: {
    height: 70,
    backgroundColor: '#F4F4F4',

    borderTopWidth: 3,
    borderTopColor: '#242B67',

    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: '#242B67',
    fontSize: 20,
    fontWeight: 'bold',
  },

  backButton: {
    width: 45,
    height: 45,

    justifyContent: 'center',
    alignItems: 'center',
  },

  /* SCROLL */

  scrollContent: {
    paddingBottom: 40,
  },

  /* CAMPANHA */

  campanha: {
    marginBottom: 25,
  },

  /* BANNER */

  bannerContainer: {
    width: '100%',
    height: 170,
    position: 'relative',
    overflow: 'hidden',
  },

  banner: {
    width: '100%',
    height: '100%',
  },

  bannerOverlay: {
    position: 'absolute',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: 'rgba(0,0,0,0.30)',
  },

  bannerTextArea: {
    position: 'absolute',

    left: 20,
    bottom: 18,
  },

  maio: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFD400',
  },

  campanhaTituloBanner: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFF',
  },

  subtituloBanner: {
    color: '#FFF',
    fontSize: 13,
    marginTop: 2,
  },

  /* CARDS */

  card: {
    backgroundColor: '#3D3D3D',

    marginHorizontal: 12,
    marginTop: 14,

    padding: 15,

    borderRadius: 7,

    minHeight: 100,
  },

  cardTitulo: {
    color: '#FFD400',

    fontSize: 11,
    fontWeight: 'bold',

    textAlign: 'center',

    marginBottom: 8,
  },

  cardTexto: {
    color: '#FFF',

    fontSize: 12,

    lineHeight: 18,

    textAlign: 'left',
  },

  /* FINAL */

  final: {
    backgroundColor: '#242B67',

    marginHorizontal: 12,

    paddingVertical: 25,
    paddingHorizontal: 20,

    borderRadius: 10,

    alignItems: 'center',
  },

  finalText: {
    color: '#FFF',

    fontSize: 16,
    fontWeight: 'bold',

    textAlign: 'center',

    marginTop: 10,
  },

});
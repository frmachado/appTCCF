import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

export default function Blog({ navigation }) {
  const pautas = [
    {
      id: 1,
      titulo: 'Deficientes visuais reclamam das dificuldades em atravessar ruas',
      imagem: require('../../../../assets/imagens/Noticia08.png'),
      comentarios: 24,
    },
    {
      id: 2,
      titulo: 'Risco real: avanço de condutores e falta de atenção aponta problemas',
      imagem: require('../../../../assets/imagens/Noticia01.png'),
      comentarios: 18,
    },
    {
      id: 3,
      titulo: 'O que é um semáforo inteligente?',
      imagem: require('../../../../assets/imagens/Noticia03.png'),
      comentarios: 31,
    },
    {
      id: 4,
      titulo: 'Maio Amarelo 2026 terá como tema: enxergar o trânsito salva vidas',
      imagem: require('../../../../assets/imagens/BannerInicial01.png'),
      comentarios: 42,
    },
  ];

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
            Boas-vindas ao nosso blog!
          </Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Tela1')}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              color="#242B67"
            />
          </TouchableOpacity>

        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* BANNER */}

          <View style={styles.bannerContainer}>

            <Image
              source={require('../../../../assets/imagens/Noticia01.png')}
              style={styles.banner}
            />

            <View style={styles.bannerOverlay} />

            <View style={styles.bannerText}>

              <Text style={styles.bannerTitle}>
                COMO A{'\n'}SPI{'\n'}SALVA
              </Text>

              <Text style={styles.bannerSubTitle}>
                Tecnologia para um trânsito mais seguro
              </Text>

            </View>

          </View>

          {/* CATEGORIAS */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categories}
          >

            <TouchableOpacity
              onPress={() => navigation.navigate('Tecnologia')}
              style={styles.category}>

              <Ionicons
                name="hardware-chip-outline"
                size={24}
                color="#242B67"
              />

              <Text style={styles.categoryText}>
                Tecnologia
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Legislacao')}
              style={styles.category}>

              <Ionicons
                name="document-text-outline"
                size={24}
                color="#242B67"
              />

              <Text style={styles.categoryText}>
                Legislação
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Dicas')}
              style={styles.category}>

              <MaterialCommunityIcons
                name="car-info"
                size={24}
                color="#242B67"
              />

              <Text style={styles.categoryText}>
                Dicas
              </Text>

            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Dados')}
              style={styles.category}
            >
              <MaterialCommunityIcons
                name="chart-bar"
                size={24}
                color="#242B67"
              />

              <Text style={styles.categoryText}>
                Dados
              </Text>
            </TouchableOpacity>

          </ScrollView>

          {/* CHAT GERAL */}

          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => navigation.navigate('Chat')}
          >

            <View style={styles.chatIcon}>

              <Ionicons
                name="chatbubbles"
                size={28}
                color="#FFF"
              />

            </View>

            <View style={styles.chatTextArea}>

              <Text style={styles.chatTitle}>
                Chat Geral
              </Text>

              <Text style={styles.chatDescription}>
                Converse e compartilhe opiniões sobre trânsito.
              </Text>

            </View>

            <Ionicons
              name="chevron-forward"
              size={25}
              color="#242B67"
            />

          </TouchableOpacity>

          {/* FEED */}

          <View style={styles.feedHeader}>

            <Text style={styles.feedTitle}>
              PAUTAS COMENTADAS
            </Text>

            <MaterialCommunityIcons
              name="forum-outline"
              size={22}
              color="#242B67"
            />

          </View>

          {/* LISTA */}

          {pautas.map((pauta) => (

            <TouchableOpacity
              key={pauta.id}
              style={styles.pautaCard}
              onPress={() =>
                navigation.navigate('Pauta', {
                  pauta,
                })
              }
            >

              <Image
                source={pauta.imagem}
                style={styles.pautaImagem}
              />

              <View style={styles.pautaContent}>

                <Text
                  style={styles.pautaTitulo}
                  numberOfLines={3}
                >
                  {pauta.titulo}
                </Text>

                <View style={styles.commentArea}>

                  <Ionicons
                    name="chatbubble-outline"
                    size={13}
                    color="#777"
                  />

                  <Text style={styles.commentText}>
                    {pauta.comentarios} comentários
                  </Text>

                </View>

              </View>

            </TouchableOpacity>

          ))}

          {/* BOTÃO VER MAIS */}

          <TouchableOpacity style={styles.verMais}>

            <Text style={styles.verMaisText}>
              Ver mais discussões
            </Text>

            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFF"
            />

          </TouchableOpacity>

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

  header: {
    height: 60,
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderTopWidth: 3,
    borderTopColor: '#242B67',
  },

  title: {
    color: '#242B67',
    fontSize: 18,
    fontWeight: 'bold',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* BANNER */

  bannerContainer: {
    height: 150,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },

  banner: {
    width: '100%',
    height: '100%',
  },

  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.30)',
  },

  bannerText: {
    position: 'absolute',
    left: 15,
    bottom: 15,
  },

  bannerTitle: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 24,
  },

  bannerSubTitle: {
    color: '#FFF',
    fontSize: 11,
    marginTop: 5,
  },

  /* CATEGORIAS */

categories: {
    marginTop: 18,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
},

category: {
    flex: 1,
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    marginHorizontal: 4,

    elevation: 3,
},

categoryText: {
    fontSize: 10,
    color: '#242B67',
    marginTop: 5,
    fontWeight: '600',
    textAlign: 'center',
},

  /* CHAT */

  chatCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 12,
    marginTop: 20,
    padding: 15,

    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 3,
  },

  chatIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: '#242B67',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 12,
  },

  chatTextArea: {
    flex: 1,
  },

  chatTitle: {
    color: '#242B67',
    fontSize: 16,
    fontWeight: 'bold',
  },

  chatDescription: {
    color: '#666',
    fontSize: 12,
    marginTop: 3,
  },

  /* FEED */

  feedHeader: {
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 10,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  feedTitle: {
    color: '#242B67',
    fontSize: 14,
    fontWeight: 'bold',
  },

  /* PAUTAS */

  pautaCard: {
    backgroundColor: '#FFF',

    marginHorizontal: 12,
    marginBottom: 10,

    padding: 8,
    borderRadius: 8,

    flexDirection: 'row',

    elevation: 2,
  },

  pautaImagem: {
    width: 65,
    height: 65,
    borderRadius: 6,
  },

  pautaContent: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },

  pautaTitulo: {
    color: '#333',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },

  commentArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  commentText: {
    color: '#777',
    fontSize: 10,
    marginLeft: 5,
  },

  /* VER MAIS */

  verMais: {
    backgroundColor: '#242B67',

    marginHorizontal: 12,
    marginTop: 10,

    paddingVertical: 14,

    borderRadius: 10,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  verMaisText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 8,
  },

});
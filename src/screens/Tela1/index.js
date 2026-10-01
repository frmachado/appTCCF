import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import dadosBusca from '../../data/busca';


export default function Home({ usuario }) {

  const navigation = useNavigation();


  // =====================================================
  // USUÁRIO
  // =====================================================

  const [nomeUsuario, setNomeUsuario] = useState('');


  useEffect(() => {
    carregarUsuario();
  }, [usuario]);


  async function carregarUsuario() {

    try {

      // Primeiro tenta usar o usuário recebido pelo Drawer
      if (usuario?.nome) {

        setNomeUsuario(usuario.nome);

        return;
      }


      // Caso não tenha recebido pelo Drawer,
      // procura o usuário salvo no celular
      const usuarioSalvo =
        await AsyncStorage.getItem('usuario');


      if (usuarioSalvo) {

        const usuarioConvertido =
          JSON.parse(usuarioSalvo);


        if (usuarioConvertido?.nome) {

          setNomeUsuario(
            usuarioConvertido.nome
          );

        }

      }

    } catch (erro) {

      console.log(
        'Erro ao carregar usuário:',
        erro
      );

    }

  }


  // =====================================================
  // BUSCA
  // =====================================================

  const [pesquisa, setPesquisa] = useState('');


  // Remove acentos e transforma em minúsculo
  function normalizarTexto(texto) {

    return texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  }


  // =====================================================
  // RESULTADOS DA BUSCA GLOBAL
  // =====================================================

  const resultados = dadosBusca.filter((item) => {

    const termo =
      normalizarTexto(
        pesquisa.trim()
      );


    if (!termo) {
      return false;
    }


    const titulo =
      normalizarTexto(
        item.titulo
      );


    const descricao =
      normalizarTexto(
        item.descricao
      );


    const palavrasChave =
      normalizarTexto(
        item.palavrasChave
      );


    return (
      titulo.includes(termo) ||
      descricao.includes(termo) ||
      palavrasChave.includes(termo)
    );

  });


  // =====================================================
  // ABRIR RESULTADO
  // =====================================================

  function abrirResultado(tela) {

    navigation.navigate(tela);

    setPesquisa('');

  }


  // =====================================================
  // TELA
  // =====================================================

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#242B67"
        barStyle="light-content"
      />


      {/* =================================================
          HEADER
      ================================================= */}

      <View style={styles.header}>

        <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => navigation.openDrawer()}
>
    <Image
        source={require('../../../assets/logos/LogoSPI.png')}
        style={styles.logo}
    />
</TouchableOpacity>


        <View style={styles.userArea}>

          <Ionicons
            name="person-circle-outline"
            size={40}
            color="#FFF"
          />


          <View>

            <Text style={styles.hello}>
              Olá,
            </Text>


            <Text style={styles.user}>
              {nomeUsuario || 'Usuário'}
            </Text>

          </View>

        </View>

      </View>


      {/* =================================================
          CONTEÚDO
      ================================================= */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >


        {/* =================================================
            PESQUISA
        ================================================= */}

        <View style={styles.searchContainer}>

          <TextInput
            placeholder="Pesquisar..."
            placeholderTextColor="#777"
            style={styles.input}
            value={pesquisa}
            onChangeText={setPesquisa}
            autoCorrect={false}
            autoCapitalize="none"
          />


          {/* BOTÃO X */}

          {pesquisa.length > 0 && (

            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setPesquisa('')}
            >

              <Feather
                name="x"
                size={20}
                color="#777"
              />

            </TouchableOpacity>

          )}


          {/* BOTÃO LUPA */}

          <TouchableOpacity
            style={styles.searchButton}
          >

            <Feather
              name="search"
              size={22}
              color="#FFF"
            />

          </TouchableOpacity>

        </View>


        {/* =================================================
            RESULTADOS DA PESQUISA
        ================================================= */}

        {pesquisa.trim() !== '' ? (

          <View style={styles.resultadosContainer}>

            <Text style={styles.resultadosTitulo}>
              Resultados da pesquisa
            </Text>


            {resultados.length > 0 ? (

              resultados.map((item) => (

                <TouchableOpacity
                  key={item.id}
                  style={styles.resultadoCard}
                  onPress={() =>
                    abrirResultado(item.tela)
                  }
                >

                  {/* ÍCONE */}

                  <View style={styles.resultadoIcone}>

                    <Ionicons
                      name="search-outline"
                      size={25}
                      color="#242B67"
                    />

                  </View>


                  {/* TEXTO */}

                  <View style={styles.resultadoTexto}>

                    <Text style={styles.resultadoTitulo}>
                      {item.titulo}
                    </Text>


                    <Text style={styles.resultadoDescricao}>
                      {item.descricao}
                    </Text>

                  </View>


                  {/* SETA */}

                  <Feather
                    name="chevron-right"
                    size={22}
                    color="#242B67"
                  />

                </TouchableOpacity>

              ))

            ) : (

              <View style={styles.semResultado}>

                <Feather
                  name="search"
                  size={45}
                  color="#999"
                />


                <Text style={styles.semResultadoTitulo}>
                  Nenhum resultado encontrado
                </Text>


                <Text style={styles.semResultadoTexto}>
                  Tente pesquisar por outro termo.
                </Text>

              </View>

            )}

          </View>

        ) : (

          /* =================================================
             HOME NORMAL
          ================================================= */

          <>

            {/* MENU */}

            <View style={styles.grid}>

              {/* CARTÃO SPI */}

              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Tela2')
                }
              >

                <MaterialCommunityIcons
                  name="card-account-details-outline"
                  size={45}
                  color="#242B67"
                />

                <Text style={styles.cardTitle}>
                  Cartão SPI
                </Text>

              </TouchableOpacity>


              {/* PERTO DE MIM */}

              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Tela4')
                }
              >

                <Ionicons
                  name="location-outline"
                  size={45}
                  color="#242B67"
                />

                <Text style={styles.cardTitle}>
                  Perto de Mim
                </Text>

              </TouchableOpacity>


              {/* CAMPANHAS */}

              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Tela5')
                }
              >

                <Ionicons
                  name="megaphone-outline"
                  size={45}
                  color="#242B67"
                />

                <Text style={styles.cardTitle}>
                  Campanhas
                </Text>

              </TouchableOpacity>


              {/* BLOG */}

              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  navigation.navigate('Tela6')
                }
              >

                <Ionicons
                  name="newspaper-outline"
                  size={45}
                  color="#242B67"
                />

                <Text style={styles.cardTitle}>
                  Blog
                </Text>

              </TouchableOpacity>

            </View>


            {/* BANNER */}

            <Image
              source={require('../../../assets/imagens/BannerInicial01.png')}
              style={styles.banner}
              resizeMode="cover"
            />


            {/* NOTÍCIAS */}

            <Text style={styles.sectionTitle}>
              Notícias em Destaque
            </Text>


            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >

              {/* NOTÍCIA 01 */}

              <View style={styles.newsCard}>

                <Image
                  source={require('../../../assets/imagens/Noticia01.png')}
                  style={styles.newsImage}
                />

                <Text style={styles.newsText}>
                  Semáforos inteligentes podem proporcionar
                  um trânsito mais seguro.
                </Text>

              </View>


              {/* NOTÍCIA 08 */}

              <View style={styles.newsCard}>

                <Image
                  source={require('../../../assets/imagens/Noticia08.png')}
                  style={styles.newsImage}
                />

                <Text style={styles.newsText}>
                  Deficientes visuais reclamam das dificuldades
                  em atravessar ruas.
                </Text>

              </View>

            </ScrollView>


            {/* BOTÃO SEMÁFORO INTELIGENTE */}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Tela3')
              }
              style={styles.smartButton}
            >

              <Text style={styles.smartButtonText}>
                Semáforo Inteligente
              </Text>

            </TouchableOpacity>


            {/* BOTÃO VOLTAR */}

            <TouchableOpacity
              onPress={() =>
                navigation.goBack()
              }
              style={styles.smartButton}
            >

              <Text style={styles.smartButtonText}>
                Voltar
              </Text>

            </TouchableOpacity>

          </>

        )}

      </ScrollView>

    </View>

  );

}


/* =========================================================
   ESTILOS
========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },


  /* HEADER */

  header: {
    height: 110,
    backgroundColor: '#242B67',
    paddingTop: -15,
    paddingHorizontal: 20,
    paddingBottom: -20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },


  logo: {
    width: 110,
    height: 110,
    position: 'relative',
    marginLeft: 0,
    marginTop: 20,
  },


  userArea: {
    marginRight: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },


  hello: {
    color: '#FFF',
    fontSize: 14,
    marginLeft: 8,
  },


  user: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },


  /* PESQUISA */

  searchContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    elevation: 4,
    overflow: 'hidden',
  },


  input: {
    flex: 1,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 16,
  },


  clearButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },


  searchButton: {
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242B67',
  },


  /* MENU */

  grid: {
    marginTop: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },


  card: {
    width: '47%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 25,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 4,
  },


  cardTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#242B67',
  },


  /* BANNER */

  banner: {
    width: '90%',
    height: 180,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 15,
  },


  /* NOTÍCIAS */

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#242B67',
    marginTop: 25,
    marginHorizontal: 20,
    marginBottom: 15,
  },


  newsCard: {
    width: 240,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginLeft: 20,
    overflow: 'hidden',
    elevation: 4,
  },


  newsImage: {
    width: '100%',
    height: 120,
  },


  newsText: {
    padding: 12,
    fontSize: 14,
    color: '#555',
  },


  /* BOTÕES */

  smartButton: {
    backgroundColor: '#242B67',
    marginHorizontal: 20,
    marginTop: 30,
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 40,
  },


  smartButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },


  /* =====================================================
     RESULTADOS
  ===================================================== */

  resultadosContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },


  resultadosTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#242B67',
    marginBottom: 15,
  },


  resultadoCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },


  resultadoIcone: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#F0F1F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },


  resultadoTexto: {
    flex: 1,
  },


  resultadoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#242B67',
    marginBottom: 5,
  },


  resultadoDescricao: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },


  /* SEM RESULTADO */

  semResultado: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 45,
    alignItems: 'center',
    elevation: 3,
  },


  semResultadoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
  },


  semResultadoTexto: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },

});
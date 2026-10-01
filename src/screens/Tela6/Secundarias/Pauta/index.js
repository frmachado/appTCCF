import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function Pauta({ navigation, route }) {

  const { pauta } = route.params;

  const [comentario, setComentario] = useState('');

  const [comentarios, setComentarios] = useState([
    {
      id: '1',
      usuario: 'João',
      texto: 'Acho muito importante discutir esse assunto.',
    },
    {
      id: '2',
      usuario: 'Maria',
      texto: 'O trânsito precisa ser mais acessível para todos.',
    },
    {
      id: '3',
      usuario: 'Carlos',
      texto: 'A tecnologia pode ajudar bastante a melhorar essa situação.',
    },
  ]);

  function enviarComentario() {

    if (comentario.trim() === '') {
      return;
    }

    const novoComentario = {
      id: Date.now().toString(),
      usuario: 'Você',
      texto: comentario,
    };

    setComentarios([
      ...comentarios,
      novoComentario,
    ]);

    setComentario('');
  }

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* HEADER */}

      <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.navigate('Tela6')}
          style={styles.backButton}
        >

          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFF"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Discussão
        </Text>

        <Ionicons
          name="chatbubbles-outline"
          size={26}
          color="#FFF"
        />

      </View>


      {/* CONTEÚDO */}

      <FlatList

        data={comentarios}

        keyExtractor={(item) => item.id}

        showsVerticalScrollIndicator={false}

        ListHeaderComponent={

          <View>

            {/* IMAGEM */}

            <Image
              source={pauta.imagem}
              style={styles.imagem}
            />


            {/* TÍTULO */}

            <View style={styles.conteudo}>

              <Text style={styles.titulo}>
                {pauta.titulo}
              </Text>


              {/* TEXTO DA PAUTA */}

              <Text style={styles.descricao}>

                Esta é uma discussão sobre um tema importante
                relacionado à segurança e mobilidade no trânsito.

                {'\n\n'}

                Compartilhe sua opinião e participe da conversa.
                Seu comentário pode contribuir para a discussão
                e ajudar outras pessoas a conhecer diferentes
                pontos de vista sobre o assunto.

              </Text>


              {/* TÍTULO COMENTÁRIOS */}

              <View style={styles.comentariosHeader}>

                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={22}
                  color="#242B67"
                />

                <Text style={styles.comentariosTitle}>
                  Comentários
                </Text>

              </View>

            </View>

          </View>

        }

        renderItem={({ item }) => (

          <View style={styles.comentarioCard}>

            <View style={styles.avatar}>

              <Ionicons
                name="person"
                size={20}
                color="#FFF"
              />

            </View>

            <View style={styles.comentarioContent}>

              <Text style={styles.usuario}>
                {item.usuario}
              </Text>

              <Text style={styles.textoComentario}>
                {item.texto}
              </Text>

            </View>

          </View>

        )}

      />


      {/* ADICIONAR COMENTÁRIO */}

      <View style={styles.inputArea}>

        <TextInput
          style={styles.input}
          placeholder="Adicione um comentário..."
          placeholderTextColor="#888"
          value={comentario}
          onChangeText={setComentario}
          multiline
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={enviarComentario}
        >

          <Ionicons
            name="send"
            size={21}
            color="#FFF"
          />

        </TouchableOpacity>

      </View>

    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },


  /* HEADER */

  header: {
    height: 85,

    backgroundColor: '#242B67',

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,

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

    fontSize: 21,
    fontWeight: 'bold',

    marginLeft: 5,
  },


  /* IMAGEM */

  imagem: {
    width: '100%',
    height: 200,
  },


  /* CONTEÚDO */

  conteudo: {
    paddingHorizontal: 18,
    paddingTop: 20,
  },

  titulo: {
    color: '#242B67',

    fontSize: 22,
    fontWeight: 'bold',

    lineHeight: 28,
  },

  descricao: {
    color: '#555',

    fontSize: 14,

    lineHeight: 21,

    marginTop: 15,
  },


  /* COMENTÁRIOS */

  comentariosHeader: {

    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 25,
    marginBottom: 10,
  },

  comentariosTitle: {

    color: '#242B67',

    fontSize: 18,

    fontWeight: 'bold',

    marginLeft: 8,
  },


  /* CARD COMENTÁRIO */

  comentarioCard: {

    backgroundColor: '#FFF',

    marginHorizontal: 15,
    marginBottom: 10,

    padding: 12,

    borderRadius: 12,

    flexDirection: 'row',

    elevation: 2,
  },

  avatar: {

    width: 38,
    height: 38,

    borderRadius: 19,

    backgroundColor: '#242B67',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 10,
  },

  comentarioContent: {
    flex: 1,
  },

  usuario: {

    color: '#242B67',

    fontWeight: 'bold',

    fontSize: 14,

    marginBottom: 4,
  },

  textoComentario: {

    color: '#444',

    fontSize: 13,

    lineHeight: 18,
  },


  /* INPUT */

  inputArea: {

    flexDirection: 'row',

    alignItems: 'flex-end',

    backgroundColor: '#FFF',

    paddingHorizontal: 12,
    paddingVertical: 10,

    borderTopWidth: 1,
    borderTopColor: '#DDD',
  },

  input: {

    flex: 1,

    backgroundColor: '#F0F0F0',

    borderRadius: 22,

    paddingHorizontal: 15,
    paddingVertical: 10,

    maxHeight: 100,

    fontSize: 14,

    marginRight: 10,
  },

  sendButton: {

    width: 48,
    height: 48,

    borderRadius: 24,

    backgroundColor: '#242B67',

    justifyContent: 'center',
    alignItems: 'center',
  },

});
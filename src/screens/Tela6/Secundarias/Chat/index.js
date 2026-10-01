import React, { useState, useRef, useEffect } from 'react';

import {
View,
Text,
StyleSheet,
TouchableOpacity,
TextInput,
FlatList,
KeyboardAvoidingView,
Platform,
Alert,
ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const IP_DO_PC = '192.168.3.136';

const URL_LISTAR =
`http://${IP_DO_PC}/con_app/chat_listar.php`;

const URL_ENVIAR =
`http://${IP_DO_PC}/con_app/chat_enviar.php`;

export default function ChatGeral({ navigation }) {

const [mensagem, setMensagem] = useState('');

const [mensagens, setMensagens] = useState([]);

const [usuario, setUsuario] = useState(null);

const [carregando, setCarregando] = useState(true);

const [enviando, setEnviando] = useState(false);

const flatListRef = useRef(null);


async function carregarUsuario() {

    try {

        const dadosSalvos =
            await AsyncStorage.getItem('usuario');

        if (!dadosSalvos) {

            Alert.alert(
                'Sessão',
                'Usuário não encontrado. Faça login novamente.'
            );

            return;
        }

        const dadosUsuario =
            JSON.parse(dadosSalvos);

        console.log(
            'USUÁRIO DO CHAT:',
            dadosUsuario
        );

        setUsuario(dadosUsuario);

    } catch (erro) {

        console.log(
            'Erro ao carregar usuário:',
            erro
        );

    }
}


async function carregarMensagens(mostrarCarregando = false) {

    try {

        if (mostrarCarregando) {
            setCarregando(true);
        }

        const resposta =
            await fetch(URL_LISTAR);

        const dados =
            await resposta.json();

        if (dados.sucesso) {

            setMensagens(
                dados.mensagens
            );

        } else {

            console.log(
                'Erro no chat:',
                dados.mensagem
            );

        }

    } catch (erro) {

        console.log(
            'Erro de conexão com chat:',
            erro
        );

    } finally {

        if (mostrarCarregando) {
            setCarregando(false);
        }

    }
}


useEffect(() => {

    carregarUsuario();

    carregarMensagens(true);

}, []);


useEffect(() => {

    const intervalo =
        setInterval(() => {

            carregarMensagens(false);

        }, 2000);


    return () => {

        clearInterval(intervalo);

    };

}, []);


async function enviarMensagem() {

    const texto =
        mensagem.trim();


    if (texto === '') {
        return;
    }


    if (!usuario) {

        Alert.alert(
            'Erro',
            'Usuário não identificado.'
        );

        return;
    }


    if (!usuario.idUsuario) {

        Alert.alert(
            'Erro',
            'ID do usuário não encontrado.'
        );

        return;
    }


    try {

        setEnviando(true);


        const resposta =
            await fetch(
                URL_ENVIAR,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({

                        usuario_id:
                            Number(usuario.idUsuario),

                        nome_usuario:
                            usuario.nome,

                        mensagem:
                            texto

                    })
                }
            );


        const dados =
            await resposta.json();


        console.log(
            'RESPOSTA CHAT:',
            dados
        );


        if (dados.sucesso) {

            setMensagem('');

            await carregarMensagens(false);


            setTimeout(() => {

                flatListRef.current?.scrollToEnd({
                    animated: true
                });

            }, 100);

        } else {

            Alert.alert(
                'Erro',
                dados.mensagem ||
                'Não foi possível enviar a mensagem.'
            );

        }

    } catch (erro) {

        console.log(
            'Erro ao enviar mensagem:',
            erro
        );


        Alert.alert(
            'Erro de conexão',
            'Não foi possível enviar a mensagem.\n\nVerifique se o XAMPP está ligado e se o celular está na mesma rede Wi-Fi.'
        );

    } finally {

        setEnviando(false);

    }
}


function renderMensagem({ item }) {

    const minhaMensagem =
        usuario &&
        Number(item.usuario_id) ===
        Number(usuario.idUsuario);


    return (

        <View
            style={[
                styles.mensagemContainer,

                minhaMensagem
                    ? styles.mensagemPropria
                    : styles.mensagemOutro
            ]}
        >

            {!minhaMensagem && (

                <Text style={styles.nomeUsuario}>
                    {item.usuario}
                </Text>

            )}


            <Text
                style={[
                    styles.textoMensagem,

                    minhaMensagem
                        ? styles.textoProprio
                        : styles.textoOutro
                ]}
            >
                {item.texto}
            </Text>


            {item.horario && (

                <Text
                    style={[
                        styles.horario,

                        minhaMensagem
                            ? styles.horarioProprio
                            : styles.horarioOutro
                    ]}
                >
                    {item.horario}
                </Text>

            )}

        </View>

    );

}


return (

    <KeyboardAvoidingView
        style={styles.container}

        behavior={
            Platform.OS === 'ios'
                ? 'padding'
                : 'height'
        }
    >

        <View style={styles.header}>

            <TouchableOpacity
                style={styles.backButton}

                onPress={() =>
                    navigation.navigate('Tela6')
                }
            >

                <Ionicons
                    name="arrow-back"
                    size={28}
                    color="#FFF"
                />

            </TouchableOpacity>


            <View style={styles.headerText}>

                <Text style={styles.titulo}>
                    Chat Geral
                </Text>

                <Text style={styles.online}>
                    ● Comunidade SPI
                </Text>

            </View>


            <Ionicons
                name="chatbubbles"
                size={28}
                color="#FFF"
            />

        </View>


        <View style={styles.boasVindas}>

            <Ionicons
                name="information-circle-outline"
                size={20}
                color="#242B67"
            />

            <Text style={styles.boasVindasTexto}>
                Converse com outros usuários sobre trânsito,
                acessibilidade e o Semáforo Inteligente.
            </Text>

        </View>


        {carregando ? (

            <View style={styles.carregando}>

                <ActivityIndicator
                    size="large"
                    color="#242B67"
                />

                <Text style={styles.textoCarregando}>
                    Carregando mensagens...
                </Text>

            </View>

        ) : (

            <FlatList

                ref={flatListRef}

                data={mensagens}

                renderItem={renderMensagem}

                keyExtractor={(item) =>
                    String(item.id)
                }

                contentContainerStyle={styles.lista}

                showsVerticalScrollIndicator={false}

                onContentSizeChange={() => {

                    flatListRef.current?.scrollToEnd({
                        animated: false
                    });

                }}

            />

        )}


        <View style={styles.inputArea}>

            <TextInput

                style={styles.input}

                placeholder="Digite uma mensagem..."

                placeholderTextColor="#888"

                value={mensagem}

                onChangeText={setMensagem}

                multiline

                maxLength={500}

            />


            <TouchableOpacity

                style={[
                    styles.sendButton,

                    enviando &&
                    styles.sendButtonDesativado
                ]}

                onPress={enviarMensagem}

                disabled={enviando}

            >

                {enviando ? (

                    <ActivityIndicator
                        size="small"
                        color="#FFF"
                    />

                ) : (

                    <Ionicons
                        name="send"
                        size={22}
                        color="#FFF"
                    />

                )}

            </TouchableOpacity>

        </View>

    </KeyboardAvoidingView>

);

}

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingTop: 34
},

header: {
    height: 125,
    marginTop: -55,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#242B67',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
},

backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
},

headerText: {
    flex: 1,
    marginLeft: 5
},

titulo: {
    color: '#FFF',
    fontSize: 21,
    fontWeight: 'bold'
},

online: {
    color: '#D9D9D9',
    fontSize: 12,
    marginTop: 2
},

boasVindas: {
    flexDirection: 'row',
    backgroundColor: '#E7E9F5',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center'
},

boasVindasTexto: {
    flex: 1,
    color: '#242B67',
    fontSize: 12,
    marginLeft: 8,
    lineHeight: 17
},

lista: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 20
},

mensagemContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 15,
    marginBottom: 12
},

mensagemOutro: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 3,
    elevation: 2
},

mensagemPropria: {
    backgroundColor: '#242B67',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 3
},

nomeUsuario: {
    color: '#242B67',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
},

textoMensagem: {
    fontSize: 14,
    lineHeight: 19
},

textoOutro: {
    color: '#333'
},

textoProprio: {
    color: '#FFF'
},

horario: {
    fontSize: 9,
    marginTop: 5,
    alignSelf: 'flex-end'
},

horarioProprio: {
    color: '#D9D9D9'
},

horarioOutro: {
    color: '#888'
},

inputArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#DDD'
},

input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 22,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 14,
    marginRight: 10
},

sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#242B67',
    justifyContent: 'center',
    alignItems: 'center'
},

sendButtonDesativado: {
    opacity: 0.6
},

carregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},

textoCarregando: {
    marginTop: 10,
    color: '#666',
    fontSize: 13
}


});

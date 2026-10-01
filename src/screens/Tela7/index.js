import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    SafeAreaView,
    Alert,
    ActivityIndicator,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';


const IP_DO_PC = '192.168.3.100';


export default function SAC({ navigation }) {

    const [busca, setBusca] = useState('');

    const [aberta, setAberta] = useState(null);

    const [duvida, setDuvida] = useState('');

    const [usuario, setUsuario] = useState(null);

    const [enviando, setEnviando] = useState(false);


    /* =========================================
       CARREGAR USUÁRIO LOGADO
    ========================================= */

    useEffect(() => {

        carregarUsuario();

    }, []);


    async function carregarUsuario() {

        try {

            const usuarioSalvo =
                await AsyncStorage.getItem('usuario');


            if (usuarioSalvo) {

                const usuarioConvertido =
                    JSON.parse(usuarioSalvo);

                setUsuario(usuarioConvertido);

            }

        } catch (erro) {

            console.log(
                'Erro ao carregar usuário:',
                erro
            );

        }

    }


    /* =========================================
       PERGUNTAS FREQUENTES
    ========================================= */

    const perguntas = [

        {
            id: 1,

            pergunta:
                'Qual o horário de atendimento da central de atendimento?',

            resposta:
                'Para obter informações sobre o atendimento, consulte os canais oficiais de contato disponíveis no aplicativo.'
        },


        {
            id: 2,

            pergunta:
                'O que é a SPI - Sênior pass inteligência?',

            resposta:
                'A SPI é uma proposta voltada à utilização de informações e tecnologia para auxiliar na segurança, mobilidade e acessibilidade dos usuários no trânsito.'
        },


        {
            id: 3,

            pergunta:
                'O site e o aplicativo são seguros?',

            resposta:
                'O aplicativo foi desenvolvido com o objetivo de oferecer informações e serviços relacionados ao trânsito de forma simples e segura.'
        },


        {
            id: 4,

            pergunta:
                'Qual o canal para reclamações?',

            resposta:
                'As reclamações, dúvidas e sugestões podem ser encaminhadas por meio do atendimento disponibilizado no aplicativo.'
        },


        {
            id: 5,

            pergunta:
                'As informações que estão no site são seguras?',

            resposta:
                'As informações disponibilizadas têm como objetivo auxiliar os usuários e devem ser utilizadas de acordo com as orientações apresentadas no aplicativo.'
        },

    ];


    /* =========================================
       NORMALIZAR TEXTO
    ========================================= */

    function normalizar(texto) {

        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

    }


    /* =========================================
       FILTRAR PERGUNTAS
    ========================================= */

    const perguntasFiltradas = perguntas.filter(
        (item) => {

            const textoBusca =
                normalizar(busca.trim());


            /*
                Se não estiver pesquisando,
                mostra todas as perguntas.
            */

            if (!textoBusca) {

                return true;

            }


            /*
                Procura tanto na pergunta
                quanto na resposta.
            */

            return (

                normalizar(item.pergunta)
                    .includes(textoBusca)

                ||

                normalizar(item.resposta)
                    .includes(textoBusca)

            );

        }
    );


    /* =========================================
       VERIFICA SE ESTÁ PESQUISANDO
    ========================================= */

    const pesquisando =
        busca.trim().length > 0;


    const nenhumaResposta =
        pesquisando &&
        perguntasFiltradas.length === 0;


    /* =========================================
       ABRIR / FECHAR PERGUNTA
    ========================================= */

    function alternarPergunta(id) {

        if (aberta === id) {

            setAberta(null);

        } else {

            setAberta(id);

        }

    }


    /* =========================================
       ENVIAR DÚVIDA
    ========================================= */

    async function enviarDuvida() {

        /*
            Verifica se o campo está vazio
        */

        if (!duvida.trim()) {

            Alert.alert(
                'Atenção',
                'Digite sua dúvida antes de enviar.'
            );

            return;

        }


        /*
            Verifica se existe usuário logado
        */

        if (!usuario?.idUsuario) {

            Alert.alert(
                'Erro',
                'Não foi possível identificar o usuário logado.'
            );

            return;

        }


        try {

            setEnviando(true);


            /*
                Envia a dúvida para o PHP
            */

            const resposta = await fetch(
                `http://${IP_DO_PC}/con_app/enviarDuvida.php`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({

                        idUsuario:
                            usuario.idUsuario,

                        duvida:
                            duvida.trim(),

                    }),

                }
            );


            /*
                Converte a resposta para JSON
            */

            const dados =
                await resposta.json();


            /*
                Se deu certo
            */

            if (dados.sucesso) {

                Alert.alert(
                    'Dúvida enviada!',
                    'Sua dúvida foi enviada com sucesso para nossa equipe.',
                    [
                        {
                            text: 'OK',

                            onPress: () => {

                                setDuvida('');

                            }

                        }
                    ]
                );

            } else {

                Alert.alert(
                    'Erro',
                    dados.mensagem ||
                    'Não foi possível enviar sua dúvida.'
                );

            }


        } catch (erro) {

            console.log(
                'Erro ao enviar dúvida:',
                erro
            );


            Alert.alert(
                'Erro de conexão',

                'Não foi possível enviar sua dúvida.\n\n' +

                'Verifique se o XAMPP está ligado e se o celular está na mesma rede Wi-Fi do computador.'
            );

        } finally {

            setEnviando(false);

        }

    }


    /* =========================================
       TELA
    ========================================= */

    return (

        <SafeAreaView style={styles.container}>


            {/* =====================================
                CABEÇALHO
            ====================================== */}

            <View style={styles.header}>


                {/* SETA À ESQUERDA */}

                <TouchableOpacity
                    style={styles.botaoVoltarTopo}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('Tela1')}
                >

                    <Ionicons
                        name="arrow-back"
                        size={32}
                        color="#FFFFFF"
                    />

                </TouchableOpacity>


                {/* LOGO NO CENTRO */}

                <Image
                    source={require('../../../assets/logos/LogoSPI.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />


                {/* FAQ À DIREITA */}

                <Text style={styles.tituloFaq}>
                    Faq
                </Text>


            </View>


            {/* =====================================
                CONTEÚDO
            ====================================== */}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >


                {/* =================================
                    ÁREA AZUL
                ================================== */}

                <View style={styles.areaAzul}>


                    <Text style={styles.tituloPerguntas}>

                        ✦ Perguntas Frequentes

                    </Text>


                    <Text style={styles.subtitulo}>

                        Encontre respostas rápidas para suas dúvidas.
                        Digite sua pergunta abaixo ou explore nossos
                        tópicos mais populares.

                    </Text>


                    {/* =================================
                        CAMPO DE BUSCA
                    ================================== */}

                    <View style={styles.areaBusca}>


                        <TextInput
                            value={busca}

                            onChangeText={(texto) => {

                                setBusca(texto);

                                setAberta(null);

                            }}

                            placeholder="Digite sua pergunta..."

                            placeholderTextColor="#777777"

                            style={styles.inputBusca}

                            returnKeyType="search"

                        />


                        <Ionicons
                            name="search"
                            size={31}
                            color="#000000"
                        />


                    </View>


                </View>


                {/* =================================
                    ÁREA DAS PERGUNTAS
                ================================== */}

                <View style={styles.areaPerguntas}>


                    {/* =================================
                        NENHUM RESULTADO
                    ================================== */}

                    {nenhumaResposta && (

                        <View style={styles.avisoSemResultado}>


                            <View style={styles.iconeAviso}>

                                <Ionicons
                                    name="search-outline"
                                    size={30}
                                    color="#242B67"
                                />

                            </View>


                            <Text style={styles.tituloAviso}>

                                Nenhuma resposta encontrada

                            </Text>


                            <Text style={styles.textoAviso}>

                                Não encontramos uma pergunta relacionada
                                à sua busca. Você pode enviar sua dúvida
                                para nossa equipe abaixo.

                            </Text>


                        </View>

                    )}


                    {/* =================================
                        PERGUNTAS
                    ================================== */}

                    {perguntasFiltradas.map(
                        (item) => (

                            <View
                                key={item.id}
                                style={styles.perguntaContainer}
                            >


                                {/* PERGUNTA */}

                                <TouchableOpacity
                                    style={styles.pergunta}

                                    activeOpacity={0.8}

                                    onPress={() =>
                                        alternarPergunta(item.id)
                                    }
                                >


                                    <Text
                                        style={styles.perguntaTexto}
                                    >

                                        {item.pergunta}

                                    </Text>


                                    <View
                                        style={styles.botaoAbrir}
                                    >

                                        <Ionicons
                                            name={
                                                aberta === item.id
                                                    ? 'chevron-up'
                                                    : 'chevron-down'
                                            }

                                            size={21}

                                            color="#000000"
                                        />

                                    </View>


                                </TouchableOpacity>


                                {/* RESPOSTA */}

                                {aberta === item.id && (

                                    <View
                                        style={styles.resposta}
                                    >

                                        <Text
                                            style={styles.respostaTexto}
                                        >

                                            {item.resposta}

                                        </Text>

                                    </View>

                                )}


                            </View>

                        )
                    )}


                    {/* =================================
                        ENVIE SUA DÚVIDA
                    ================================== */}

                    <View style={styles.caixaDuvida}>


                        <Text style={styles.tituloDuvida}>

                            Não encontrou o que procurava?

                        </Text>


                        <Text style={styles.subtituloDuvida}>

                            Envie sua dúvida para nossa equipe.

                        </Text>


                        {/* CAMPO */}

                        <TextInput

                            value={duvida}

                            onChangeText={setDuvida}

                            placeholder="Digite sua dúvida aqui..."

                            placeholderTextColor="#888888"

                            multiline

                            textAlignVertical="top"

                            style={styles.inputDuvida}

                        />


                        {/* BOTÃO */}

                        <TouchableOpacity

                            style={styles.botaoEnviar}

                            activeOpacity={0.8}

                            onPress={enviarDuvida}

                            disabled={enviando}

                        >


                            {enviando ? (

                                <ActivityIndicator
                                    size="small"
                                    color="#FFFFFF"
                                />

                            ) : (

                                <>

                                    <Ionicons
                                        name="send-outline"
                                        size={20}
                                        color="#FFFFFF"
                                    />


                                    <Text
                                        style={
                                            styles.textoBotaoEnviar
                                        }
                                    >

                                        Enviar dúvida

                                    </Text>

                                </>

                            )}


                        </TouchableOpacity>


                    </View>


                </View>


            </ScrollView>


        </SafeAreaView>

    );

}


/* =============================================
   ESTILOS
============================================= */

const styles = StyleSheet.create({

    /* =================================
       CONTAINER
    ================================== */

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },


    /* =================================
       CABEÇALHO
    ================================== */

header: {
    height: 100,
    backgroundColor: '#242B67',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
},

botaoVoltarTopo: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    left: 10,
},

logo: {
    position: 'absolute',
    marginTop: 10,
    width: 145,
    height: 135,
    right: -5,
    zIndex: 2,
},

tituloFaq: {
    position: 'absolute',
    marginTop: -5,
    left: 0,
    right: 20,
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
    zIndex: 1,
},


    /* =================================
       FAQ À DIREITA
    ================================== */


    /* =================================
       ÁREA AZUL
    ================================== */

    areaAzul: {
        backgroundColor: '#242B67',

        paddingHorizontal: 15,

        paddingTop: 12,

        paddingBottom: 25,
    },


    tituloPerguntas: {
        color: '#FFFFFF',

        fontSize: 20,

        fontWeight: '900',

        marginBottom: 3,
    },


    subtitulo: {
        color: '#FFFFFF',

        fontSize: 12,

        lineHeight: 17,

        marginBottom: 15,
    },


    /* =================================
       BUSCA
    ================================== */

    areaBusca: {
        height: 48,

        backgroundColor: '#FFFFFF',

        borderRadius: 7,

        flexDirection: 'row',

        alignItems: 'center',

        paddingHorizontal: 12,
    },


    inputBusca: {
        flex: 1,

        height: 48,

        color: '#000000',

        fontSize: 14,
    },


    /* =================================
       ÁREA DAS PERGUNTAS
    ================================== */

    areaPerguntas: {
        paddingHorizontal: 15,

        paddingTop: 15,

        paddingBottom: 20,

        backgroundColor: '#FFFFFF',
    },


    perguntaContainer: {
        marginBottom: 13,
    },


    /* =================================
       PERGUNTA
    ================================== */

    pergunta: {
        minHeight: 55,

        borderWidth: 2,

        borderColor: '#C7C7C7',

        borderRadius: 15,

        backgroundColor: '#FFFFFF',

        flexDirection: 'row',

        alignItems: 'center',

        paddingLeft: 12,

        paddingRight: 8,

        shadowColor: '#000000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.15,

        shadowRadius: 3,

        elevation: 2,
    },


    perguntaTexto: {
        flex: 1,

        color: '#000000',

        fontSize: 11,

        fontWeight: '800',

        lineHeight: 15,
    },


    botaoAbrir: {
        width: 30,

        height: 30,

        justifyContent: 'center',

        alignItems: 'center',

        marginLeft: 5,
    },


    /* =================================
       RESPOSTA
    ================================== */

    resposta: {
        backgroundColor: '#F2F2F2',

        borderBottomLeftRadius: 12,

        borderBottomRightRadius: 12,

        paddingHorizontal: 15,

        paddingVertical: 13,

        marginTop: -4,

        borderWidth: 1,

        borderTopWidth: 0,

        borderColor: '#C7C7C7',
    },


    respostaTexto: {
        color: '#333333',

        fontSize: 13,

        lineHeight: 19,
    },


    /* =================================
       AVISO SEM RESULTADO
    ================================== */

    avisoSemResultado: {
        alignItems: 'center',

        backgroundColor: '#F2F3FA',

        borderRadius: 12,

        paddingHorizontal: 15,

        paddingVertical: 15,

        marginBottom: 15,
    },


    iconeAviso: {
        width: 50,

        height: 50,

        borderRadius: 25,

        backgroundColor: '#FFFFFF',

        justifyContent: 'center',

        alignItems: 'center',

        marginBottom: 7,
    },


    tituloAviso: {
        color: '#242B67',

        fontSize: 16,

        fontWeight: '900',

        marginTop: 3,

        textAlign: 'center',
    },


    textoAviso: {
        color: '#555555',

        fontSize: 13,

        lineHeight: 18,

        textAlign: 'center',

        marginTop: 5,
    },


    /* =================================
       CAIXA DA DÚVIDA
    ================================== */

    caixaDuvida: {
        backgroundColor: '#FFFFFF',

        borderWidth: 2,

        borderColor: '#C7C7C7',

        borderRadius: 15,

        padding: 14,

        marginTop: 5,

        shadowColor: '#000000',

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.12,

        shadowRadius: 3,

        elevation: 2,
    },


    tituloDuvida: {
        color: '#242B67',

        fontSize: 17,

        fontWeight: '900',

        marginBottom: 4,
    },


    subtituloDuvida: {
        color: '#666666',

        fontSize: 13,

        marginBottom: 12,
    },


    /* =================================
       CAMPO DA DÚVIDA
    ================================== */

    inputDuvida: {
        minHeight: 90,

        borderWidth: 1,

        borderColor: '#D0D0D0',

        borderRadius: 10,

        paddingHorizontal: 12,

        paddingVertical: 10,

        color: '#000000',

        fontSize: 14,

        backgroundColor: '#FAFAFA',

        marginBottom: 10,
    },


    /* =================================
       BOTÃO ENVIAR
    ================================== */

    botaoEnviar: {
        height: 46,

        borderRadius: 9,

        backgroundColor: '#242B67',

        flexDirection: 'row',

        alignItems: 'center',

        justifyContent: 'center',
    },


    textoBotaoEnviar: {
        color: '#FFFFFF',

        fontSize: 15,

        fontWeight: 'bold',

        marginLeft: 8,
    },


    /* =================================
       SCROLL
    ================================== */

    scrollContent: {
        paddingBottom: 25,
    },

});
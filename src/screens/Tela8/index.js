import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
    SafeAreaView,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';


export default function Parcerias({ navigation }) {

    return (

        <SafeAreaView style={styles.container}>

            {/* CABEÇALHO */}

            <View style={styles.header}>

                <Text style={styles.titulo}>
                    PARCERIAS
                </Text>

                <TouchableOpacity
                    style={styles.botaoVoltar}
                    activeOpacity={0.8}
                    onPress={() => navigation.goBack()}
                >

                    <Ionicons
                        name="chevron-forward"
                        size={27}
                        color="#000000"
                    />

                </TouchableOpacity>

            </View>


            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* SENNA */}

                <View style={styles.parceiro}>

                    <View style={styles.logoContainer}>

                        <Image
                            source={require('../../../assets/imagens/PatrocinadorSena.png')}
                            style={styles.logoSenna}
                            resizeMode="contain"
                        />

                    </View>

                    <View style={styles.informacoes}>

                        <Text style={styles.nome}>
                            C.f.c. Auto Escola Senna Ltda
                        </Text>

                        <Text style={styles.info}>
                            Endereço: R. Dr. Gerônimo Monteiro
                        </Text>

                        <Text style={styles.info}>
                            Lopes, 50 - Vila São Francisco,
                        </Text>

                        <Text style={styles.info}>
                            Registro - SP, 11900-000
                        </Text>

                        <Text style={styles.telefone}>
                            Telefone: (13) 99750-0696
                        </Text>

                    </View>

                </View>


                {/* FREITAS */}

                <View style={styles.parceiro}>

                    <View style={styles.logoContainer}>

                        <Image
                            source={require('../../../assets/imagens/PatrocinadorFreitas.png')}
                            style={styles.logoFreitas}
                            resizeMode="contain"
                        />

                    </View>

                    <View style={styles.informacoes}>

                        <Text style={styles.nome}>
                            C.f.c. Auto Escola Freitas Ltda
                        </Text>

                        <Text style={styles.info}>
                            Endereço: R. Haguemu
                        </Text>

                        <Text style={styles.info}>
                            Matsuzava, 683 - Vila
                        </Text>

                        <Text style={styles.info}>
                            Ribeiropolis, Registro - SP
                        </Text>

                        <Text style={styles.telefone}>
                            Telefone: (13) 99719-1988
                        </Text>

                        <Text style={styles.info}>
                            CEP: 11900-000.
                        </Text>

                    </View>

                </View>


                {/* PODIUM */}

                <View style={styles.parceiro}>

                    <View style={styles.logoContainer}>

                        <Image
                            source={require('../../../assets/imagens/PatrocinadorPodium.png')}
                            style={styles.logoPodium}
                            resizeMode="contain"
                        />

                    </View>

                    <View style={styles.informacoes}>

                        <Text style={styles.nome}>
                            C.f.c. Auto Escola Podium Ltda
                        </Text>

                        <Text style={styles.info}>
                            Endereço: R. Nossa Sra. da
                        </Text>

                        <Text style={styles.info}>
                            Guia, 85 - Centro - Eldorado - SP.
                        </Text>

                        <Text style={styles.telefone}>
                            Telefone: (13) 99778-8630
                        </Text>

                        <Text style={styles.info}>
                            CEP: 11960-000
                        </Text>

                    </View>

                </View>


                {/* TEXTO FINAL */}

                <View style={styles.textoFinal}>

                    <Text style={styles.textoFinalTexto}>
                        "O projeto une forças com os principais Centros
                        de Formação de Condutores de Registro e
                        Eldorado, garantindo que as diretrizes de
                        segurança no trânsito cheguem a diferentes
                        comunidades do Vale do Ribeira."
                    </Text>

                </View>


                {/* BOTÃO VOLTAR */}

                <View style={styles.areaVoltar}>

                    <TouchableOpacity
                        style={styles.botaoVoltarInferior}
                        activeOpacity={0.8}
                        onPress={() => navigation.goBack()}
                    >

                        <Ionicons
                            name="chevron-back"
                            size={30}
                            color="#000000"
                        />

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },


    /* CABEÇALHO */

    header: {
        height: 78,
        backgroundColor: '#242B67',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },

    titulo: {
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: '900',
        letterSpacing: 0.5,
    },

    botaoVoltar: {
        width: 34,
        height: 34,
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 18,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },


    /* CONTEÚDO */

    scrollContent: {
        paddingBottom: 20,
    },


    /* PARCEIROS */

    parceiro: {
        minHeight: 155,
        backgroundColor: '#BDBDBD',
        flexDirection: 'row',
        paddingVertical: 13,
        paddingHorizontal: 8,
        marginBottom: 5,
    },

    logoContainer: {
        width: 125,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5,
    },

    logoSenna: {
        width: 115,
        height: 70,
    },

    logoFreitas: {
        width: 110,
        height: 75,
    },

    logoPodium: {
        width: 115,
        height: 75,
    },

    informacoes: {
        flex: 1,
        paddingLeft: 3,
    },

    nome: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 5,
    },

    info: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 19,
    },

    telefone: {
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 20,
        marginTop: 7,
    },


    /* TEXTO FINAL */

    textoFinal: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },

    textoFinalTexto: {
        color: '#111111',
        fontSize: 12,
        fontWeight: '800',
        lineHeight: 16,
    },


    /* BOTÃO INFERIOR */

    areaVoltar: {
        height: 75,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },

    botaoVoltarInferior: {
        width: 42,
        height: 42,
        borderWidth: 3,
        borderColor: '#000000',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
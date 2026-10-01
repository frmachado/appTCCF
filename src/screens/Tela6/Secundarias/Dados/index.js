import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import {
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import { StatusBar } from 'expo-status-bar';

export default function Dados() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <StatusBar
                style="light"
                backgroundColor="#242B67"
            />

            {/* CABEÇALHO */}
            <View style={styles.header}>

                <TouchableOpacity
                    style={styles.botaoVoltar}
                    onPress={() => navigation.navigate('Tela6')}
                >
                    <Ionicons
                        name="arrow-back"
                        size={26}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <Text style={styles.tituloHeader}>
                    Dados
                </Text>

                <MaterialCommunityIcons
                name="chart-bar"
                size={24}
                color="#FFFFFF"
              />
                

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteudo}
            >

                {/* TÍTULO */}
                <View style={styles.introducao}>

                    <View style={styles.iconeTitulo}>
                        <MaterialCommunityIcons
                            name="chart-bar"
                            size={32}
                            color="#242B67"
                        />
                    </View>

                    <Text style={styles.titulo}>
                        Dados sobre o trânsito
                    </Text>

                    <Text style={styles.subtitulo}>
                        Informações oficiais e pesquisas sobre segurança
                        de pedestres, idosos e acessibilidade nas travessias.
                    </Text>

                </View>

                {/* DESTAQUE 1 */}
                <View style={styles.destaque}>

                    <Text style={styles.numero}>
                        60+
                    </Text>

                    <Text style={styles.destaqueTitulo}>
                        anos
                    </Text>

                    <Text style={styles.destaqueTexto}>
                        Pessoas idosas apresentam maior vulnerabilidade
                        como pedestres em acidentes de trânsito.
                    </Text>

                </View>

                {/* CARD IDOSOS */}
                <View style={styles.card}>

                    <View style={styles.cardCabecalho}>

                        <View style={styles.iconeCard}>
                            <MaterialCommunityIcons
                                name="human-cane"
                                size={28}
                                color="#242B67"
                            />
                        </View>

                        <Text style={styles.cardTitulo}>
                            Idosos e atropelamentos
                        </Text>

                    </View>

                    <Text style={styles.texto}>
                        Estudos realizados no Brasil mostram que os
                        pedestres com 60 anos ou mais apresentam taxas
                        de mortalidade por atropelamentos superiores às
                        observadas em outras faixas etárias.
                    </Text>

                    <Text style={styles.fonte}>
                        Fonte: Ministério da Saúde / estudo publicado
                        na Epidemiologia e Serviços de Saúde.
                    </Text>

                </View>

                {/* CARD TEMPO */}
                <View style={styles.card}>

                    <View style={styles.cardCabecalho}>

                        <View style={styles.iconeCard}>
                            <Ionicons
                                name="time-outline"
                                size={28}
                                color="#242B67"
                            />
                        </View>

                        <Text style={styles.cardTitulo}>
                            Tempo para atravessar
                        </Text>

                    </View>

                    <Text style={styles.texto}>
                        A velocidade de deslocamento pode ser menor entre
                        pessoas idosas e pessoas com mobilidade reduzida.
                    </Text>

                    <View style={styles.numeroBox}>

                        <Text style={styles.numeroPequeno}>
                            0,4 m/s
                        </Text>

                        <Text style={styles.numeroDescricao}>
                            velocidade média de marcha de idosos observada
                            em estudo de acessibilidade
                        </Text>

                    </View>

                    <Text style={styles.texto}>
                        O estudo também apontou que parte dos idosos
                        entrevistados considerou insuficiente o tempo
                        disponível para realizar a travessia.
                    </Text>

                    <Text style={styles.fonte}>
                        Fonte: Revista Brasileira de Geriatria e Gerontologia
                        — estudo sobre acessibilidade de idosos.
                    </Text>

                </View>

                {/* CARD PEDESTRES */}
                <View style={styles.card}>

                    <View style={styles.cardCabecalho}>

                        <View style={styles.iconeCard}>
                            <Ionicons
                                name="walk-outline"
                                size={28}
                                color="#242B67"
                            />
                        </View>

                        <Text style={styles.cardTitulo}>
                            Pedestres são vulneráveis
                        </Text>

                    </View>

                    <Text style={styles.texto}>
                        O pedestre não possui a mesma proteção física que
                        os ocupantes de veículos. Por isso, velocidade dos
                        veículos, condições da via e tempo de travessia são
                        fatores importantes para a segurança.
                    </Text>

                </View>

                {/* CARD DADOS OFICIAIS */}
                <View style={styles.card}>

                    <View style={styles.cardCabecalho}>

                        <View style={styles.iconeCard}>
                            <Ionicons
                                name="analytics-outline"
                                size={28}
                                color="#242B67"
                            />
                        </View>

                        <Text style={styles.cardTitulo}>
                            Dados oficiais
                        </Text>

                    </View>

                    <Text style={styles.texto}>
                        A Secretaria Nacional de Trânsito disponibiliza
                        dados nacionais sobre sinistros de trânsito,
                        incluindo informações sobre vítimas, localidades
                        e tipos de veículos.
                    </Text>

                    <Text style={[styles.texto, { marginTop: 12 }]}>
                        O Ministério da Saúde também disponibiliza dados
                        de mortalidade por meio do Sistema de Informações
                        sobre Mortalidade (SIM) e do DATASUS.
                    </Text>

                </View>

                {/* CARD TECNOLOGIA */}
                <View style={styles.cardTecnologia}>

                    <View style={styles.iconeTecnologia}>
                        <MaterialCommunityIcons
                            name="traffic-light"
                            size={38}
                            color="#FFFFFF"
                        />
                    </View>

                    <Text style={styles.tituloTecnologia}>
                        Como a tecnologia pode ajudar?
                    </Text>

                    <Text style={styles.textoTecnologia}>
                        Semáforos inteligentes podem utilizar informações
                        sobre a presença de pedestres para melhorar o
                        controle da travessia.
                    </Text>

                    <Text style={styles.textoTecnologia}>
                        Em locais com grande circulação de idosos e pessoas
                        com mobilidade reduzida, uma solução adaptativa
                        pode contribuir para aumentar o tempo disponível
                        para atravessar com segurança.
                    </Text>

                </View>

                {/* CONCLUSÃO */}
                <View style={styles.conclusao}>

                    <Ionicons
                        name="shield-checkmark-outline"
                        size={35}
                        color="#242B67"
                    />

                    <Text style={styles.conclusaoTitulo}>
                        Segurança para todos
                    </Text>

                    <Text style={styles.conclusaoTexto}>
                        Tornar as travessias mais acessíveis não significa
                        apenas facilitar a circulação. Significa criar um
                        trânsito mais seguro, inclusivo e adequado às
                        necessidades diferentes de cada pessoa.
                    </Text>

                </View>

                {/* FONTES */}
                <View style={styles.fontes}>

                    <Text style={styles.fontesTitulo}>
                        Fontes utilizadas
                    </Text>

                    <Text style={styles.fonteLista}>
                        • Ministério dos Transportes / Senatran
                    </Text>

                    <Text style={styles.fonteLista}>
                        • Ministério da Saúde / DATASUS
                    </Text>

                    <Text style={styles.fonteLista}>
                        • Sistema de Informações sobre Mortalidade (SIM)
                    </Text>

                    <Text style={styles.fonteLista}>
                        • Epidemiologia e Serviços de Saúde
                    </Text>

                    <Text style={styles.fonteLista}>
                        • Revista Brasileira de Geriatria e Gerontologia
                    </Text>

                </View>

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F7F8FC',
    },

    /* CABEÇALHO */
    header: {
        height: 115,
        paddingTop: 34,
        backgroundColor: '#242B67',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },

    botaoVoltar: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tituloHeader: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: -160,
        textAlign: 'center',
    },

    espaco: {
        width: 45,
    },

    /* CONTEÚDO */
    conteudo: {
        padding: 20,
        paddingBottom: 40,
    },

    /* INTRODUÇÃO */
    introducao: {
        alignItems: 'center',
        marginBottom: 22,
    },

    iconeTitulo: {
        width: 65,
        height: 65,
        borderRadius: 33,
        backgroundColor: '#E9EAF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },

    titulo: {
        color: '#242B67',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    subtitulo: {
        color: '#666666',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 8,
    },

    /* DESTAQUE */
    destaque: {
        backgroundColor: '#242B67',
        borderRadius: 18,
        padding: 24,
        marginBottom: 18,
        alignItems: 'center',
    },

    numero: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: 'bold',
    },

    destaqueTitulo: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },

    destaqueTexto: {
        color: '#E4E6F4',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 12,
    },

    /* CARDS */
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 2,
    },

    cardCabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 13,
    },

    iconeCard: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#E9EAF5',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },

    cardTitulo: {
        flex: 1,
        color: '#242B67',
        fontSize: 18,
        fontWeight: 'bold',
    },

    texto: {
        color: '#555555',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'justify',
    },

    fonte: {
        color: '#777777',
        fontSize: 11,
        lineHeight: 16,
        marginTop: 14,
        fontStyle: 'italic',
    },

    /* NÚMERO */
    numeroBox: {
        backgroundColor: '#F1F2F8',
        borderRadius: 12,
        padding: 15,
        marginVertical: 15,
        alignItems: 'center',
    },

    numeroPequeno: {
        color: '#242B67',
        fontSize: 28,
        fontWeight: 'bold',
    },

    numeroDescricao: {
        color: '#666666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
    },

    /* TECNOLOGIA */
    cardTecnologia: {
        backgroundColor: '#242B67',
        borderRadius: 18,
        padding: 22,
        marginTop: 5,
        marginBottom: 18,
    },

    iconeTecnologia: {
        alignItems: 'center',
        marginBottom: 10,
    },

    tituloTecnologia: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },

    textoTecnologia: {
        color: '#E3E5F3',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'justify',
        marginBottom: 10,
    },

    /* CONCLUSÃO */
    conclusao: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 22,
        alignItems: 'center',
        marginBottom: 18,
    },

    conclusaoTitulo: {
        color: '#242B67',
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 8,
    },

    conclusaoTexto: {
        color: '#666666',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
        marginTop: 8,
    },

    /* FONTES */
    fontes: {
        padding: 10,
        marginTop: 5,
    },

    fontesTitulo: {
        color: '#242B67',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    fonteLista: {
        color: '#666666',
        fontSize: 12,
        lineHeight: 19,
    },

});
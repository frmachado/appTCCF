import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView, Linking,
} from 'react-native';

import {
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

function abrirContran() {
    Linking.openURL(
        'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-Senatran/resolucoes-contran'
    );
}

export default function Legislacao({ navigation }) {

    const leis = [
        {
            id: '1',
            icone: 'walk-outline',
            titulo: 'Pedestres',
            texto:
                'O pedestre deve realizar a travessia com atenção e, sempre que possível, utilizar a faixa destinada à travessia.',
        },
        {
            id: '2',
            icone: 'car-outline',
            titulo: 'Motoristas',
            texto:
                'Os condutores devem respeitar a sinalização e redobrar a atenção em locais com faixas de pedestres.',
        },
        {
            id: '3',
            icone: 'phone-portrait-outline',
            titulo: 'Uso do celular',
            texto:
                'A utilização do celular durante a condução pode causar distrações e aumentar os riscos no trânsito.',
        },
        {
            id: '4',
            icone: 'accessibility-outline',
            titulo: 'Acessibilidade',
            texto:
                'A mobilidade urbana deve considerar a segurança e a acessibilidade de pessoas com deficiência e mobilidade reduzida.',
        },
        {
            id: '5',
            icone: 'document-text-outline',
            titulo: 'Código de Trânsito Brasileiro',
            texto:
                'O Código de Trânsito Brasileiro reúne normas, direitos e deveres para condutores, pedestres e demais usuários das vias.',
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
                    Legislação
                </Text>

                <Ionicons
                    name="document-text-outline"
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

                        <Ionicons
                            name="scale-outline"
                            size={48}
                            color="#242B67"
                        />

                    </View>

                    <Text style={styles.introTitle}>
                        Legislação de Trânsito
                    </Text>

                    <Text style={styles.introText}>
                        Conheça alguns direitos, deveres e informações
                        importantes relacionados à segurança e à mobilidade
                        no trânsito.
                    </Text>

                </View>


                {/* TÍTULO */}

                <Text style={styles.sectionTitle}>
                    CONHEÇA AS PRINCIPAIS REGRAS
                </Text>


                {/* CARDS */}

                {leis.map((item) => (

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


                {/* NOVAS REGRAS */}

                <View style={styles.novasRegras}>

                    <View style={styles.novasHeader}>

                        <MaterialCommunityIcons
                            name="new-box"
                            size={30}
                            color="#242B67"
                        />

                        <Text style={styles.novasTitle}>
                            Novas Regras
                        </Text>

                    </View>

                    <Text style={styles.novasText}>
                        As leis e normas relacionadas ao trânsito podem
                        sofrer atualizações. Por isso, é importante sempre
                        acompanhar informações divulgadas pelos órgãos
                        oficiais de trânsito.
                    </Text>

                    <TouchableOpacity
                        style={styles.botao}
                        onPress={abrirContran}
                    >

                        <Text style={styles.botaoTexto}>
                            Saiba mais
                        </Text>

                        <Ionicons
                            name="arrow-forward"
                            size={20}
                            color="#FFF"
                        />

                    </TouchableOpacity>

                </View>


                {/* SPI */}

                <View style={styles.spiCard}>

                    <MaterialCommunityIcons
                        name="traffic-light-outline"
                        size={40}
                        color="#FFF"
                    />

                    <Text style={styles.spiTitle}>
                        Segurança no trânsito
                    </Text>

                    <Text style={styles.spiText}>
                        Conhecer e respeitar as regras é fundamental
                        para construir um trânsito mais seguro e
                        acessível para todos.
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

        fontSize: 21,
        fontWeight: 'bold',

        marginTop: 12,
    },

    introText: {
        color: '#666',

        textAlign: 'center',

        fontSize: 14,

        lineHeight: 21,

        marginTop: 8,
    },

    /* SECTION */

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

    /* NOVAS REGRAS */

    novasRegras: {
        backgroundColor: '#FFF',

        marginHorizontal: 18,
        marginTop: 10,

        padding: 20,

        borderRadius: 18,

        elevation: 3,
    },

    novasHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    novasTitle: {
        color: '#242B67',

        fontSize: 18,
        fontWeight: 'bold',

        marginLeft: 10,
    },

    novasText: {
        color: '#666',

        fontSize: 13,

        lineHeight: 20,

        marginTop: 12,
    },

    botao: {
        backgroundColor: '#242B67',

        marginTop: 18,

        paddingVertical: 13,

        borderRadius: 10,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    botaoTexto: {
        color: '#FFF',

        fontWeight: 'bold',

        marginRight: 8,
    },

    /* FINAL */

    spiCard: {
        backgroundColor: '#242B67',

        marginHorizontal: 18,
        marginTop: 25,

        padding: 25,

        borderRadius: 18,

        alignItems: 'center',
    },

    spiTitle: {
        color: '#FFF',

        fontSize: 19,
        fontWeight: 'bold',

        marginTop: 10,
    },

    spiText: {
        color: '#FFF',

        textAlign: 'center',

        fontSize: 13,

        lineHeight: 20,

        marginTop: 8,
    },

});
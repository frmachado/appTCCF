import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';

import {
    DrawerContentScrollView
} from '@react-navigation/drawer';

import {
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';

export default function CustomDrawer({
    usuario,
    onLogout,
    navigation
}) {

    function abrirTela(nome) {

        navigation.navigate(nome);

    }

    function sairDaConta() {

        onLogout();

    }

    return (

        <View style={styles.container}>

            <DrawerContentScrollView
                {...{
                    navigation
                }}
                contentContainerStyle={styles.scroll}
            >

                {/* USUÁRIO */}

                <View style={styles.usuarioContainer}>

                    <View style={styles.avatar}>

                        <Text style={styles.avatarTexto}>
                            {usuario?.nome
                                ? usuario.nome
                                    .charAt(0)
                                    .toUpperCase()
                                : 'U'}
                        </Text>

                    </View>

                    <Text
                        style={styles.nomeUsuario}
                        numberOfLines={1}
                    >
                        {usuario?.nome || 'Usuário'}
                    </Text>

                    <Text
                        style={styles.emailUsuario}
                        numberOfLines={1}
                    >
                        {usuario?.email || ''}
                    </Text>

                </View>


                {/* MENU */}

                <View style={styles.menu}>

                    {/* INÍCIO */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela1')}
                    >

                        <Ionicons
                            name="home-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Início
                        </Text>

                    </TouchableOpacity>


                    {/* MAPA */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela4')}
                    >

                        <Ionicons
                            name="map-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Mapa
                        </Text>

                    </TouchableOpacity>


                    {/* CAMPANHAS */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela5')}
                    >

                        <Ionicons
                            name="megaphone-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Campanhas
                        </Text>

                    </TouchableOpacity>


                    {/* DADOS */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Dados')}
                    >

                        <MaterialCommunityIcons
                            name="chart-bar"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            dados
                        </Text>

                    </TouchableOpacity>


                    {/* JOGO */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela3')}
                    >

                        <Ionicons
                            name="game-controller-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Jogo
                        </Text>

                    </TouchableOpacity>


                    {/* INFORMAÇÕES */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela6')}
                    >

                        <Ionicons
                            name="information-circle-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Informações
                        </Text>

                    </TouchableOpacity>


                    {/* COMUNIDADE */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Chat')}
                    >

                        <Ionicons
                            name="chatbubbles-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Comunidade
                        </Text>

                    </TouchableOpacity>


                    {/* SAC */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela7')}
                    >

                        <Ionicons
                            name="headset-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            SAC
                        </Text>

                    </TouchableOpacity>


                    {/* PARCERIAS */}

                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => abrirTela('Tela8')}
                    >

                        <MaterialCommunityIcons
                            name="handshake-outline"
                            size={22}
                            color="#FFFFFF"
                        />

                        <Text style={styles.itemTexto}>
                            Parcerias
                        </Text>

                    </TouchableOpacity>

                </View>

            </DrawerContentScrollView>


            {/* SAIR */}

            <View style={styles.areaSair}>

                <TouchableOpacity
                    style={styles.botaoSair}
                    onPress={sairDaConta}
                    activeOpacity={0.8}
                >

                    <Ionicons
                        name="log-out-outline"
                        size={23}
                        color="#FFFFFF"
                    />

                    <Text style={styles.textoSair}>
                        Sair da conta
                    </Text>

                </TouchableOpacity>

            </View>

        </View>

    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#242B67',
        marginTop: -35,
        paddingTop: 35
    },

    scroll: {
        paddingTop: 0
    },

    usuarioContainer: {
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 25,
        paddingHorizontal: 12
    },

    avatar: {
        width: 65,
        height: 65,
        borderRadius: 33,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },

    avatarTexto: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#242B67'
    },

    nomeUsuario: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    emailUsuario: {
        color: '#D5D8F0',
        fontSize: 11,
        marginTop: 4,
        textAlign: 'center'
    },

    menu: {
        paddingHorizontal: 8
    },

    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 3
    },

    itemTexto: {
        color: '#FFFFFF',
        fontSize: 14,
        marginLeft: 12,
        fontWeight: '500'
    },

    areaSair: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.2)',
        padding: 10
    },

    botaoSair: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 10
    },

    textoSair: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 12
    }

});
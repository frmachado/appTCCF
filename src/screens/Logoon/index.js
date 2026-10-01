import React, { useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

// TROQUE PELO IP DO SEU COMPUTADOR
const IP_DO_PC = '192.168.3.136';

export default function Login({ navigation, onLogin }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    async function fazerLogin() {

        if (!email.trim() || !senha) {

            Alert.alert(
                'Atenção',
                'Preencha o e-mail e a senha.'
            );

            return;
        }

        try {

            setCarregando(true);

            const resposta = await fetch(
                `http://${IP_DO_PC}/con_app/login.php`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        email: email.trim(),
                        senha: senha
                    })
                }
            );

            const dados = await resposta.json();

            if (dados.sucesso) {

                console.log(
                    'LOGIN OK:',
                    dados.usuario
                );

                await AsyncStorage.setItem(
                    'usuario',
                    JSON.stringify(dados.usuario)
                );

                if (onLogin) {

                    onLogin(dados.usuario);

                } else {

                    console.log(
                        'ERRO: onLogin não foi recebido!'
                    );

                }

            }

        } catch (erro) {

            console.log('Erro no login:', erro);

            Alert.alert(
                'Erro de conexão',
                'Não foi possível conectar ao servidor.\n\n' +
                'Verifique se o XAMPP está ligado e se o celular está na mesma rede Wi-Fi do computador.'
            );

        } finally {

            setCarregando(false);

        }
    }

    return (

        <KeyboardAvoidingView
            style={styles.keyboard}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >

            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >

                <View style={styles.container}>

                    <View style={styles.logoContainer}>

                        <View style={styles.logoCircle}>

                            <Text style={styles.logoText}>
                                SPI
                            </Text>

                        </View>

                    </View>

                    <Text style={styles.titulo}>
                        Bem-vindo!
                    </Text>

                    <Text style={styles.subtitulo}>
                        Entre na sua conta para acessar o aplicativo
                    </Text>

                    <View style={styles.form}>

                        <Text style={styles.label}>
                            E-mail
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu e-mail"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <Text style={styles.label}>
                            Senha
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor="#999"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                            autoCapitalize="none"
                        />

                        <TouchableOpacity
                            style={[
                                styles.botao,
                                carregando && styles.botaoDesativado
                            ]}
                            onPress={fazerLogin}
                            disabled={carregando}
                            activeOpacity={0.8}
                        >

                            {carregando ? (

                                <ActivityIndicator
                                    color="#FFFFFF"
                                    size="small"
                                />

                            ) : (

                                <Text style={styles.textoBotao}>
                                    ENTRAR
                                </Text>

                            )}

                        </TouchableOpacity>

                        <View style={styles.divisorContainer}>

                            <View style={styles.linha} />

                            <Text style={styles.ou}>
                                OU
                            </Text>

                            <View style={styles.linha} />

                        </View>

                        <TouchableOpacity
                            style={styles.botaoCadastro}
                            onPress={() =>
                                navigation.navigate(
                                    'CadastroUsuario'
                                )
                            }
                            activeOpacity={0.8}
                        >

                            <Text style={styles.textoCadastro}>
                                CRIAR UMA CONTA
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({

    keyboard: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },

    scroll: {
        flexGrow: 1
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 28,
        paddingVertical: 40,
        backgroundColor: '#FFFFFF'
    },

    logoContainer: {
        alignItems: 'center',
        marginBottom: 20
    },

    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#242B67',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 'bold'
    },

    titulo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#242B67',
        textAlign: 'center'
    },

    subtitulo: {
        fontSize: 15,
        color: '#666666',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 32,
        lineHeight: 22
    },

    form: {
        width: '100%'
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 7
    },

    input: {
        height: 52,
        borderWidth: 1,
        borderColor: '#D5D5D5',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#222222',
        backgroundColor: '#FAFAFA',
        marginBottom: 18
    },

    botao: {
        height: 52,
        backgroundColor: '#242B67',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },

    botaoDesativado: {
        opacity: 0.7
    },

    textoBotao: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    divisorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24
    },

    linha: {
        flex: 1,
        height: 1,
        backgroundColor: '#DDDDDD'
    },

    ou: {
        marginHorizontal: 12,
        color: '#888888',
        fontSize: 12,
        fontWeight: '600'
    },

    botaoCadastro: {
        height: 52,
        borderWidth: 2,
        borderColor: '#242B67',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoCadastro: {
        color: '#242B67',
        fontSize: 15,
        fontWeight: 'bold'
    }

});
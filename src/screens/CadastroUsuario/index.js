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

// TROQUE PELO IP DO SEU COMPUTADOR
const IP_DO_PC = '192.168.3.136';

export default function CadastroUsuario({ navigation }) {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const [carregando, setCarregando] = useState(false);

    async function cadastrarUsuario() {

        if (
            !nome.trim() ||
            !email.trim() ||
            !senha ||
            !confirmarSenha
        ) {

            Alert.alert(
                'Atenção',
                'Preencha todos os campos.'
            );

            return;
        }

        if (nome.trim().length < 3) {

            Alert.alert(
                'Atenção',
                'Digite seu nome completo.'
            );

            return;
        }

        const emailValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValido.test(email.trim())) {

            Alert.alert(
                'Atenção',
                'Digite um e-mail válido.'
            );

            return;
        }

        if (senha.length < 6) {

            Alert.alert(
                'Atenção',
                'A senha deve possuir pelo menos 6 caracteres.'
            );

            return;
        }

        if (senha !== confirmarSenha) {

            Alert.alert(
                'Atenção',
                'As senhas não são iguais.'
            );

            return;
        }

        try {

            setCarregando(true);

            const resposta = await fetch(
                `http://${IP_DO_PC}/con_app/cadastrarUsuario.php`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        nome: nome.trim(),
                        email: email.trim().toLowerCase(),
                        senha: senha
                    })
                }
            );

            const dados = await resposta.json();

            if (dados.sucesso) {

                Alert.alert(
                    'Cadastro realizado!',
                    'Sua conta foi criada com sucesso.',
                    [
                        {
                            text: 'Ir para o login',
                            onPress: () =>
                                navigation.replace('Login')
                        }
                    ]
                );

                setNome('');
                setEmail('');
                setSenha('');
                setConfirmarSenha('');

            } else {

                Alert.alert(
                    'Não foi possível cadastrar',
                    dados.mensagem
                );

            }

        } catch (erro) {

            console.log(
                'Erro no cadastro:',
                erro
            );

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

                    <TouchableOpacity
                        style={styles.voltar}
                        onPress={() =>
                            navigation.goBack()
                        }
                    >

                        <Text style={styles.voltarTexto}>
                            ‹ Voltar
                        </Text>

                    </TouchableOpacity>

                    <View style={styles.logoContainer}>

                        <View style={styles.logoCircle}>

                            <Text style={styles.logoText}>
                                SPI
                            </Text>

                        </View>

                    </View>

                    <Text style={styles.titulo}>
                        Criar conta
                    </Text>

                    <Text style={styles.subtitulo}>
                        Preencha os dados para criar sua conta
                    </Text>

                    <View style={styles.form}>

                        <Text style={styles.label}>
                            Nome
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome"
                            placeholderTextColor="#999"
                            value={nome}
                            onChangeText={setNome}
                            autoCapitalize="words"
                        />

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
                            placeholder="Mínimo de 6 caracteres"
                            placeholderTextColor="#999"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry
                        />

                        <Text style={styles.label}>
                            Confirmar senha
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite a senha novamente"
                            placeholderTextColor="#999"
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            secureTextEntry
                        />

                        <TouchableOpacity
                            style={[
                                styles.botao,
                                carregando &&
                                styles.botaoDesativado
                            ]}
                            onPress={cadastrarUsuario}
                            disabled={carregando}
                            activeOpacity={0.8}
                        >

                            {carregando ? (

                                <ActivityIndicator
                                    color="#FFFFFF"
                                />

                            ) : (

                                <Text style={styles.textoBotao}>
                                    CADASTRAR
                                </Text>

                            )}

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.login}
                            onPress={() =>
                                navigation.navigate('Login')
                            }
                        >

                            <Text style={styles.loginTexto}>
                                Já possui uma conta?{' '}
                                <Text style={styles.loginDestaque}>
                                    Entrar
                                </Text>
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
        paddingHorizontal: 28,
        paddingVertical: 30,
        backgroundColor: '#FFFFFF'
    },

    voltar: {
        marginBottom: 15
    },

    voltarTexto: {
        color: '#242B67',
        fontSize: 17,
        fontWeight: '600'
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 18
    },

    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#242B67',
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold'
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#242B67',
        textAlign: 'center'
    },

    subtitulo: {
        fontSize: 15,
        color: '#666666',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
        lineHeight: 21
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
        marginBottom: 17
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

    login: {
        marginTop: 24,
        alignItems: 'center'
    },

    loginTexto: {
        color: '#666666',
        fontSize: 15
    },

    loginDestaque: {
        color: '#242B67',
        fontWeight: 'bold'
    }

});
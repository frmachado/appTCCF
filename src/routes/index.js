import React, { useEffect, useState } from 'react';

import {
    View,
    ActivityIndicator
} from 'react-native';

import {
    NavigationContainer
} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthRoutes from './AuthRoutes';
import DrawerRoutes from './DrawerRoutes';

export default function Routes() {

    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        verificarLogin();
    }, []);

    async function verificarLogin() {

        try {

            const usuarioSalvo =
                await AsyncStorage.getItem('usuario');

            if (usuarioSalvo) {

                setUsuario(
                    JSON.parse(usuarioSalvo)
                );

            }

        } catch (erro) {

            console.log(
                'Erro ao verificar login:',
                erro
            );

        } finally {

            setCarregando(false);

        }
    }

    function entrar(usuarioLogado) {

        console.log(
            'USUÁRIO LOGADO:',
            usuarioLogado
        );

        setUsuario(usuarioLogado);
    }

    async function sair() {

        try {

            await AsyncStorage.removeItem('usuario');

            setUsuario(null);

        } catch (erro) {

            console.log(
                'Erro ao sair da conta:',
                erro
            );

        }
    }

    if (carregando) {

        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#242B67"
                />
            </View>
        );
    }

    return (

        <NavigationContainer>

            {usuario ? (

                <DrawerRoutes
                    usuario={usuario}
                    onLogout={sair}
                />

            ) : (

                <AuthRoutes
                    setUsuario={entrar}
                />

            )}

        </NavigationContainer>

    );
}
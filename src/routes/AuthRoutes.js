import React from 'react';

import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';

import CadastroUsuario from '../screens/CadastroUsuario';
import Login from '../screens/Logoon';

const Stack = createNativeStackNavigator();

export default function AuthRoutes({ setUsuario }) {

    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <Stack.Screen name="Login">

                {(props) => (

                    <Login
                        {...props}
                        onLogin={setUsuario}
                    />

                )}

            </Stack.Screen>

            <Stack.Screen
                name="CadastroUsuario"
                component={CadastroUsuario}
            />

        </Stack.Navigator>

    );
}
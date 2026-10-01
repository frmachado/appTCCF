import React from 'react';

import {
    createDrawerNavigator,
} from '@react-navigation/drawer';

import Home from '../screens/Home';
import Tela1 from '../screens/Tela1';
import Tela2 from '../screens/Tela2';
import Tela3 from '../screens/Tela3';
import Tela4 from '../screens/Tela4';
import Tela5 from '../screens/Tela5';
import Tela6 from '../screens/Tela6/Principal';
import Tela7 from '../screens/Tela7';
import Tela8 from '../screens/Tela8';

import Chat from '../screens/Tela6/Secundarias/Chat';
import Pauta from '../screens/Tela6/Secundarias/Pauta';
import Dicas from '../screens/Tela6/Secundarias/Dicas';
import Tecnologia from '../screens/Tela6/Secundarias/Tecnologia';
import Legislacao from '../screens/Tela6/Secundarias/Legislacao';
import Dados from '../screens/Tela6/Secundarias/Dados';

import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes({
    usuario,
    onLogout,
}) {
    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <CustomDrawer
                    {...props}
                    usuario={usuario}
                    onLogout={onLogout}
                />
            )}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    marginTop: 30,
                    width: 180,
                    backgroundColor: '#242B67',
                },
            }}
        >

            {/* HOME */}
            <Drawer.Screen name="Home">
                {(props) => (
                    <Home
                        {...props}
                        usuario={usuario}
                    />
                )}
            </Drawer.Screen>

            <Drawer.Screen
                name="Tela1"
                component={Tela1}
            />

            <Drawer.Screen
                name="Tela2"
                component={Tela2}
            />

            <Drawer.Screen
                name="Tela3"
                component={Tela3}
            />

            <Drawer.Screen
                name="Tela4"
                component={Tela4}
            />

            <Drawer.Screen
                name="Tela5"
                component={Tela5}
            />

            <Drawer.Screen
                name="Tela6"
                component={Tela6}
            />

            <Drawer.Screen
                name="Chat"
                component={Chat}
            />

            <Drawer.Screen
                name="Pauta"
                component={Pauta}
            />

            <Drawer.Screen
                name="Dicas"
                component={Dicas}
            />

            <Drawer.Screen
                name="Tecnologia"
                component={Tecnologia}
            />

            <Drawer.Screen
                name="Legislacao"
                component={Legislacao}
            />

            <Drawer.Screen
                name="Dados"
                component={Dados}
            />

            <Drawer.Screen
                name="Tela7"
                component={Tela7}
            />

            <Drawer.Screen
                name="Tela8"
                component={Tela8}
            />

        </Drawer.Navigator>
    );
}
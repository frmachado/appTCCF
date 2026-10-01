import React from 'react';
import { View, Image, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#242B67" barStyle="light-content" />

      {/* MENU DRAWER */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={35} color="white" />
      </TouchableOpacity>

      {/* LOGO */}
      <Image
        source={require('../../../assets/logos/LogoSPI.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* BOTÃO IR PARA TELA1 */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Tela1")}
      >
        <Text style={styles.textoBotao}>
          Semáforo Inteligente
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242B67',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },

  logo: {
    width: 300,
    height: 180,
    marginBottom: 3,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: '#374494',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },

});
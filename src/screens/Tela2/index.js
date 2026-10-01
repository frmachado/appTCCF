import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Tela2({ navigation }) {

  // =====================================================
  // CAMPOS
  // =====================================================

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [categoria, setCategoria] = useState("");

  // =====================================================
  // CONTROLE
  // =====================================================

  const [idUsuario, setIdUsuario] = useState(null);

  const [carregando, setCarregando] = useState(false);

  const [carregandoCadastro, setCarregandoCadastro] =
    useState(true);

  const [jaCadastrado, setJaCadastrado] =
    useState(false);


  // =====================================================
  // URL DO PHP
  // =====================================================

  const API_URL =
    "http://192.168.3.136/con_app";


  // =====================================================
  // AO ABRIR A TELA
  // =====================================================

  useEffect(() => {
    inicializarTela();
  }, []);


  // =====================================================
  // CARREGAR USUÁRIO LOGADO
  // =====================================================

  async function inicializarTela() {

    try {

      const usuarioSalvo =
        await AsyncStorage.getItem("usuario");


      if (!usuarioSalvo) {

        setCarregandoCadastro(false);

        Alert.alert(
          "Sessão expirada",
          "Faça login novamente para continuar.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Tela1");
              },
            },
          ]
        );

        return;
      }


      const usuario =
        JSON.parse(usuarioSalvo);


      console.log(
        "Usuário logado:",
        usuario
      );


      if (!usuario.idUsuario) {

        setCarregandoCadastro(false);

        Alert.alert(
          "Erro",
          "Não foi possível identificar o usuário.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("Tela1");
              },
            },
          ]
        );

        return;
      }


      setIdUsuario(
        usuario.idUsuario
      );


      // Preenche os dados básicos do login

      if (usuario.nome) {
        setNome(usuario.nome);
      }

      if (usuario.email) {
        setEmail(usuario.email);
      }


      // Procura cadastro existente

      await buscarCadastro(
        usuario.idUsuario
      );


    } catch (error) {

      console.log(
        "Erro ao inicializar tela:",
        error
      );

      setCarregandoCadastro(false);

      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados do usuário."
      );
    }
  }


  // =====================================================
  // BUSCAR CADASTRO
  // =====================================================

  async function buscarCadastro(id) {

    try {

      setCarregandoCadastro(true);


      const resposta = await fetch(
        `${API_URL}/buscarCadastro.php?idUsuario=${id}`
      );


      const texto =
        await resposta.text();


      console.log(
        "Resposta buscarCadastro.php:",
        texto
      );


      let dados;


      try {

        dados = JSON.parse(texto);

      } catch (error) {

        console.log(
          "Resposta não é JSON:",
          texto
        );

        Alert.alert(
          "Erro",
          "O servidor retornou uma resposta inválida."
        );

        return;
      }


      // =================================================
      // CADASTRO ENCONTRADO
      // =================================================

      if (
        dados.sucesso === true &&
        dados.cadastrado === true &&
        dados.cadastro
      ) {

        const cadastro =
          dados.cadastro;


        setJaCadastrado(true);


        // Nome

        setNome(
          cadastro.nome || ""
        );


        // Email

        setEmail(
          cadastro.email || ""
        );


        // CPF

        if (cadastro.cpf) {

          setCpf(
            formatarCPF(
              cadastro.cpf
            )
          );

        } else {

          setCpf("");

        }


        // Telefone

        if (cadastro.telefone) {

          setTelefone(
            formatarTelefone(
              cadastro.telefone
            )
          );

        } else {

          setTelefone("");

        }


        // Data de nascimento

        if (cadastro.dataNascimento) {

          const partes =
            cadastro.dataNascimento.split("-");


          if (partes.length === 3) {

            setDataNascimento(
              `${partes[2]}/${partes[1]}/${partes[0]}`
            );

          } else {

            setDataNascimento(
              cadastro.dataNascimento
            );

          }

        } else {

          setDataNascimento("");

        }


        // Endereço

        setEndereco(
          cadastro.endereco || ""
        );


        // Categoria

        setCategoria(
          cadastro.categoriaCarta || ""
        );


        console.log(
          "Cadastro encontrado:",
          cadastro
        );


      } else {

        // =============================================
        // NÃO POSSUI CADASTRO
        // =============================================

        setJaCadastrado(false);

        console.log(
          "Usuário ainda não possui cadastro."
        );
      }


    } catch (error) {

      console.log(
        "Erro ao buscar cadastro:",
        error
      );

      Alert.alert(
        "Erro de conexão",
        "Não foi possível consultar o cadastro. Verifique o servidor."
      );

    } finally {

      setCarregandoCadastro(false);

    }
  }


  // =====================================================
  // FORMATAR CPF
  // =====================================================

  function formatarCPF(valor) {

    valor =
      valor.replace(
        /\D/g,
        ""
      );


    if (valor.length > 11) {

      valor =
        valor.substring(0, 11);

    }


    if (valor.length > 9) {

      return valor.replace(
        /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
        "$1.$2.$3-$4"
      );

    }


    if (valor.length > 6) {

      return valor.replace(
        /(\d{3})(\d{3})(\d{0,3})/,
        "$1.$2.$3"
      );

    }


    if (valor.length > 3) {

      return valor.replace(
        /(\d{3})(\d{0,3})/,
        "$1.$2"
      );

    }


    return valor;
  }


  // =====================================================
  // FORMATAR TELEFONE
  // =====================================================

  function formatarTelefone(valor) {

    valor =
      valor.replace(
        /\D/g,
        ""
      );


    if (valor.length > 11) {

      valor =
        valor.substring(0, 11);

    }


    // Celular

    if (valor.length > 10) {

      return valor.replace(
        /(\d{2})(\d{5})(\d{0,4})/,
        "($1) $2-$3"
      );

    }


    // Telefone fixo

    if (valor.length > 6) {

      return valor.replace(
        /(\d{2})(\d{4})(\d{0,4})/,
        "($1) $2-$3"
      );

    }


    if (valor.length > 2) {

      return valor.replace(
        /(\d{2})(\d{0,5})/,
        "($1) $2"
      );

    }


    return valor;
  }


  // =====================================================
  // FORMATAR DATA
  // =====================================================

  function formatarData(valor) {

    valor =
      valor.replace(
        /\D/g,
        ""
      );


    if (valor.length > 8) {

      valor =
        valor.substring(0, 8);

    }


    if (valor.length > 4) {

      return valor.replace(
        /(\d{2})(\d{2})(\d{0,4})/,
        "$1/$2/$3"
      );

    }


    if (valor.length > 2) {

      return valor.replace(
        /(\d{2})(\d{0,2})/,
        "$1/$2"
      );

    }


    return valor;
  }


  // =====================================================
  // VALIDAR CAMPOS
  // =====================================================

  function validarCampos() {

    if (!nome.trim()) {

      Alert.alert(
        "Atenção",
        "Digite seu nome."
      );

      return false;
    }


    if (!email.trim()) {

      Alert.alert(
        "Atenção",
        "Digite seu e-mail."
      );

      return false;
    }


    const cpfNumeros =
      cpf.replace(
        /\D/g,
        ""
      );


    if (cpfNumeros.length !== 11) {

      Alert.alert(
        "Atenção",
        "Digite um CPF válido com 11 números."
      );

      return false;
    }


    const telefoneNumeros =
      telefone.replace(
        /\D/g,
        ""
      );


    if (
      telefoneNumeros.length !== 10 &&
      telefoneNumeros.length !== 11
    ) {

      Alert.alert(
        "Atenção",
        "Digite um telefone válido."
      );

      return false;
    }


    if (
      dataNascimento.length !== 10
    ) {

      Alert.alert(
        "Atenção",
        "Digite a data de nascimento completa."
      );

      return false;
    }


    if (!endereco.trim()) {

      Alert.alert(
        "Atenção",
        "Digite seu endereço."
      );

      return false;
    }


    if (!categoria) {

      Alert.alert(
        "Atenção",
        "Selecione a categoria do cartão."
      );

      return false;
    }


    if (!idUsuario) {

      Alert.alert(
        "Erro",
        "Usuário não identificado. Faça login novamente."
      );

      return false;
    }


    return true;
  }


  // =====================================================
  // CADASTRAR / ATUALIZAR
  // =====================================================

  async function cadastrar() {

    // Validação

    if (!validarCampos()) {
      return;
    }


    setCarregando(true);


    try {

      // Remove máscara do CPF

      const cpfLimpo =
        cpf.replace(
          /\D/g,
          ""
        );


      // Remove máscara do telefone

      const telefoneLimpo =
        telefone.replace(
          /\D/g,
          ""
        );


      console.log(
        "Enviando cadastro:",
        {
          idUsuario,
          nome,
          email,
          cpf: cpfLimpo,
          telefone: telefoneLimpo,
          dataNascimento,
          endereco,
          categoriaCarta: categoria,
        }
      );


      const resposta =
        await fetch(
          `${API_URL}/cadastrar.php`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              idUsuario:
                idUsuario,

              nome:
                nome.trim(),

              email:
                email.trim(),

              cpf:
                cpfLimpo,

              telefone:
                telefoneLimpo,

              dataNascimento:
                dataNascimento.trim(),

              endereco:
                endereco.trim(),

              categoriaCarta:
                categoria,

            }),
          }
        );


      const texto =
        await resposta.text();


      console.log(
        "Resposta cadastrar.php:",
        texto
      );


      let dados;


      try {

        dados =
          JSON.parse(texto);

      } catch (error) {

        console.log(
          "Erro JSON:",
          error
        );

        Alert.alert(
          "Erro",
          "O servidor retornou uma resposta inválida."
        );

        return;
      }


      // =================================================
      // SUCESSO
      // =================================================

      if (dados.sucesso === true) {

        // ===============================================
        // ATUALIZADO
        // ===============================================

        if (
          dados.tipo === "atualizado"
        ) {

          setJaCadastrado(true);


          Alert.alert(
            "Cadastro atualizado!",
            "O cadastro do usuário foi atualizado com sucesso.",
            [
              {
                text: "OK",

                onPress: () => {

                  navigation.navigate(
                    "Tela1"
                  );

                },
              },
            ]
          );


        }

        // ===============================================
        // NOVO CADASTRO
        // ===============================================

        else {

          setJaCadastrado(true);


          Alert.alert(
            "Usuário cadastrado!",
            "O usuário foi cadastrado com sucesso.",
            [
              {
                text: "OK",

                onPress: () => {

                  navigation.navigate(
                    "Tela1"
                  );

                },
              },
            ]
          );

        }


      }

      // =================================================
      // ERRO
      // =================================================

      else {

        Alert.alert(
          "Cadastro não realizado",
          dados.mensagem ||
            "Não foi possível realizar o cadastro."
        );

      }


    } catch (error) {

      console.log(
        "Erro ao cadastrar:",
        error
      );


      Alert.alert(
        "Erro de conexão",
        "Não foi possível conectar ao servidor. Verifique se o Apache está ligado e se o celular está conectado à mesma rede do computador."
      );


    } finally {

      setCarregando(false);

    }
  }


  // =====================================================
  // INTERFACE
  // =====================================================

  return (

    <ScrollView
      style={styles.container}

      contentContainerStyle={{
        paddingBottom: 30,
      }}

      showsVerticalScrollIndicator={false}
    >

      {/* ================================================
          CABEÇALHO
      ================================================= */}

      <View style={styles.header}>

        <Text style={styles.titulo}>
          Cadastro Cartão SPI / Login
        </Text>


        <TouchableOpacity
          onPress={() =>
            navigation.navigate(
              "Tela1"
            )
          }
        >

          <MaterialIcons
            name="arrow-forward-ios"
            size={28}
            color="#D62828"
          />

        </TouchableOpacity>

      </View>


      {/* ================================================
          STATUS
      ================================================= */}

      {!carregandoCadastro && (

        <View
          style={
            jaCadastrado
              ? styles.statusCadastrado
              : styles.statusNaoCadastrado
          }
        >

          <MaterialIcons
            name={
              jaCadastrado
                ? "check-circle"
                : "info"
            }

            size={22}

            color={
              jaCadastrado
                ? "#2E7D32"
                : "#D62828"
            }
          />


          <Text
            style={
              jaCadastrado
                ? styles.statusTextoCadastrado
                : styles.statusTextoNaoCadastrado
            }
          >

            {jaCadastrado

              ? "Cadastro encontrado. Você pode alterar seus dados."

              : "Este usuário ainda não possui cadastro."}

          </Text>

        </View>

      )}


      {/* ================================================
          CARREGANDO
      ================================================= */}

      {carregandoCadastro && (

        <View style={styles.carregando}>

          <ActivityIndicator
            size="small"
            color="#1D255A"
          />


          <Text style={styles.textoCarregando}>
            Verificando cadastro...
          </Text>

        </View>

      )}


      {/* ================================================
          NOME
      ================================================= */}

      <Text style={styles.label}>
        Nome:
      </Text>


      <TextInput
        style={styles.input}

        value={nome}

        onChangeText={setNome}

        placeholder="Digite seu nome"
      />


      {/* ================================================
          EMAIL
      ================================================= */}

      <Text style={styles.label}>
        E-mail:
      </Text>


      <TextInput
        style={styles.input}

        keyboardType="email-address"

        autoCapitalize="none"

        value={email}

        onChangeText={setEmail}

        placeholder="Digite seu e-mail"
      />


      {/* ================================================
          CPF
      ================================================= */}

      <Text style={styles.label}>
        CPF:
      </Text>


      <TextInput
        style={styles.input}

        keyboardType="numeric"

        value={cpf}

        onChangeText={(texto) =>
          setCpf(
            formatarCPF(texto)
          )
        }

        placeholder="000.000.000-00"

        maxLength={14}
      />


      {/* ================================================
          TELEFONE
      ================================================= */}

      <Text style={styles.label}>
        Telefone:
      </Text>


      <TextInput
        style={styles.input}

        keyboardType="phone-pad"

        value={telefone}

        onChangeText={(texto) =>
          setTelefone(
            formatarTelefone(texto)
          )
        }

        placeholder="(00) 00000-0000"

        maxLength={15}
      />


      {/* ================================================
          DATA
      ================================================= */}

      <Text style={styles.label}>
        Data de nascimento:
      </Text>


      <TextInput
        style={styles.input}

        placeholder="__/__/____"

        keyboardType="numeric"

        value={dataNascimento}

        onChangeText={(texto) =>
          setDataNascimento(
            formatarData(texto)
          )
        }

        maxLength={10}
      />


      {/* ================================================
          ENDEREÇO
      ================================================= */}

      <Text style={styles.label}>
        Endereço:
      </Text>


      <TextInput
        style={styles.input}

        value={endereco}

        onChangeText={setEndereco}

        placeholder="Digite seu endereço"
      />


      {/* ================================================
          CATEGORIA
      ================================================= */}

      <Text style={styles.label}>
        Categoria cartão:
      </Text>


      <View style={styles.pickerContainer}>

        <Picker
          selectedValue={categoria}

          onValueChange={(itemValue) =>
            setCategoria(itemValue)
          }
        >

          <Picker.Item
            label="Selecione..."
            value=""
          />

          <Picker.Item
            label="Cartão Idoso"
            value="idoso"
          />

          <Picker.Item
            label="Deficiente Visual"
            value="visual"
          />

          <Picker.Item
            label="Deficiente Auditivo"
            value="auditivo"
          />

          <Picker.Item
            label="Deficiente Físico / Outros"
            value="fisico"
          />

        </Picker>

      </View>


      {/* ================================================
          BOTÃO
      ================================================= */}

      <TouchableOpacity
        style={[
          styles.botao,

          carregando &&
            styles.botaoDesabilitado,
        ]}

        onPress={cadastrar}

        disabled={carregando}
      >

        {carregando ? (

          <ActivityIndicator
            size="small"
            color="#FFF"
          />

        ) : (

          <Text style={styles.botaoTexto}>

            {jaCadastrado
              ? "Atualizar cadastro"
              : "Cadastrar"}

          </Text>

        )}

      </TouchableOpacity>

    </ScrollView>
  );
}


// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 18,
    paddingTop: 34,
  },


  header: {
    height: 110,

    backgroundColor: "#1D255A",

    borderRadius: 8,

    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    paddingHorizontal: 15,

    paddingVertical: 15,

    marginBottom: 20,
  },


  titulo: {
    color: "#FFF",

    fontSize: 23,

    fontWeight: "bold",

    flex: 1,
  },


  statusCadastrado: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#E8F5E9",

    borderRadius: 12,

    paddingHorizontal: 12,

    paddingVertical: 10,

    marginBottom: 10,
  },


  statusNaoCadastrado: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFF1F1",

    borderRadius: 12,

    paddingHorizontal: 12,

    paddingVertical: 10,

    marginBottom: 10,
  },


  statusTextoCadastrado: {
    color: "#2E7D32",

    fontSize: 14,

    fontWeight: "600",

    marginLeft: 8,

    flex: 1,
  },


  statusTextoNaoCadastrado: {
    color: "#D62828",

    fontSize: 14,

    fontWeight: "600",

    marginLeft: 8,

    flex: 1,
  },


  carregando: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 10,

    marginBottom: 5,
  },


  textoCarregando: {
    color: "#1D255A",

    marginLeft: 8,

    fontSize: 14,
  },


  label: {
    fontSize: 18,

    fontWeight: "bold",

    color: "#1D255A",

    marginBottom: 8,

    marginTop: 10,
  },


  input: {
    backgroundColor: "#D9D9D9",

    borderRadius: 18,

    height: 55,

    paddingHorizontal: 15,

    fontSize: 16,

    marginBottom: 15,
  },


  pickerContainer: {
    backgroundColor: "#D9D9D9",

    borderRadius: 18,

    marginBottom: 25,

    overflow: "hidden",
  },


  botao: {
    backgroundColor: "#1D255A",

    height: 58,

    borderRadius: 30,

    justifyContent: "center",

    alignItems: "center",

    marginTop: 15,
  },


  botaoDesabilitado: {
    opacity: 0.7,
  },


  botaoTexto: {
    color: "#FFF",

    fontSize: 22,

    fontWeight: "bold",
  },

});
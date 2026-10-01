import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

/* =========================================================
   SPRITES
   ========================================================= */

const SPRITES = require("../../../assets/imagens/sprites.png");

/*
  A imagem sprites.png é um SPRITE SHEET.

  Cada Sprite abaixo recorta uma região da imagem.
  Os valores são baseados no sprites.png que criamos.

  Se posteriormente você quiser separar os sprites em
  arquivos individuais, também podemos fazer.
*/

const Sprite = ({
  x,
  y,
  width,
  height,
  displayWidth,
  displayHeight,
}) => {
  const scaleX = displayWidth / width;
  const scaleY = displayHeight / height;

  return (
    <View
      style={{
        width: displayWidth,
        height: displayHeight,
        overflow: "hidden",
      }}
    >
      <Image
        source={SPRITES}
        resizeMode="stretch"
        style={{
          position: "absolute",
          width: 1536 * scaleX,
          height: 1024 * scaleY,
          left: -x * scaleX,
          top: -y * scaleY,
        }}
      />
    </View>
  );
};

/* =========================================================
   SPRITES DOS CARROS
   ========================================================= */

const CarroVermelho = ({ style }) => (
  <View style={style}>
    <Sprite
      x={20}
      y={75}
      width={305}
      height={125}
      displayWidth={105}
      displayHeight={72}
    />
  </View>
);

const CarroAzul = ({ style }) => (
  <View style={style}>
    <Sprite
      x={355}
      y={75}
      width={310}
      height={125}
      displayWidth={105}
      displayHeight={72}
    />
  </View>
);

const CarroBranco = ({ style }) => (
  <View style={style}>
    <Sprite
      x={670}
      y={75}
      width={235}
      height={125}
      displayWidth={105}
      displayHeight={72}
    />
  </View>
);

const CarroAmarelo = ({ style }) => (
  <View style={style}>
    <Sprite
      x={925}
      y={75}
      width={250}
      height={125}
      displayWidth={105}
      displayHeight={72}
    />
  </View>
);

const CarroPreto = ({ style }) => (
  <View style={style}>
    <Sprite
      x={1210}
      y={75}
      width={310}
      height={125}
      displayWidth={105}
      displayHeight={72}
    />
  </View>
);

/* =========================================================
   SPRITE DO PEDESTRE
   ========================================================= */

const Pedestre = ({ style }) => (
  <View style={style}>
    <Sprite
      x={30}
      y={310}
      width={95}
      height={125}
      displayWidth={48}
      displayHeight={62}
    />
  </View>
);

/* =========================================================
   PERGUNTAS
   ========================================================= */

const perguntas = [
  {
    pergunta:
      "Onde o pedestre deve atravessar a rua quando houver uma faixa de pedestres?",
    alternativas: [
      "Em qualquer lugar",
      "Entre os carros",
      "Na faixa de pedestres",
      "No meio da rua",
    ],
    correta: 2,
  },

  {
    pergunta: "O que significa o sinal vermelho do semáforo?",
    alternativas: [
      "Acelerar",
      "Parar",
      "Virar à direita",
      "Seguir normalmente",
    ],
    correta: 1,
  },

  {
    pergunta: "O que o motorista deve fazer antes de atravessar uma faixa?",
    alternativas: [
      "Acelerar",
      "Buzinar continuamente",
      "Reduzir a velocidade e observar",
      "Ignorar a faixa",
    ],
    correta: 2,
  },

  {
    pergunta: "O cinto de segurança deve ser utilizado por quem?",
    alternativas: [
      "Somente pelo motorista",
      "Somente pelos passageiros da frente",
      "Por todos os ocupantes do veículo",
      "Somente em rodovias",
    ],
    correta: 2,
  },

  {
    pergunta: "Qual é uma atitude segura ao dirigir em uma área escolar?",
    alternativas: [
      "Aumentar a velocidade",
      "Reduzir a velocidade e prestar atenção",
      "Usar o celular",
      "Ultrapassar pela calçada",
    ],
    correta: 1,
  },

  {
    pergunta: "O uso do celular enquanto dirige pode:",
    alternativas: [
      "Aumentar a atenção",
      "Melhorar a visão",
      "Distrair o motorista",
      "Diminuir o trânsito",
    ],
    correta: 2,
  },

  {
    pergunta: "Quando estiver dirigindo sob chuva, o motorista deve:",
    alternativas: [
      "Aumentar a velocidade",
      "Reduzir a velocidade",
      "Desligar os faróis",
      "Dirigir pelo acostamento",
    ],
    correta: 1,
  },

  {
    pergunta: "O capacete é obrigatório para:",
    alternativas: [
      "Motoristas de motocicleta",
      "Somente motoristas de carros",
      "Pedestres",
      "Passageiros de ônibus",
    ],
    correta: 0,
  },

  {
    pergunta: "O sinal amarelo do semáforo indica:",
    alternativas: [
      "Atenção",
      "Aceleração obrigatória",
      "Estacionamento permitido",
      "Via livre",
    ],
    correta: 0,
  },

  {
    pergunta: "Antes de mudar de faixa, o motorista deve:",
    alternativas: [
      "Olhar os retrovisores e sinalizar",
      "Acelerar sem olhar",
      "Frear bruscamente",
      "Buzinar e mudar imediatamente",
    ],
    correta: 0,
  },

  {
    pergunta: "A faixa de pedestres existe principalmente para:",
    alternativas: [
      "Estacionamento",
      "Ultrapassagem",
      "Travessia de pedestres",
      "Parada de ônibus",
    ],
    correta: 2,
  },

  {
    pergunta: "O motorista deve dar preferência ao pedestre na faixa?",
    alternativas: [
      "Sim, respeitando as regras de circulação",
      "Nunca",
      "Somente à noite",
      "Somente quando houver policial",
    ],
    correta: 0,
  },

  {
    pergunta: "Dirigir após consumir bebida alcoólica pode:",
    alternativas: [
      "Aumentar os reflexos",
      "Diminuir a capacidade de reação",
      "Melhorar a concentração",
      "Não causar nenhum efeito",
    ],
    correta: 1,
  },

  {
    pergunta: "Qual equipamento ajuda a proteger motociclistas?",
    alternativas: [
      "Capacete",
      "Guarda-chuva",
      "Óculos escuros apenas",
      "Chinelo",
    ],
    correta: 0,
  },

  {
    pergunta: "O que significa uma placa de PARE?",
    alternativas: [
      "Reduzir um pouco",
      "Parar obrigatoriamente",
      "Acelerar",
      "Estacionar",
    ],
    correta: 1,
  },

  {
    pergunta: "Em uma via movimentada, o pedestre deve:",
    alternativas: [
      "Correr entre os veículos",
      "Usar a faixa de pedestres quando disponível",
      "Atravessar sem olhar",
      "Andar pelo meio da rua",
    ],
    correta: 1,
  },

  {
    pergunta: "O motorista deve respeitar o limite de velocidade?",
    alternativas: [
      "Sim",
      "Somente em rodovias",
      "Somente quando houver fiscalização",
      "Não",
    ],
    correta: 0,
  },

  {
    pergunta: "O acostamento deve ser usado normalmente para ultrapassagens?",
    alternativas: [
      "Sim",
      "Não",
      "Somente durante o dia",
      "Sempre que houver trânsito",
    ],
    correta: 1,
  },

  {
    pergunta: "Quando um veículo de emergência se aproxima com sirene e luzes acionadas, devemos:",
    alternativas: [
      "Acelerar",
      "Facilitar sua passagem",
      "Bloquear a via",
      "Ignorar",
    ],
    correta: 1,
  },

  {
    pergunta: "O motorista deve manter distância segura do veículo da frente?",
    alternativas: [
      "Sim",
      "Não",
      "Somente em estradas",
      "Somente em congestionamentos",
    ],
    correta: 0,
  },

  {
    pergunta: "A buzina deve ser utilizada:",
    alternativas: [
      "De forma moderada e quando necessária",
      "Continuamente",
      "Para pressionar pedestres",
      "Em qualquer situação",
    ],
    correta: 0,
  },

  {
    pergunta: "O pedestre deve olhar para os dois lados antes de atravessar?",
    alternativas: [
      "Sim",
      "Não",
      "Somente quando estiver chovendo",
      "Somente à noite",
    ],
    correta: 0,
  },

  {
    pergunta: "Usar o celular enquanto atravessa a rua pode:",
    alternativas: [
      "Aumentar a atenção",
      "Diminuir a atenção",
      "Melhorar a visão",
      "Facilitar a travessia",
    ],
    correta: 1,
  },

  {
    pergunta: "Crianças pequenas devem atravessar a rua:",
    alternativas: [
      "Sozinhas",
      "Acompanhadas por um adulto responsável",
      "Correndo",
      "Entre os carros",
    ],
    correta: 1,
  },

  {
    pergunta: "Em uma motocicleta, o passageiro deve:",
    alternativas: [
      "Usar capacete",
      "Ficar em pé",
      "Sentar de lado obrigatoriamente",
      "Não utilizar proteção",
    ],
    correta: 0,
  },

  {
    pergunta: "Ao encontrar uma faixa de pedestres sem semáforo, o motorista deve:",
    alternativas: [
      "Acelerar",
      "Prestar atenção e dar preferência quando aplicável",
      "Ignorar",
      "Buzinar para o pedestre sair",
    ],
    correta: 1,
  },

  {
    pergunta: "Qual comportamento ajuda a evitar acidentes?",
    alternativas: [
      "Dirigir de forma defensiva",
      "Acelerar constantemente",
      "Usar celular",
      "Ultrapassar em local proibido",
    ],
    correta: 0,
  },

  {
    pergunta: "O farol deve ser utilizado adequadamente para:",
    alternativas: [
      "Aumentar a segurança e visibilidade",
      "Ofuscar outros motoristas",
      "Forçar ultrapassagens",
      "Substituir a buzina",
    ],
    correta: 0,
  },

  {
    pergunta: "O motorista deve respeitar ciclistas?",
    alternativas: [
      "Sim",
      "Não",
      "Somente em ciclovias",
      "Somente quando houver fiscalização",
    ],
    correta: 0,
  },

  {
    pergunta: "Ao atravessar uma rua, o pedestre deve:",
    alternativas: [
      "Prestar atenção ao trânsito",
      "Usar o celular olhando para baixo",
      "Correr sem olhar",
      "Atravessar entre carros estacionados",
    ],
    correta: 0,
  },
];

/* =========================================================
   FUNÇÃO PARA EMBARALHAR
   ========================================================= */

function embaralhar(array) {
  const copia = [...array];

  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copia[i], copia[j]] = [copia[j], copia[i]];
  }

  return copia;
}

function criarRodada() {
  return embaralhar(perguntas).slice(0, 10);
}

/* =========================================================
   JOGO
   ========================================================= */

export default function Jogo({ navigation }) {
  const [rodada, setRodada] = useState(criarRodada());

  const [perguntaAtual, setPerguntaAtual] = useState(0);

  const [pontos, setPontos] = useState(0);

  const [vidas, setVidas] = useState(3);

  const [respostaSelecionada, setRespostaSelecionada] =
    useState(null);

  const [respondendo, setRespondendo] = useState(false);

  const [mensagem, setMensagem] = useState("");

  const [tipoMensagem, setTipoMensagem] = useState("");

  const [jogoFinalizado, setJogoFinalizado] = useState(false);

  /* =======================================================
     ANIMAÇÕES
     ======================================================= */

  const pedestreY = useRef(new Animated.Value(0)).current;

  const carro1X = useRef(new Animated.Value(-150)).current;

  const carro2X = useRef(
    new Animated.Value(SCREEN_WIDTH + 150)
  ).current;

  const carro3X = useRef(
    new Animated.Value(-180)
  ).current;

  /* =======================================================
     MOVIMENTO DOS CARROS
     ======================================================= */

  useEffect(() => {
    iniciarCarros();

    return () => {};
  }, []);

  const iniciarCarros = () => {
    carro1X.setValue(-150);
    carro2X.setValue(SCREEN_WIDTH + 150);
    carro3X.setValue(-180);

    Animated.loop(
      Animated.timing(carro1X, {
        toValue: SCREEN_WIDTH + 150,
        duration: 6500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(carro2X, {
        toValue: -150,
        duration: 7200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    Animated.loop(
      Animated.timing(carro3X, {
        toValue: SCREEN_WIDTH + 150,
        duration: 8500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  /* =======================================================
     PEDESTRE
     ======================================================= */

  const atravessarPedestre = () => {
    pedestreY.setValue(0);

    Animated.timing(pedestreY, {
      toValue: 150,
      duration: 1500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  /* =======================================================
     RESPONDER
     ======================================================= */

  const responder = (indice) => {
    if (respondendo || jogoFinalizado) {
      return;
    }

    setRespostaSelecionada(indice);
    setRespondendo(true);

    const pergunta = rodada[perguntaAtual];

    if (indice === pergunta.correta) {
      setPontos((valor) => valor + 100);

      setMensagem("Muito bem! Resposta correta!");

      setTipoMensagem("correta");

      atravessarPedestre();

      setTimeout(() => {
        proximaPergunta();
      }, 1800);
    } else {
      const novasVidas = vidas - 1;

      setVidas(novasVidas);

      setMensagem("Resposta incorreta!");

      setTipoMensagem("errada");

      if (novasVidas <= 0) {
        setTimeout(() => {
          setJogoFinalizado(true);
          setRespondendo(false);
        }, 1500);

        return;
      }

      setTimeout(() => {
        proximaPergunta();
      }, 1800);
    }
  };

  /* =======================================================
     PRÓXIMA PERGUNTA
     ======================================================= */

  const proximaPergunta = () => {
    if (perguntaAtual >= rodada.length - 1) {
      setJogoFinalizado(true);
      setRespondendo(false);
      return;
    }

    setPerguntaAtual((valor) => valor + 1);

    setRespostaSelecionada(null);

    setMensagem("");

    setTipoMensagem("");

    setRespondendo(false);

    pedestreY.setValue(0);
  };

  /* =======================================================
     REINICIAR
     ======================================================= */

  const reiniciarJogo = () => {
    setRodada(criarRodada());

    setPerguntaAtual(0);

    setPontos(0);

    setVidas(3);

    setRespostaSelecionada(null);

    setRespondendo(false);

    setMensagem("");

    setTipoMensagem("");

    setJogoFinalizado(false);

    pedestreY.setValue(0);

    iniciarCarros();
  };

  /* =======================================================
     VOLTAR
     ======================================================= */

  const voltar = () => {
    navigation.navigate("Tela1");
  };

  /* =======================================================
     TELA FINAL
     ======================================================= */

  if (jogoFinalizado) {
    return (
      <View style={styles.container}>
        <View style={styles.finalContainer}>
          <View style={styles.trophyCircle}>
            <Ionicons
              name="trophy"
              size={70}
              color="#FFD43B"
            />
          </View>

          <Text style={styles.finalTitulo}>
            Fim de jogo!
          </Text>

          <Text style={styles.finalSubtitulo}>
            Sua pontuação
          </Text>

          <Text style={styles.finalPontos}>
            {pontos} pontos
          </Text>

          <Text style={styles.finalInfo}>
            Você respondeu {Math.min(perguntaAtual + 1, 10)}{" "}
            perguntas
          </Text>

          <TouchableOpacity
            style={styles.botaoJogar}
            onPress={reiniciarJogo}
          >
            <Ionicons
              name="refresh"
              size={25}
              color="#fff"
            />

            <Text style={styles.botaoJogarTexto}>
              JOGAR NOVAMENTE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoVoltar}
            onPress={voltar}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#242B67"
            />

            <Text style={styles.botaoVoltarTexto}>
              VOLTAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const pergunta = rodada[perguntaAtual];

  return (
    <View style={styles.container}>

      {/* ===================================================
          CABEÇALHO
      =================================================== */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.botaoVoltarHeader}
          onPress={voltar}
        >
          <Ionicons
            name="arrow-back"
            size={27}
            color="#fff"
          />
        </TouchableOpacity>

        <View style={styles.tituloHeader}>
          <Ionicons
            name="car-sport"
            size={28}
            color="#FFD43B"
          />

          <Text style={styles.titulo}>
            QUIZ DE TRÂNSITO
          </Text>
        </View>

        <View style={styles.statusHeader}>

          <View style={styles.vidas}>
            {[0, 1, 2].map((item) => (
              <Ionicons
                key={item}
                name={
                  item < vidas
                    ? "heart"
                    : "heart-outline"
                }
                size={27}
                color={
                  item < vidas
                    ? "#FF3B5C"
                    : "#667085"
                }
              />
            ))}
          </View>

          <View style={styles.pontosHeader}>
            <Ionicons
              name="star"
              size={27}
              color="#FFD43B"
            />

            <Text style={styles.pontosTexto}>
              {pontos}
            </Text>
          </View>

        </View>
      </View>

      {/* ===================================================
          CENÁRIO
      =================================================== */}

      <View style={styles.cenario}>

        {/* CALÇADA SUPERIOR */}

        <View style={styles.calcadaSuperior}>

          <View style={styles.arvores}>
            <View style={styles.arvore} />
            <View style={styles.arvorePequena} />
            <View style={styles.arvore} />
          </View>

          <View style={styles.pisoCalcada}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View
                key={index}
                style={styles.blocoCalcada}
              />
            ))}
          </View>

          {/* PEDRESTE */}

          <Animated.View
            style={[
              styles.pedestre,
              {
                transform: [
                  {
                    translateY: pedestreY,
                  },
                ],
              },
            ]}
          >
            <Pedestre />
          </Animated.View>

        </View>

        {/* RUA */}

        <View style={styles.rua}>

          {/* FAIXA CENTRAL */}

          <View style={styles.faixa}>

            {Array.from({ length: 7 }).map(
              (_, index) => (
                <View
                  key={index}
                  style={styles.faixaLinha}
                />
              )
            )}

          </View>

          {/* LINHA CENTRAL */}

          <View style={styles.linhaCentral}>
            <View style={styles.linhaPontilhada} />
            <View style={styles.linhaPontilhada} />
            <View style={styles.linhaPontilhada} />
            <View style={styles.linhaPontilhada} />
            <View style={styles.linhaPontilhada} />
          </View>

          {/* CARRO VERMELHO */}

          <Animated.View
            style={[
              styles.carro,
              styles.carroLinha1,
              {
                transform: [
                  {
                    translateX: carro1X,
                  },
                ],
              },
            ]}
          >
            <CarroVermelho />
          </Animated.View>

          {/* CARRO AZUL */}

          <Animated.View
            style={[
              styles.carro,
              styles.carroLinha2,
              {
                transform: [
                  {
                    translateX: carro2X,
                  },
                ],
              },
            ]}
          >
            <CarroAzul />
          </Animated.View>

          {/* CARRO AMARELO */}

          <Animated.View
            style={[
              styles.carro,
              styles.carroLinha3,
              {
                transform: [
                  {
                    translateX: carro3X,
                  },
                ],
              },
            ]}
          >
            <CarroAmarelo />
          </Animated.View>

        </View>

        {/* CALÇADA INFERIOR */}

        <View style={styles.calcadaInferior}>

          <View style={styles.pisoCalcada}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View
                key={index}
                style={styles.blocoCalcada}
              />
            ))}
          </View>

          <View style={styles.arvoresInferior}>
            <View style={styles.arvorePequena} />
            <View style={styles.arvore} />
            <View style={styles.arvorePequena} />
          </View>

        </View>

      </View>

      {/* ===================================================
          INFORMAÇÕES
      =================================================== */}

      <View style={styles.infoPergunta}>

        <View style={styles.progressoContainer}>

          <Text style={styles.progressoTexto}>
            Pergunta {perguntaAtual + 1} de 10
          </Text>

          <View style={styles.progressoFundo}>
            <View
              style={[
                styles.progresso,
                {
                  width: `${
                    ((perguntaAtual + 1) / 10) * 100
                  }%`,
                },
              ]}
            />
          </View>

        </View>

        <Text style={styles.pergunta}>
          {pergunta.pergunta}
        </Text>

      </View>

      {/* ===================================================
          MENSAGEM
      =================================================== */}

      {mensagem !== "" && (
        <View
          style={[
            styles.mensagem,
            tipoMensagem === "correta"
              ? styles.mensagemCorreta
              : styles.mensagemErrada,
          ]}
        >
          <Ionicons
            name={
              tipoMensagem === "correta"
                ? "checkmark-circle"
                : "close-circle"
            }
            size={26}
            color="#fff"
          />

          <Text style={styles.mensagemTexto}>
            {mensagem}
          </Text>
        </View>
      )}

      {/* ===================================================
          ALTERNATIVAS
      =================================================== */}

      <View style={styles.alternativas}>

        {pergunta.alternativas.map(
          (alternativa, index) => {

            const selecionada =
              respostaSelecionada === index;

            const correta =
              index === pergunta.correta;

            let backgroundColor = "#fff";

            if (respondendo && selecionada) {
              backgroundColor =
                correta
                  ? "#2ECC71"
                  : "#E74C3C";
            }

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.alternativa,
                  { backgroundColor },
                  selecionada &&
                    styles.alternativaSelecionada,
                ]}
                onPress={() => responder(index)}
                disabled={respondendo}
                activeOpacity={0.8}
              >

                <View style={styles.letra}>
                  <Text style={styles.letraTexto}>
                    {String.fromCharCode(
                      65 + index
                    )}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.alternativaTexto,
                    selecionada && {
                      color: "#fff",
                    },
                  ]}
                >
                  {alternativa}
                </Text>

              </TouchableOpacity>
            );
          }
        )}

      </View>

    </View>
  );
}

/* =========================================================
   ESTILOS
   ========================================================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F4F8",
  },

  /* HEADER */

  header: {
    height: 70,
    backgroundColor: "#242B67",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  botaoVoltarHeader: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#30397D",
    alignItems: "center",
    justifyContent: "center",
  },

  tituloHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    flex: 1,
  },

  titulo: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
    marginLeft: 8,
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  vidas: {
    flexDirection: "row",
    gap: 2,
  },

  pontosHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  pontosTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },

  /* CENÁRIO */

  cenario: {
    height: 300,
    backgroundColor: "#333",
  },

  calcadaSuperior: {
    height: 70,
    backgroundColor: "#7C7F83",
    position: "relative",
    overflow: "hidden",
  },

  calcadaInferior: {
    height: 70,
    backgroundColor: "#7C7F83",
    position: "relative",
    overflow: "hidden",
  },

  pisoCalcada: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  blocoCalcada: {
    width: SCREEN_WIDTH / 8,
    height: 35,
    borderWidth: 0.5,
    borderColor: "#A7A9AC",
    backgroundColor: "#85888C",
  },

  rua: {
    height: 160,
    backgroundColor: "#292C32",
    position: "relative",
    overflow: "hidden",
    borderTopWidth: 4,
    borderTopColor: "#E4B52C",
    borderBottomWidth: 4,
    borderBottomColor: "#E4B52C",
  },

  /* FAIXA */

  faixa: {
    position: "absolute",
    width: 105,
    height: 160,
    left: SCREEN_WIDTH / 2 - 52,
    top: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 5,
  },

  faixaLinha: {
    width: 88,
    height: 13,
    backgroundColor: "#F4F4F4",
    borderRadius: 2,
  },

  linhaCentral: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 75,
    height: 4,
    flexDirection: "row",
    justifyContent: "space-around",
    opacity: 0.8,
  },

  linhaPontilhada: {
    width: 38,
    height: 3,
    backgroundColor: "#E8E8E8",
  },

  /* CARROS */

  carro: {
    position: "absolute",
    width: 105,
    height: 72,
    zIndex: 4,
  },

  carroLinha1: {
    top: 15,
  },

  carroLinha2: {
    top: 85,
  },

  carroLinha3: {
    top: 35,
  },

  /* PEDESTRE */

  pedestre: {
    position: "absolute",
    left: SCREEN_WIDTH / 2 - 24,
    top: 5,
    zIndex: 20,
  },

  /* ÁRVORES */

  arvores: {
    position: "absolute",
    left: 10,
    right: 10,
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arvoresInferior: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  arvore: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#238B45",
    borderWidth: 4,
    borderColor: "#176B34",
  },

  arvorePequena: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#36A852",
    borderWidth: 3,
    borderColor: "#176B34",
    marginTop: 10,
  },

  /* PERGUNTA */

  infoPergunta: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 13,
    paddingBottom: 12,
  },

  progressoContainer: {
    marginBottom: 9,
  },

  progressoTexto: {
    color: "#242B67",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },

  progressoFundo: {
    width: "100%",
    height: 8,
    backgroundColor: "#DDE2EF",
    borderRadius: 10,
    overflow: "hidden",
  },

  progresso: {
    height: "100%",
    backgroundColor: "#35C759",
    borderRadius: 10,
  },

  pergunta: {
    fontSize: 19,
    fontWeight: "800",
    color: "#242B67",
    lineHeight: 25,
  },

  /* MENSAGEM */

  mensagem: {
    marginHorizontal: 18,
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  mensagemCorreta: {
    backgroundColor: "#2ECC71",
  },

  mensagemErrada: {
    backgroundColor: "#E74C3C",
  },

  mensagemTexto: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },

  /* ALTERNATIVAS */

  alternativas: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 15,
    gap: 8,
  },

  alternativa: {
    minHeight: 51,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#DCE2F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  alternativaSelecionada: {
    borderColor: "transparent",
  },

  letra: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#E7EDFA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  letraTexto: {
    color: "#242B67",
    fontSize: 17,
    fontWeight: "900",
  },

  alternativaTexto: {
    flex: 1,
    color: "#242B67",
    fontSize: 15,
    fontWeight: "700",
  },

  /* TELA FINAL */

  finalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#F2F4F8",
  },

  trophyCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#242B67",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  finalTitulo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#242B67",
  },

  finalSubtitulo: {
    fontSize: 17,
    color: "#667085",
    marginTop: 12,
  },

  finalPontos: {
    fontSize: 42,
    fontWeight: "900",
    color: "#242B67",
    marginTop: 3,
  },

  finalInfo: {
    color: "#667085",
    marginTop: 8,
    marginBottom: 30,
  },

  botaoJogar: {
    width: "100%",
    height: 55,
    borderRadius: 15,
    backgroundColor: "#242B67",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  botaoJogarTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

  botaoVoltar: {
    marginTop: 14,
    width: "100%",
    height: 50,
    borderRadius: 15,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#DCE2F0",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  botaoVoltarTexto: {
    color: "#242B67",
    fontSize: 15,
    fontWeight: "800",
  },

});
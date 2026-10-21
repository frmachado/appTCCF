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

const Sprite = ({
  x,
  y,
  width,
  height,
  displayWidth,
  displayHeight,
  rotation = "0deg",
}) => {
  // O recorte usa as dimensões reais da sprites.png (1536 x 1024).
  const scaleX = displayWidth / width;
  const scaleY = displayHeight / height;
  const girado = rotation === "90deg" || rotation === "-90deg" || rotation === "270deg";

  return (
    <View
      style={{
        width: girado ? displayHeight : displayWidth,
        height: girado ? displayWidth : displayHeight,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
      }}
    >
      <View
        style={{
          width: displayWidth,
          height: displayHeight,
          overflow: "hidden",
          transform: [{ rotate: rotation }],
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
    </View>
  );
};

/* =========================================================
   SPRITES DOS CARROS — RECORTES DA LINHA SUPERIOR
   ========================================================= */
const CarroVermelho = () => (
  <Sprite x={27} y={80} width={100} height={165} displayWidth={43} displayHeight={72} rotation="90deg" />
);

const CarroAzul = () => (
  <Sprite x={140} y={80} width={100} height={165} displayWidth={43} displayHeight={72} rotation="90deg" />
);

const CarroAmarelo = () => (
  <Sprite x={365} y={80} width={100} height={165} displayWidth={43} displayHeight={72} rotation="90deg" />
);

/* =========================================================
   PERSONAGENS — HOMEM, MULHER E IDOSO
   ========================================================= */
const PERSONAGENS = {
  homem: {
    label: "Homem",
    frames: [31, 98, 165, 232, 299, 386, 453, 520, 587, 674, 741],
    y: 320, width: 58, height: 116,
  },
  mulher: {
    label: "Mulher",
    frames: [875, 942, 1009, 1076, 1143],
    y: 320, width: 58, height: 116,
  },
  idoso: {
    label: "Idoso",
    frames: [1217, 1284, 1351, 1418, 1485],
    y: 320, width: 48, height: 116,
  },
};

const Pedestre = ({ style, personagem = "homem", frameIndex = 0 }) => {
  const sprite = PERSONAGENS[personagem] || PERSONAGENS.homem;
  const frameX = sprite.frames[frameIndex % sprite.frames.length];

  return (
    <View style={style} pointerEvents="none">
      <Sprite
        x={frameX}
        y={sprite.y}
        width={sprite.width}
        height={sprite.height}
        displayWidth={34}
        displayHeight={52}
      />
    </View>
  );
};

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
    pergunta: "Ao atravessar uma rua, o pedestre deve:",
    alternativas: [
      "Olhar apenas para a direita",
      "Olhar para os dois lados",
      "Correr sem observar",
      "Usar o celular",
    ],
    correta: 1,
  },
  {
    pergunta: "A faixa de pedestres serve para:",
    alternativas: [
      "Estacionar veículos",
      "Facilitar a travessia de pedestres",
      "Permitir ultrapassagens",
      "Aumentar a velocidade",
    ],
    correta: 1,
  },
  {
    pergunta: "Uma pessoa idosa atravessando a rua precisa de:",
    alternativas: [
      "Pressa",
      "Atenção e respeito dos motoristas",
      "Buzinas para andar mais rápido",
      "Ajuda para correr",
    ],
    correta: 1,
  },
  {
    pergunta: "Ao se aproximar de uma faixa de pedestres, o motorista deve:",
    alternativas: [
      "Acelerar",
      "Reduzir a velocidade e dar preferência quando necessário",
      "Desviar pela contramão",
      "Ignorar os pedestres",
    ],
    correta: 1,
  },
  {
    pergunta: "Andar pela calçada é importante porque:",
    alternativas: [
      "É o espaço destinado à circulação de pedestres",
      "É mais rápido para carros",
      "Evita semáforos",
      "Permite estacionar motos",
    ],
    correta: 0,
  },
  {
    pergunta: "O que fazer antes de atravessar entre carros estacionados?",
    alternativas: [
      "Atravessar imediatamente",
      "Procurar um local seguro com boa visibilidade",
      "Fechar os olhos",
      "Correr para a rua",
    ],
    correta: 1,
  },
  {
    pergunta: "Dirigir após consumir álcool:",
    alternativas: [
      "É seguro em ruas vazias",
      "Reduz os riscos",
      "Compromete os reflexos e é proibido",
      "É permitido em baixa velocidade",
    ],
    correta: 2,
  },
  {
    pergunta: "O motorista deve respeitar os limites de velocidade para:",
    alternativas: [
      "Evitar acidentes e proteger todos",
      "Chegar sempre atrasado",
      "Usar menos os freios apenas",
      "Ultrapassar mais veículos",
    ],
    correta: 0,
  },
  {
    pergunta: "Ao ouvir uma sirene de emergência, o motorista deve:",
    alternativas: [
      "Disputar espaço",
      "Facilitar a passagem com segurança",
      "Acelerar atrás do veículo",
      "Parar no meio do cruzamento",
    ],
    correta: 1,
  },
  {
    pergunta: "Para andar de bicicleta com mais segurança, é importante:",
    alternativas: [
      "Ignorar a sinalização",
      "Respeitar as regras de trânsito e usar equipamentos de proteção",
      "Andar sempre na contramão",
      "Usar o celular pedalando",
    ],
    correta: 1,
  },
  {
    pergunta: "Ao atravessar com uma criança, o adulto deve:",
    alternativas: [
      "Deixá-la correr na frente",
      "Segurá-la e escolher um local seguro",
      "Atravessar fora da faixa sempre",
      "Olhar somente para o semáforo",
    ],
    correta: 1,
  },
  {
    pergunta: "O que é direção defensiva?",
    alternativas: [
      "Dirigir de forma a prevenir riscos e acidentes",
      "Dirigir sempre rápido",
      "Buzinar para todos",
      "Confiar apenas nos outros motoristas",
    ],
    correta: 0,
  },
  {
    pergunta: "Em uma rua sem calçada, o pedestre deve:",
    alternativas: [
      "Caminhar com atenção, preferencialmente de frente para os veículos",
      "Andar no meio da pista sem observar",
      "Caminhar olhando o celular",
      "Correr entre os carros",
    ],
    correta: 0,
  },
  {
    pergunta: "Por que é importante usar a seta antes de virar?",
    alternativas: [
      "Para comunicar a intenção aos outros usuários da via",
      "Para ter preferência sempre",
      "Para aumentar a velocidade",
      "Para dispensar os espelhos",
    ],
    correta: 0,
  },
  {
    pergunta: "Em um cruzamento, o motorista deve:",
    alternativas: [
      "Acelerar para passar primeiro",
      "Observar a sinalização e os demais usuários",
      "Olhar somente para frente",
      "Usar a buzina continuamente",
    ],
    correta: 1,
  },
  {
    pergunta: "O que fazer ao encontrar um semáforo apagado?",
    alternativas: [
      "Passar sem reduzir",
      "Redobrar a atenção e agir com prudência",
      "Acelerar para liberar a via",
      "Ignorar os outros veículos",
    ],
    correta: 1,
  },
  {
    pergunta: "A buzina deve ser usada:",
    alternativas: [
      "De forma prolongada em qualquer situação",
      "Como advertência breve quando necessário",
      "Para apressar pedestres idosos",
      "No lugar dos freios",
    ],
    correta: 1,
  },
  {
    pergunta: "Por que não se deve parar sobre a faixa de pedestres?",
    alternativas: [
      "Porque bloqueia a travessia segura",
      "Porque a faixa é exclusiva para motos",
      "Porque aumenta a largura da rua",
      "Porque obriga os pedestres a correr",
    ],
    correta: 0,
  },
  {
    pergunta: "Ao sair de uma garagem, o motorista deve:",
    alternativas: [
      "Sair rapidamente",
      "Observar a calçada e a circulação de pedestres",
      "Buzinar e não olhar",
      "Usar a calçada como pista",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual atitude ajuda a proteger pessoas com mobilidade reduzida?",
    alternativas: [
      "Estacionar sobre rampas",
      "Manter rampas e calçadas desobstruídas",
      "Bloquear a faixa de pedestres",
      "Apressar a travessia",
    ],
    correta: 1,
  },
  {
    pergunta: "Ao atravessar uma via com semáforo para pedestres, deve-se:",
    alternativas: [
      "Observar o sinal e verificar se os veículos pararam",
      "Atravessar sem olhar",
      "Seguir os veículos que estão virando",
      "Correr sempre",
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

  const [personagemSelecionado, setPersonagemSelecionado] = useState("homem");
  const [atravessando, setAtravessando] = useState(false);
  const [framePedestre, setFramePedestre] = useState(0);

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

  const animacoesCarros = useRef([]);

  const pararCarros = () => {
    animacoesCarros.current.forEach((animacao) => animacao.stop());
    animacoesCarros.current = [];
    carro1X.stopAnimation();
    carro2X.stopAnimation();
    carro3X.stopAnimation();
  };

  const iniciarCarros = () => {
    pararCarros();

    const inicio = -85;
    const fim = SCREEN_WIDTH + 85;
    const duracao = 6500;

    const criarLoop = (posicao, posicaoInicial) => {
      posicao.setValue(posicaoInicial);
      const distanciaRestante = Math.max(100, fim - posicaoInicial);
      const duracaoRestante = Math.max(1200, duracao * distanciaRestante / (fim - inicio));

      const ciclo = Animated.loop(
        Animated.sequence([
          Animated.timing(posicao, {
            toValue: fim,
            duration: duracaoRestante,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(posicao, {
            toValue: inicio,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      animacoesCarros.current.push(ciclo);
      ciclo.start();
    };

    // Os três veículos começam distribuídos na tela e seguem para a direita.
    criarLoop(carro1X, -75);
    criarLoop(carro2X, SCREEN_WIDTH * 0.32);
    criarLoop(carro3X, SCREEN_WIDTH * 0.66);
  };

  useEffect(() => {
    iniciarCarros();
    return () => {
      pararCarros();
      pedestreY.stopAnimation();
    };
  }, []);

  useEffect(() => {
    if (!atravessando) {
      setFramePedestre(0);
      return undefined;
    }

    const totalFrames = PERSONAGENS[personagemSelecionado].frames.length;
    const intervalo = setInterval(() => {
      setFramePedestre((anterior) => (anterior + 1) % totalFrames);
    }, 120);

    return () => clearInterval(intervalo);
  }, [atravessando, personagemSelecionado]);

  /* =======================================================
     PEDESTRE
     ======================================================= */

  const atravessarPedestre = () => {
    // Os veículos param durante a travessia para dar preferência ao pedestre.
    pararCarros();
    setAtravessando(true);
    setFramePedestre(0);
    pedestreY.setValue(0);

    Animated.timing(pedestreY, {
      toValue: -230,
      duration: 2200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setAtravessando(false);
        iniciarCarros();
      }
    });
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

          {/* DUAS LINHAS TRACEJADAS SEPARAM AS TRÊS FAIXAS */}
          <View pointerEvents="none" style={styles.divisoriasFaixas}>
            {[0, 1].map((item) => (
              <View key={item} style={styles.divisoriaFaixa}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <View key={index} style={styles.tracoDivisoria} />
                ))}
              </View>
            ))}
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

        {/* PERSONAGEM SOBRE O CENÁRIO: NÃO FICA CORTADO PELA CALÇADA */}
        <Animated.View
          pointerEvents="none"
          style={[
            styles.pedestreMovimento,
            { transform: [{ translateY: pedestreY }] },
          ]}
        >
          <Pedestre personagem={personagemSelecionado} frameIndex={framePedestre} />
        </Animated.View>

      </View>

      {/* ESCOLHA DO PERSONAGEM */}
      <View style={styles.seletorPersonagem}>
        <Text style={styles.seletorTitulo}>Escolha o personagem:</Text>
        {Object.entries(PERSONAGENS).map(([chave, item]) => (
          <TouchableOpacity
            key={chave}
            style={[
              styles.botaoPersonagem,
              personagemSelecionado === chave && styles.botaoPersonagemAtivo,
            ]}
            onPress={() => setPersonagemSelecionado(chave)}
            disabled={respondendo}
          >
            <Text
              style={[
                styles.textoBotaoPersonagem,
                personagemSelecionado === chave && styles.textoBotaoPersonagemAtivo,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
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
                  width: `${((perguntaAtual + 1) / 10) * 100
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

  /* CENÁRIO DO JOGO */

  cenario: {
    width: "100%",
    height: 300,
    backgroundColor: "#85888C",
    overflow: "hidden",
    position: "relative",
  },

  calcadaSuperior: {
    height: 70,
    width: "100%",
    backgroundColor: "#85888C",
    position: "relative",
    overflow: "hidden",
    borderBottomWidth: 4,
    borderBottomColor: "#E4B52C",
  },

  calcadaInferior: {
    height: 70,
    width: "100%",
    backgroundColor: "#85888C",
    position: "relative",
    overflow: "hidden",
    borderTopWidth: 4,
    borderTopColor: "#E4B52C",
  },

  pisoCalcada: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  blocoCalcada: {
    width: "12.5%",
    height: 35,
    borderWidth: 0.5,
    borderColor: "#A7A9AC",
    backgroundColor: "#85888C",
  },

  /* RUA */

  rua: {
    height: 160,
    width: "100%",
    backgroundColor: "#292C32",
    position: "relative",
    overflow: "hidden",
  },

  /* FAIXA DE PEDESTRES */

  faixa: {
    position: "absolute",
    width: 105,
    height: "100%",
    left: "50%",
    marginLeft: -52.5,
    top: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    zIndex: 2,
  },

  faixaLinha: {
    width: 88,
    height: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 2,
  },

  /* DUAS DIVISÓRIAS TRACEJADAS: TRÊS FAIXAS */
  divisoriasFaixas: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: 1,
  },

  divisoriaFaixa: {
    height: "100%",
    width: 3,
    justifyContent: "space-around",
    alignItems: "center",
  },

  tracoDivisoria: {
    width: 3,
    height: 10,
    borderRadius: 2,
    backgroundColor: "#F6D85A",
  },

  /* CARROS */


  carro: {
    position: "absolute",
    width: 72,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    overflow: "visible",
  },

  carroLinha1: { top: 8 },
  carroLinha2: { top: 69 },
  carroLinha3: { top: 130 },

  /* PEDESTRE: SOBRE O CENÁRIO TODO, PARA NÃO SER CORTADO */
  pedestreMovimento: {
    position: "absolute",
    left: "50%",
    marginLeft: -19,
    top: 235,
    width: 38,
    height: 58,
    zIndex: 20,
    elevation: 20,
    alignItems: "center",
  },

  seletorPersonagem: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  seletorTitulo: {
    color: "#242B67",
    fontSize: 12,
    fontWeight: "800",
    marginRight: 2,
  },
  botaoPersonagem: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DCE2F0",
    backgroundColor: "#F2F4F8",
  },
  botaoPersonagemAtivo: {
    backgroundColor: "#242B67",
    borderColor: "#242B67",
  },
  textoBotaoPersonagem: {
    color: "#242B67",
    fontSize: 12,
    fontWeight: "800",
  },
  textoBotaoPersonagemAtivo: {
    color: "#FFFFFF",
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

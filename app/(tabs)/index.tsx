import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from "react-native";

export default function Index() {
  const [investimentoInicial, setInvestimentoInicial] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [tempo, setTempo] = useState("");
  const [resultado, setResultado] = useState("");

  const calcularJuros = () => {
    Keyboard.dismiss();

    const C = parseFloat(investimentoInicial);
    const i = parseFloat(taxaJuros) / 100;
    const t = parseFloat(tempo);

    if (isNaN(C) || isNaN(i) || isNaN(t)) {
      setResultado("Por favor, insira valores válidos.");
      return;
    }

    const montanteS = C * t;
    const montanteJ = C * Math.pow(1 + i, t);
    const jurosTotais = montanteJ - montanteS;

    const resultadoFormatado =
      `💰 Montante com juros: R$ ${montanteJ.toFixed(2)}\n` +
      `📈 Juros acumulados: R$ ${jurosTotais.toFixed(2)}\n` +
      `⏳ Montante sem juros: R$ ${montanteS.toFixed(2)}`;

    setResultado(resultadoFormatado);
  };

  const limparCampos = () => {
    setInvestimentoInicial("");
    setTaxaJuros("");
    setTempo("");
    setResultado("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Investimentos</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Valor do Investimento (R$)</Text>
        <TextInput
          style={styles.input}
          value={investimentoInicial}
          onChangeText={setInvestimentoInicial}
          keyboardType="numeric"
          placeholder="Ex: 1000"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Taxa de Juros Mensal (%)</Text>
        <TextInput
          style={styles.input}
          value={taxaJuros}
          onChangeText={setTaxaJuros}
          keyboardType="numeric"
          placeholder="Ex: 1.5"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Período (meses)</Text>
        <TextInput
          style={styles.input}
          value={tempo}
          onChangeText={setTempo}
          keyboardType="numeric"
          placeholder="Ex: 12"
          placeholderTextColor="#888"
        />

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.calculateButton} onPress={calcularJuros}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButton} onPress={limparCampos}>
            <Text style={styles.buttonText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {resultado ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado do Investimento</Text>
          {resultado.split("\n").map((linha, index) => (
            <Text key={index} style={styles.resultText}>
              {linha}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F7FA",
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00838F",
    marginBottom: 30,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#B2EBF2",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#00838F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#006064",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#4DD0E1",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#F4FDFF",
    color: "#006064",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  calculateButton: {
    backgroundColor: "#00ACC1",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  clearButton: {
    backgroundColor: "#26C6DA",
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#B2EBF2",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#00838F",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006064",
    marginBottom: 10,
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    color: "#006064",
    lineHeight: 24,
  },
});

import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar as SB } from 'react-native';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from "./src/features/Timer";
import { FocusHistory } from "./src/features/FocusHistory";
import { RoundedButton } from "./src/components/RoundedButton";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null)
  const [history, setHistory] = useState([])

  return (
    <SafeAreaView style={styles.container}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
          {history.length > 0 && <RoundedButton style={styles.clearButton} size={80} title="Clear" onPress={() => setHistory([])} />}
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => setHistory([...history, subject])}
          clearSubject={() => setCurrentSubject(null)}
        />)}
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: Platform.OS === 'android' ? SB.currentHeight : 0,
  },
  clearButton: {
    alignSelf: 'center'
  },
});

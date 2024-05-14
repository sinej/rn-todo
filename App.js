import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TextInput} from 'react-native';
import {theme} from "./colors";
import {useState} from "react";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => {
    setText(payload);
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? 'white' : theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? 'white' : theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput placeholder={working ? 'Add a To Do' : "Where do you want to go?"}
                   style={styles.input}
                   value={text}
                   onChangeText={onChangeText}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: "50px 10px",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: 600,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    fontSize: 16,
  }
});

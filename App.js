import { StatusBar } from 'expo-status-bar';
import { Fontisto } from "@expo/vector-icons"
import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {theme} from "./colors";
import {STORAGE_KEY} from "./storage";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState({});


  useEffect(() => {
    loadTodos();
  }, []);

  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => {
    setText(payload);
  }

  const saveTodos = async (toSave) => {
    const item = JSON.stringify(toSave);
    await AsyncStorage.setItem(STORAGE_KEY, item);
  }

  const loadTodos = async () => {
    const todo = await AsyncStorage.getItem(STORAGE_KEY);
    setTodos(JSON.parse(todo));
  }

  const addTodo = () => {
    if(text === "") {
      return;
    }
    const newTodos = {...todos, [Date.now()]: { text, work: working }}
    // Object.assign({}, todos, {[Date.now()]: { text, work: working }})
    setTodos(newTodos); // state 넣어주고,
    saveTodos(newTodos); // 새로운 object를 saveTodos 함수에 보냄.
    // todo 저장 후, 초기화 처리
    setText("");
  }

  const deleteTodo = async (key) => {
    Alert.prompt(
      "Delete To Do",
      "Are you sure?",
      [
      {text: "Cancel"},
      {
        text: "OK",
        style: "destructive",
        onPress: async () => {
          const newTodo = {...todos};
          delete newTodo[key];
          // newTodo[key] = { completed: true }
          setTodos(newTodo);
          await saveTodos(newTodo);
        } },
    ]);
    return;
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
                   returnKeyType="done"
                   onChangeText={onChangeText}
                   onSubmitEditing={addTodo}
        />
        <ScrollView>
          {Object.keys(todos).map((key) => (
            todos[key].work === working ?
            <View key={key} style={styles.todo}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteTodo(key)}>
                <Fontisto name="trash" size={16} color={theme.grey} />
              </TouchableOpacity>
            </View> :
              null
          ))}
        </ScrollView>
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
  },
  todo: {
    backgroundColor: theme.todoBackground,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  todoText: {
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    alignItems: "center",
  }
});

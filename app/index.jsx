import {Text, View, TextInput, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { data } from "../data/todos";
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function NotFoundScreen() {
  const [todos, setTodos] = useState(data.sort((a, b) => b.id - a.id));
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      console.log(todos);
      setText('');
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  } 

  const removeTodo = (id) =>{
    setTodos(todos.filter(todo => todo.id !== id));
  }

  const renderItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text 
        style = {[styles.todoText, item.completed && styles.todoCompletedTexted]}
        onPress={() => toggleTodo(item.id)}
      >
        {item.title}
      </Text>
      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons name="delete-circle" size={36} color="red" selectable={undefined}/>
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <FlatList
      data = {todos}
      renderItem={renderItem}
      keyExtractor = {item => item.id.toString()}
      contentContainerStyle={{ flexGrow : 1}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  input: {
    flex: 1,
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    padding: 10,
    marginRight: 10,
    fontSize: 18,
    minWidth: 0,
    color: 'white',
  },
  addButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 18,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    gap: 4,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  todoText: {
    color: 'white',
    fontSize: 18,
    flex: 1,
  },
  todoCompletedTexted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

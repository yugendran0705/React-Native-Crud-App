import {Text, View, TextInput, Pressable, StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { data } from "../data/todos";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {Inter_500Medium , useFonts} from '@expo-google-fonts/inter';
import Octicons from '@expo/vector-icons/Octicons';
import Animated, { LinearTransition } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function NotFoundScreen() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const { theme, colorScheme, setColorScheme } = useContext(ThemeContext);
  const router = useRouter();
  
  const handlePress = (id) => {
    router.push(`/todos/${id}`);
  }
  
  const [loaded,error] = useFonts({
    Inter_500Medium,
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id));
        } else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, [data])
  
  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    }
    storeData();
  }, [todos])
  
  if (!loaded && !error) {
    return null;
  }
  
  const styles = createStyles(theme, colorScheme);

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
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
      <Pressable 
        onPress={() => handlePress(item.id)}
        onLongPress={() => toggleTodo(item.id)}
      >
        <Text 
          style = {[styles.todoText, item.completed && styles.todoCompletedTexted]}
        >
          {item.title}
        </Text>
      </Pressable>
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
          maxLength={30}
          onChangeText={setText}
          placeholder="Add a new todo"
          placeholderTextColor="gray"
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
        <Pressable 
          onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
          style={{ marginLeft: 10 }}>
            {
              colorScheme === 'dark' ?
              <Octicons name="moon" size={36} color={theme.text} selectable={undefined} style={{width:36}}/>
              :
              <Octicons name="sun" size={36} color={theme.text} selectable={undefined} style={{width:36}}/> 
            }
        </Pressable>
      </View>
      <Animated.FlatList
      data = {todos}
      renderItem={renderItem}
      keyExtractor = {todo => (todo.id ? todo.id.toString() : Math.random().toString())}
      contentContainerStyle={{ flexGrow : 1}}
      itemLayoutAnimation={LinearTransition}
      keyboardDismissMode="on-drag"
      />
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
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
      backgroundColor: theme.background,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: theme.text,
      padding: 10,
      marginRight: 10,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      minWidth: 0,
      color: theme.text,
    },
    addButton: {
      backgroundColor: theme.button,
      padding: 10,
      borderRadius: 5,
    },
    addButtonText: {
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      color: colorScheme === 'dark' ? 'black' : 'white',
    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.background,
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
      color: theme.text,
      fontSize: 18,
      fontFamily: 'Inter_500Medium',
      flex: 1,

    },
    todoCompletedTexted: {
      textDecorationLine: 'line-through',
      color: 'gray',
    },
})
}

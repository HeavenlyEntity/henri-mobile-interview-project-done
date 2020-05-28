import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {ActivityIndicator, Caption, Divider, FAB, List} from 'react-native-paper';
import { Checkbox, Badge } from 'react-native-paper';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

export default function TodoScreen() {

  const [todos, setTodos] = React.useState([])
  const [selectedTodos, setSelectedTodos] = React.useState([])
  const [selectedOptionPaneVisible, setSelectedOptionPaneVisible] = React.useState(false)
  const [loadingTodos, setloadingTodos] = React.useState(false)

  React.useEffect(() => {
    console.log(selectedTodos)
    if (todos.length !== 0) {
      setloadingTodos(false)
    }
  },[todos])

  const selectTodo = (todo) => {
    const selected = selectedTodos.find((selectedTodo) => selectedTodo.id === todo.id)

    if (selected) {
      let updatedSelection = [...selectedTodos]
      updatedSelection.splice(updatedSelection.indexOf(todo), 1)
      setSelectedTodos((updatedSelection))
    } else {
      setSelectedTodos(prevState => [...prevState, todo])
    }
  }

  React.useEffect(() => {
    const fetchTodos = async () => {
      setloadingTodos(true)
      await fetch('https://jsonplaceholder.typicode.com/todos')
          .then((res) => res.json())
          .then(resJSON => {
            console.log('Todos fetched', resJSON)
            setTodos(resJSON)
          })

    }
    fetchTodos()
        .catch(e => console.error(e))
  },[])

  const markTasksComplete = () => {
    let completingTasks = selectedTodos.slice().map((task) => task.completed = true)
    let updatedTodos = [...todos]
    todos.forEach((todo) => {
      const found = completingTasks.find((task) => task.id === todo.id)

      if (found) {
        updatedTodos.splice(todos.indexOf(todo), 1, found)
      }
    })
   setTodos(updatedTodos)
   setSelectedTodos([])
   setSelectedOptionPaneVisible(false)
  }
  const markTasksIncomplete = () => {
    let completingTasks = selectedTodos.slice().map((task) => task.completed = false)
    let updatedTodos = [...todos]
    todos.forEach((todo) => {
      const found = completingTasks.find((task) => task.id === todo.id)

      if (found) {
        updatedTodos.splice(todos.indexOf(todo), 1, found)
      }
    })
   setTodos(updatedTodos)
   setSelectedTodos([])
   setSelectedOptionPaneVisible(false)
  }

  return (
      <View style={{display: 'flex', justifyContent: 'center'}}>
        {loadingTodos ?
            <View style={{marginTop: '2%'}}>
              <ActivityIndicator color='#00A4E8' animating={true} />
              <Caption style={{textAlign: 'center'}}>Loading To-Do List...</Caption>
            </View>
            :
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
              <List.Section>
                {todos.map((todo, i) => {
                  return (
                      <List.Item
                          key={i}
                          title={todo.title}
                          description={todo.title}
                          left={() => <Checkbox key={todo.id}  status={selectedTodos.find((selected) => selected.id === todo.id) ? 'checked' : 'unchecked'} onPress={() => selectTodo(todo)}/>}
                          right={() => todo.completed ? <Badge style={{backgroundColor: 'black', color: 'lime'}}>✔</Badge> : null}
                      />
                  )
                })}
              </List.Section>
            </ScrollView>
        }
        {selectedTodos.length !== 0 ? <FAB
            style={styles.fab}
            small
            icon="notebook"
            onPress={() => setSelectedOptionPaneVisible(true)}
        /> : null}
        {selectedTodos.length !== 0 ? <Portal>
          <Dialog
              visible={selectedOptionPaneVisible}
              onDismiss={() => setSelectedOptionPaneVisible(false)}>
            <Dialog.Title>{selectedTodos.length === 1 ? 'Mark To-Do' : 'Mark To-Dos'}</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Mark To-Dos as?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={markTasksComplete}>Done</Button>
              <Button onPress={markTasksIncomplete}>To-Do</Button>
              <Button onPress={() => setSelectedOptionPaneVisible(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal> : null}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  fab: {
    backgroundColor: '#313131',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

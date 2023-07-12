import { useState } from "react";

import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default function AddTodo({ handleAddTodo }) {
  const [todoInput, setTodoInput] = useState("");

  const { textInputStyle, addTodoButtonTextStyle, addTodoContainerStyle } = styles;

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput style={textInputStyle} value={todoInput} onChangeText={(text) => setTodoInput(text)} />
      <TouchableOpacity
        style={addTodoContainerStyle}
        onPress={() => {
          setTodoInput("");
          handleAddTodo(todoInput);
        }}
      >
        <Text style={addTodoButtonTextStyle}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: "80%",
    padding: 15,
    borderWidth: 1,
  },
  addTodoContainerStyle: {
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#049AE0",
  },
  addTodoButtonTextStyle: {
    color: "#FFFFFF",
  },
});

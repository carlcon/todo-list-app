import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

export default function TodoListComponent({ todos, handleRemoveTodo }) {
  const { containerStyle, textStyle, removeTodoButtonTextStyle, removeTodoButtonContainerStyle } = styles;

  return (
    <View style={containerStyle}>
      {todos.map((todo) => {
        return (
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <Text style={textStyle} key={todo.id}>
              {todo.text}
            </Text>
            <TouchableOpacity
              style={removeTodoButtonContainerStyle}
              onPress={() => {
                handleRemoveTodo(todo.id);
              }}
            >
              <Text style={removeTodoButtonTextStyle}>Remove</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  textStyle: {
    color: "black",
  },
  removeTodoButtonContainerStyle: {
    justifyContent: "center",

    backgroundColor: "red",
  },
  removeTodoButtonTextStyle: {
    color: "#FFFFFF",
  },
});

import { useEffect, useReducer, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoListComponent from "../components/TodoListComponent";
import AddTodo from "../components/AddTodo";

const axios = require("axios").default;

const todosReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            console.log("pass here");
            console.log(action.text);
            console.log(state);
            return [...state, { id: action.id, text: action.text }];
        case "REMOVE_TODO":
            return state.filter((todo) => todo.id !== action.id);
        case "DISPLAY_TODO_LIST":
            return action.data;
        default:
            return state;
    }
};

export default function HomeScreen({ navigation }) {
    const [userToken, setUserToken] = useState("");
    const [todos, dispatch] = useReducer(todosReducer, []);

    useEffect(() => {
        getUserToken();
    }, []);

    useEffect(() => {
        if (userToken !== "") {
            getTodoList();
        }
    }, [userToken]);

    async function getUserToken() {
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token);
    }

    async function getTodoList() {
        const headers = {
            headers: {
                Authorization: "Token " + userToken,
            },
        };

        axios
            .get("http://127.0.0.1:9000/todos/", headers)
            .then(function (response) {
                console.log(response.data);

                dispatch({
                    type: "DISPLAY_TODO_LIST",
                    data: response.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onPressLogout = async () => {
        const headers = {
            headers: {
                Authorization: "Token " + userToken,
            },
        };

        axios
            .get("http://127.0.0.1:9000/api/auth/logout/", headers)
            .then(function (response) {
                console.log(response.data);

                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    async function handleAddTodo(text) {
        const headers = {
            headers: {
                Authorization: "Token " + userToken,
            },
        };

        const payload = {
            text: text,
        };

        axios
            .post("http://127.0.0.1:9000/todos/", payload, headers)
            .then((response) => {
                console.log("inside add todo", response.data);

                const { id, text } = response.data;
                dispatch({
                    type: "ADD_TODO",
                    id: id,
                    text: text,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function handleRemoveTodo(id) {
        const headers = {
            headers: {
                Authorization: "Token " + userToken,
            },
        };

        axios.delete(`http://127.0.0.1:9000/todos/${id}`, headers);

        dispatch({
            type: "REMOVE_TODO",
            id: id,
        });
    }

    const { logoutbuttonContainerStyle, logoutButtonTextStyle } = styles;

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <AddTodo handleAddTodo={handleAddTodo} />
            <TodoListComponent todos={todos} handleRemoveTodo={handleRemoveTodo} />

            <TouchableOpacity style={logoutbuttonContainerStyle} onPress={() => onPressLogout()}>
                <Text style={logoutButtonTextStyle}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoutbuttonContainerStyle: {
        justifyContent: "center",
        padding: 10,
        backgroundColor: "#049AE0",
    },
    logoutButtonTextStyle: {
        color: "#FFFFFF",
    },
});

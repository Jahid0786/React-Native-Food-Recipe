"use client"

import React, { useState } from "react"
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"

export default function LoginScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isKeyboardVisible, setKeyboardVisible] = useState(false)

    const fadeAnim = useState(new Animated.Value(0))[0]

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()

        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true))
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false))

        return () => {
            keyboardDidShowListener.remove()
            keyboardDidHideListener.remove()
        }
    }, [fadeAnim])

    const handleLogin = () => {
        // Implement login logic here
        navigation.navigate("Home")
    }

    const handleForgotPassword = () => {
        setModalVisible(true)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
            }}>

                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        width: "90%",
                        maxWidth: 400,
                        backgroundColor: "white",
                        borderRadius: 20,
                        padding: 20,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 28,
                            fontWeight: "bold",
                            color: "#333",
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        Welcome Back
                    </Text>

                    <View style={{ marginBottom: 15 }}>
                        <Text style={{ color: "#666", marginBottom: 5 }}>Email</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                        >
                            <AntDesign name="user" size={20} color="#666" />
                            <TextInput
                                placeholder="Enter your email"
                                style={{
                                    flex: 1,
                                    paddingVertical: 12,
                                    paddingHorizontal: 10,
                                    color: "#333",
                                }}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={{ color: "#666", marginBottom: 5 }}>Password</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                backgroundColor: "#f0f0f0",
                                borderRadius: 10,
                                paddingHorizontal: 10,
                            }}
                        >
                            <AntDesign name="lock" size={20} color="#666" />
                            <TextInput
                                placeholder="Enter your password"
                                style={{
                                    flex: 1,
                                    paddingVertical: 12,
                                    paddingHorizontal: 10,
                                    color: "#333",
                                }}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={handleLogin}
                        style={{
                            backgroundColor: "#4c669f",
                            paddingVertical: 12,
                            borderRadius: 10,
                            marginBottom: 15,
                        }}
                    >
                        <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleForgotPassword}>
                        <Text style={{ color: "#4c669f", textAlign: "center" }}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {!isKeyboardVisible && (
                        <View style={{ marginTop: 20, alignItems: "center" }}>
                            <Text style={{ color: "#666" }}>Don't have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                                <Text style={{ color: "#4c669f", fontWeight: "bold", marginTop: 5 }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Animated.View>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    animationType="fade"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        <View
                            style={{
                                width: "90%",
                                maxWidth: 400,
                                backgroundColor: "white",
                                borderRadius: 20,
                                padding: 20,
                                alignItems: "center",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: "#333",
                                    marginBottom: 15,
                                }}
                            >
                                Reset Password
                            </Text>
                            <Text style={{ color: "#666", marginBottom: 15, textAlign: "center" }}>
                                Enter your email to receive a reset link
                            </Text>
                            <TextInput
                                placeholder="Enter your email"
                                style={{
                                    width: "100%",
                                    backgroundColor: "#f0f0f0",
                                    borderRadius: 10,
                                    paddingHorizontal: 15,
                                    paddingVertical: 12,
                                    marginBottom: 20,
                                }}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "#4c669f",
                                    paddingVertical: 12,
                                    paddingHorizontal: 30,
                                    borderRadius: 10,
                                    marginBottom: 15,
                                }}
                                onPress={() => {
                                    // Implement password reset logic here
                                    setModalVisible(false)
                                }}
                            >
                                <Text style={{ color: "white", fontWeight: "bold" }}>Send Link</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{ color: "#666" }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}


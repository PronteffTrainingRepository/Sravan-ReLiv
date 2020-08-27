import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Registrations from "./src/screens/Registrations";
import BodyParameters from "./src/screens/BodyParameters";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function App() {
  return (
    // <View style={styles.container}>
    //   <Registrations />

    //   <StatusBar />
    // </View>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="registrations"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="registrations" component={Registrations} />
        <Stack.Screen name="bodyparameters" component={BodyParameters} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    //alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

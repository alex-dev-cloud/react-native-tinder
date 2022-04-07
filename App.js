import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {DATA} from "./src/constants/mockData";
import Deck from "./src/components/Deck";
import CardItem from "./src/components/CardItem";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Deck
          data={DATA}
          ComponentToRender={CardItem}
          onSwipeRight={item => console.log("onSwipeRight", item)}
          onSwipeLeft={item => console.log("onSwipeLeft", item)}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
});

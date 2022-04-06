import React, {useRef, useEffect} from "react";
import {View, StyleSheet, Animated} from "react-native";

const Ball = () => {
    const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

    useEffect(() => {
        Animated.spring(position, {
            toValue: {x: 200, y: 500},
            useNativeDriver: false,
        }).start();
    }, []);

    return (
        <Animated.View style={position.getLayout()}>
            <View style={styles.ball}/>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    ball: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black',
    }
});

export default Ball;
import React, { useRef, useState } from "react";
import { View, Animated, PanResponder, Dimensions, Text } from "react-native";
import { Card, Button } from "@rneui/themed";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({ ComponentToRender, data, onSwipeLeft, onSwipeRight }) => {
  const position = useRef(new Animated.ValueXY()).current;
  const [cardIndex, setCardIndex] = useState(0);
  const [currentItem, setCurrentItem] = useState(data[cardIndex]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => {
        return true;
      },
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          return forceSwipe("right");
        }
        if (gesture.dx < -SWIPE_THRESHOLD) {
          return forceSwipe("left");
        }
        return resetPosition();
      }
    })
  ).current;

  const getCardStyles = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false
    }).start();
  };

  const forceSwipe = (direction) => {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction) => {
    const item = data[cardIndex];
    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    setCardIndex(cardIndex + 1);
    setCurrentItem(data[cardIndex]);
    console.log("cardIndex", cardIndex)
    console.log("currentItem", currentItem)
  };

  if (cardIndex >= data.length) {
    return (
      <Card>
        <Card.Title>All done!</Card.Title>
        <Card.Divider />
        <Text style={{ marginBottom: 10 }}>There is no more card here...</Text>
        <Button
          title="Get more!"
          backgroundColor="#03A9F4"
        />
      </Card>
    );
  }

  return (
    <View>
      {
        data.map((item, index) => {
          if (cardIndex > index) return null;
          return (
            <Animated.View
              key={item.id}
              style={[getCardStyles(), styles.cardItem]}
              { ...(cardIndex === index && panResponder.panHandlers)}>
              <ComponentToRender
                item={item}
              />
            </Animated.View>
            )
        }).reverse()
      }
    </View>
  );
};

const styles = {
  cardItem: {
    position: "absolute",
    width: SCREEN_WIDTH
  }
}

export default Deck;
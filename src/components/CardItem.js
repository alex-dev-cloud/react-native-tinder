import React from "react";
import { Text } from "react-native";
import { Card, Button } from "@rneui/themed";

const CardItem = ({ item }) => {
  return (
    <>
      <Card>
        <Card.Title>Cards list</Card.Title>
        <Card.Divider />
        <Card.Image
          source={{ uri: item.uri }}
          containerStyle={{width: "100%"}}
        />
        <Text style={{ marginBottom: 10 }}>
          I can customize the card further.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          {item.text}
        </Text>
        <Button
          icon={{
            name: "code",
            color: "white"
        }}
          backgroundColor="#03A9F4"
          title="View Now!"
        />
      </Card>
    </>
  );
};

export default CardItem;

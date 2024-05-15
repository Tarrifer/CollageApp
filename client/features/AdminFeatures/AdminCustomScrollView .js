import React, { useState, useRef } from "react";
import { View, ScrollView, PanResponder, Text } from "react-native";

const AdminCustomScrollView = () => {
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event) => {
    const position = event.nativeEvent.contentOffset.y;
    setScrollPosition(position);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const { dy } = gestureState;
      const currentPosition = scrollPosition + dy;
      scrollViewRef.current.scrollTo({ y: currentPosition, animated: false });
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Your content here */}
        <View style={{ height: 1000 }}>
          <Text>Scrollable content</Text>
        </View>
      </ScrollView>
      <View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          width: 40,
          height: 40,
          backgroundColor: "gray",
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white" }}>Scroll</Text>
      </View>
    </View>
  );
};

export default AdminCustomScrollView;

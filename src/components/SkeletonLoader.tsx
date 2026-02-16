import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors, spacing } from "../theme";

export const SkeletonLoader = () => {
  const animatedValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((key) => (
        <View key={key} style={styles.item}>
          <Animated.View
            style={[
              styles.skeleton,
              { opacity: animatedValue, width: "60%", height: 20, marginBottom: 5 },
            ]}
          />
          <Animated.View
            style={[
              styles.skeleton,
              { opacity: animatedValue, width: "40%", height: 15 },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  item: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  skeleton: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
  },
});

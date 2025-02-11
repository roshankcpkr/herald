import React from "react";
import { Modal, View, StyleSheet, Pressable, Dimensions } from "react-native";
import NewsCard from "./NewsCard";
import { Article } from "@/utils/storage";
import { FontAwesome } from "@expo/vector-icons";

type SavedNewsModalProps = {
  article: Article | null;
  visible: boolean;
  onClose: () => void;
};

export default function SavedNewsModal({
  article,
  visible,
  onClose,
}: SavedNewsModalProps) {
  if (!article) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Pressable style={styles.closeButton} onPress={onClose}>
          <FontAwesome name="close" size={24} color="#fff" />
        </Pressable>
        <NewsCard {...article} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
});

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import NewsCard from "./NewsCard";
import { Article } from "@/utils/storage";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

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
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const handlePressOutside = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false);
    } else {
      onClose();
    }
  };

  if (!article) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handlePressOutside}
    >
      <Pressable style={styles.overlay} onPress={handlePressOutside}>
        <Pressable
          style={styles.modalView}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {isSelectionMode ? (
            <View style={styles.selectionMenu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setIsSelectionMode(false)}
              >
                <MaterialIcons name="close" size={24} color="#666" />
                <Text style={styles.menuText}>Cancel</Text>
              </TouchableOpacity>
              {/* Other menu items */}
            </View>
          ) : (
            <View style={styles.content}>
              <NewsCard {...article} />
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    padding: 8,
  },
  selectionMenu: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
});

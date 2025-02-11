import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RssFeed } from "@/app/settings/rss-manager";
import { Colors } from "@/constants/Colors";

interface AddRssModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (feed: RssFeed) => void;
  editingFeed: RssFeed | null;
}

export default function AddRssModal({
  visible,
  onClose,
  onSubmit,
  editingFeed,
}: AddRssModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (editingFeed) {
      setName(editingFeed.name);
      setUrl(editingFeed.url);
      setCategory(editingFeed.category);
    } else {
      setName("");
      setUrl("");
      setCategory("");
    }
  }, [editingFeed]);

  const handleSubmit = () => {
    if (!name || !url || !category) return;

    const feed: RssFeed = {
      id: editingFeed?.id || Date.now().toString(),
      name,
      url,
      category,
    };

    onSubmit(feed);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {editingFeed ? "Edit RSS Feed" : "Add RSS Feed"}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Feed Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Feed URL"
            value={url}
            onChangeText={setUrl}
            autoCapitalize="none"
            keyboardType="url"
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <View style={styles.buttonContainer}>
            <Pressable style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[
                styles.submitButton,
                (!name || !url || !category) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!name || !url || !category}
            >
              <Text style={styles.submitButtonText}>
                {editingFeed ? "Save" : "Add"}
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Rubik-Bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontFamily: "Rubik-Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#666",
    fontFamily: "Rubik-Medium",
  },
  submitButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: Colors.tabIconSelected,
  },
  submitButtonDisabled: {
    backgroundColor: "#007AFF80",
  },
  submitButtonText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Rubik-Medium",
  },
});

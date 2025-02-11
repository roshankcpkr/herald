import React, { useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Modal,
  Text,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Speech from "expo-speech";

interface TextToSpeechProps {
  text: string;
}

export default function TextToSpeech({ text }: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVoices, setShowVoices] = useState(false);
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<Speech.Voice | null>(null);

  const loadVoices = async () => {
    const availableVoices = await Speech.getAvailableVoicesAsync();
    setVoices(availableVoices);
    setShowVoices(true);
  };

  const handlePlay = async () => {
    const isSpeaking = await Speech.isSpeakingAsync();

    if (isSpeaking) {
      await Speech.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    Speech.speak(text, {
      voice: selectedVoice?.identifier,
      onDone: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const selectVoice = (voice: Speech.Voice) => {
    setSelectedVoice(voice);
    setShowVoices(false);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePlay} style={styles.playButton}>
        <FontAwesome
          name={isPlaying ? "pause" : "play"}
          size={16}
          color="#007AFF"
        />
      </Pressable>
      <Pressable onPress={loadVoices} style={styles.voiceButton}>
        <FontAwesome name="gear" size={16} color="#007AFF" />
      </Pressable>

      <Modal
        visible={showVoices}
        animationType="slide"
        transparent
        onRequestClose={() => setShowVoices(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Voice</Text>
              <Pressable onPress={() => setShowVoices(false)}>
                <FontAwesome name="times" size={20} color="#666" />
              </Pressable>
            </View>
            <FlatList
              data={voices}
              keyExtractor={(item) => item.identifier}
              renderItem={({ item }) => (
                <Pressable
                  style={[
                    styles.voiceItem,
                    selectedVoice?.identifier === item.identifier &&
                      styles.selectedVoice,
                  ]}
                  onPress={() => selectVoice(item)}
                >
                  <Text style={styles.voiceName}>{item.name}</Text>
                  <Text style={styles.voiceLanguage}>{item.language}</Text>
                  {selectedVoice?.identifier === item.identifier && (
                    <FontAwesome name="check" size={16} color="#007AFF" />
                  )}
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF20",
    justifyContent: "center",
    alignItems: "center",
  },
  voiceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007AFF20",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Rubik-Medium",
  },
  voiceItem: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
  },
  selectedVoice: {
    backgroundColor: "#007AFF10",
  },
  voiceName: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
  },
  voiceLanguage: {
    fontSize: 14,
    color: "#666",
    marginRight: 8,
    fontFamily: "Rubik-Regular",
  },
});

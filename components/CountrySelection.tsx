import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import { countries, Country } from "@/constants/CountryList";
import { Colors } from "@/constants/Colors";

type Props = {
  onComplete: (country: Country) => void;
};

export default function CountrySelection({ onComplete }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Country</Text>
      <Text style={styles.subtitle}>Choose your preferred news region</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search countries..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredCountries.map((country) => (
          <Pressable
            key={country.id}
            style={[
              styles.countryItem,
              selectedCountry?.id === country.id && styles.selectedCountry,
            ]}
            onPress={() => handleSelect(country)}
          >
            <Text
              style={[
                styles.countryText,
                selectedCountry?.id === country.id &&
                  styles.selectedCountryText,
              ]}
            >
              {country.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        style={[
          styles.continueButton,
          !selectedCountry && styles.disabledButton,
        ]}
        disabled={!selectedCountry}
        onPress={() => selectedCountry && onComplete(selectedCountry)}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-SemiBold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Rubik-Regular",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontFamily: "Rubik-Regular",
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  countryItem: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedCountry: {
    backgroundColor: "#FF4C4C",
    borderColor: "#FF4C4C",
  },
  countryText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Rubik-Medium",
  },
  selectedCountryText: {
    color: "#fff",
  },
  continueButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Rubik-Medium",
  },
});

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native";
import { getCountry, saveCountry } from "@/utils/storage";
import CountryItem from "@/components/settings/CountryItem";
import { countries } from "@/constants/CountryList";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function CountryScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadCountry();
  }, []);

  const loadCountry = async () => {
    try {
      const country = await getCountry();
      setSelectedCountry(country?.id || "");
    } catch (error) {
      console.error("Error loading country:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = async (countryId: string) => {
    try {
      const selectedCountryObj = countries.find((c) => c.id === countryId);
      if (selectedCountryObj) {
        await saveCountry(selectedCountryObj);
        setSelectedCountry(countryId);
        router.back();
      }
    } catch (error) {
      console.error("Error saving country:", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reorganize countries to show selected country at top
  const organizedCountries = [...filteredCountries].sort((a, b) => {
    if (a.id === selectedCountry) return -1;
    if (b.id === selectedCountry) return 1;
    return 0;
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Country</Text>
      <Text style={styles.subtitle}>
        Choose your location to get personalized news
      </Text>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <FontAwesome
          name="search"
          size={16}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search countries..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <FlatList
        data={organizedCountries}
        renderItem={({ item }) => (
          <CountryItem
            country={item}
            selected={selectedCountry === item.id}
            onSelect={() => handleCountrySelect(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Rubik-Bold",
    color: "#000",
    marginTop: 20,
    marginHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: "#666",
    marginTop: 8,
    marginBottom: 20,
    marginHorizontal: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 10,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    color: "#000",
  },
  list: {
    padding: 16,
  },
});

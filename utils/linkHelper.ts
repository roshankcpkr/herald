import { Linking } from "react-native";

export const PRIVACY_POLICY_URL =
  "https://bingolabs.com.np/policies/privacy-policy";
export const TERMS_URL = "https://bingolabs.com.np/policies/terms-of-service";

export const openURL = async (url: string) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  } catch (error) {
    console.error("Error opening URL:", error);
  }
};

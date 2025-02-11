import { FontAwesome } from "@expo/vector-icons";

type IconName = keyof typeof FontAwesome.glyphMap;

export const categoryIcons: Record<string, IconName> = {
  Android: "android",
  "Android Development": "code",
  Apple: "apple",
  Architecture: "building",
  "Business & Economy": "briefcase",
  Programming: "code",
  Science: "flask",
  Sports: "futbol-o",
};

export const categories = [
  { id: "1", name: "Android" },
  { id: "2", name: "Android Development" },
  { id: "3", name: "Apple" },
  { id: "4", name: "Architecture" },
  { id: "5", name: "Beauty" },
  { id: "6", name: "Books" },
  { id: "7", name: "Business & Economy" },
  { id: "8", name: "Cars" },
  { id: "9", name: "Cricket" },
  { id: "10", name: "Interior design" },
  { id: "11", name: "DIY" },
  { id: "12", name: "Fashion" },
  { id: "13", name: "Food" },
  { id: "14", name: "Football" },
  { id: "15", name: "Funny" },
  { id: "16", name: "Gaming" },
  { id: "17", name: "History" },
  { id: "18", name: "iOS Development" },
  { id: "19", name: "Movies" },
  { id: "20", name: "Music" },
  { id: "21", name: "News" },
  { id: "22", name: "Personal finance" },
  { id: "23", name: "Photography" },
  { id: "24", name: "Programming" },
  { id: "25", name: "Science" },
  { id: "26", name: "Space" },
  { id: "27", name: "Sports" },
  { id: "28", name: "Startups" },
  { id: "29", name: "Tech" },
  { id: "30", name: "Television" },
  { id: "31", name: "Tennis" },
  { id: "32", name: "Travel" },
  { id: "33", name: "UI / UX" },
  { id: "34", name: "Web Development" },
] as const;

export const getCategoryNameById = (id: string): string | undefined => {
  const category = categories.find((cat) => cat.id === id);
  return category?.name.toLowerCase();
};

import { llamaUtils } from "./aimodel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Article } from "./storage";
import { cleanHtmlContent } from "./cleanContent";

let isProcessing = false;
const queue: (() => Promise<void>)[] = [];

const processQueue = async () => {
  if (isProcessing || queue.length === 0) return;
  console.log("🔄 Processing next item in queue. Queue length:", queue.length);

  isProcessing = true;
  const nextTask = queue.shift();

  if (nextTask) {
    await nextTask();
    isProcessing = false;
    processQueue();
  }
};

export const getSummary = async (content: string): Promise<string> => {
  const cleanContent = cleanHtmlContent(content);
  console.log("📥 Received text for summary, length:", cleanContent?.length);

  return new Promise((resolve) => {
    const task = async () => {
      try {
        const modelDownloaded = await AsyncStorage.getItem("modelDownloaded");
        console.log("📱 Model downloaded status:", modelDownloaded);

        if (!modelDownloaded) {
          throw new Error("Model not downloaded");
        }

        if (!llamaUtils.isModelInitialized()) {
          console.log("🚀 Initializing Llama model");
          await llamaUtils.initialize();
        }

        console.log("⏳ Adding delay before processing");
        await new Promise((r) => setTimeout(r, 500));

        const prompt = `
          Summarize this news article in exactly 40 words or less. Provide the overall summary of the article in 40 words or less. Don't cross the 40 words limit. Summarize the article in a way that is easy to understand and engaging. Don't add any other text or comments. Just the summary without missing the important points:
          ${cleanContent}
        `;

        console.log("🤖 Generating summary with Llama");
        const summary = await llamaUtils.generateResponse(prompt);
        console.log("✅ Summary generated:", summary?.substring(0, 50) + "...");

        resolve(summary || "");
      } catch (error) {
        console.error("❌ Error getting summary:", error);
        resolve("");
      }
    };

    console.log("➕ Adding task to queue");
    queue.push(task);
    processQueue();
  });
};

export const generateSummary = (article: Article): string => {
  // Example of a more sophisticated summary generation
  const maxLength = 100; // Maximum length of the summary
  const summary =
    article.description.length > maxLength
      ? `${article.description.slice(0, maxLength)}...`
      : article.description;

  console.log("Generated Summary:", summary); // Log the summary
  return summary;
};

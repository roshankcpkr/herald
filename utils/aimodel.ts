import {
  CompletionParams,
  LlamaContext,
  initLlama,
} from "@pocketpalai/llama.rn";
import * as FileSystem from "expo-file-system";

class LlamaUtils {
  private context: LlamaContext | null = null;
  private isInitialized: boolean = false;

  private settings = {
    n_ctx: 1024,
    n_gpu_layers: 0,
    n_threads: 4,
    flash_attn: false,
    cache_type_k: "f16" as "f16",
    cache_type_v: "f16" as "f16",
    n_batch: 512,
    n_ubatch: 512,
    use_mlock: false,
    use_mmap: false,
  };

  async initialize() {
    if (this.isInitialized) return;

    try {
      console.log("Starting model initialization...");
      const modelName = "model.gguf";
      const modelPath = `${FileSystem.documentDirectory}${modelName}`;

      const modelExists = await FileSystem.getInfoAsync(modelPath);
      if (!modelExists.exists) {
        throw new Error("Model file not found at: " + modelPath);
      }

      console.log("Initializing with model at:", modelPath);
      console.log("Model file size:", modelExists.size);
      this.context = await initLlama({
        model: modelPath,
        ...this.settings,
      });

      if (!this.context) {
        throw new Error("Failed to initialize context");
      }

      this.isInitialized = true;
      console.log("Model initialized successfully");
    } catch (error) {
      console.error("Failed to initialize model nono:", error);
      this.isInitialized = false;
      this.context = null;
      throw error;
    }
  }

  async generateResponse(prompt: string): Promise<string | null> {
    try {
      if (!this.isInitialized || !this.context) {
        await this.initialize();
      }

      if (!this.context) {
        throw new Error("Context not initialized");
      }
      const stopWords = [
        "</s>",
        "<|end|>",
        "<|eot_id|>",
        "<|end_of_text|>",
        "<|im_end|>",
        "<|EOT|>",
        "<|END_OF_TURN_TOKEN|>",
        "<|end_of_turn|>",
        "<|endoftext|>",
      ];

      const completion = await this.context.completion({
        prompt: prompt,
        n_predict: 100,
        stop: [...stopWords, "</s>", "User:", "Assistant:", "Llama:"],
      } as CompletionParams);

      return completion.text.trim();
    } catch (error) {
      console.error("Error generating response:", error);
      return null;
    }
  }

  isModelInitialized(): boolean {
    return this.isInitialized && this.context !== null;
  }

  async releaseContext() {
    if (this.context) {
      await this.context.release();
      this.context = null;
      this.isInitialized = false;
      console.log("Context released successfully");
    }
  }
}

export const llamaUtils = new LlamaUtils();

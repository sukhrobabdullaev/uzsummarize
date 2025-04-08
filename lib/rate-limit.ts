import { useTranslations } from "next-intl";

interface VoiceUsageData {
  requests: { timestamp: number; type: "tts" | "stt" }[];
}


// Rate limit settings
const MAX_REQUESTS = 3; // Max 3 requests
const TIME_WINDOW = 6; // 6 hours

export const checkVoiceRateLimit = (
  type: "tts" | "stt"
): void => {
  const now = Date.now();

  const usageData: VoiceUsageData = JSON.parse(
    localStorage.getItem("voiceUsage") || '{"requests": []}'
  );

  // Filter out requests older than 6 hours
  usageData.requests = usageData.requests.filter(
    (req) => now - req.timestamp <= TIME_WINDOW * 60 * 60 * 1000
  );

  // Check if the limit is exceeded
  if (usageData.requests.length >= MAX_REQUESTS) {
    const oldestRequest = usageData.requests[0];
    const timeLeft =
      TIME_WINDOW * 60 * 60 * 1000 - (now - oldestRequest.timestamp);
    const hoursLeft = Math.ceil(timeLeft / (60 * 60 * 1000));

    throw new Error(
      t("rateLimit.exceeded", {
        maxRequests: MAX_REQUESTS,
        timeWindow: TIME_WINDOW,
        hoursLeft,
        plural: hoursLeft !== 1 ? "s" : "",
      })
    );
  }

  // Add the current request timestamp
  usageData.requests.push({ timestamp: now, type });
  localStorage.setItem("voiceUsage", JSON.stringify(usageData));
};

export const getRemainingRequests = (): number => {
  const now = Date.now();
  const usageData: VoiceUsageData = JSON.parse(
    localStorage.getItem("voiceUsage") || '{"requests": []}'
  );

  // Filter out requests older than 6 hours
  usageData.requests = usageData.requests.filter(
    (req) => now - req.timestamp <= TIME_WINDOW * 60 * 60 * 1000
  );

  // Update localStorage with filtered requests
  localStorage.setItem("voiceUsage", JSON.stringify(usageData));

  return Math.max(0, MAX_REQUESTS - usageData.requests.length);
};

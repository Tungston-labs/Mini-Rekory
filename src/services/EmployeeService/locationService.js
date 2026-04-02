export const getPlaceName = async (lat, lng) => {
  try {
    console.log(`🧭 getPlaceName: lat=${lat}, lng=${lng}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "MiniRekoryApp/1.0 (rekory2@gmail.com)",
        },
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      console.log("❌ Geocode API error:", response.status);
      return "Unknown Location";
    }

    const data = await response.json();

    return data?.display_name || "Unknown Location";

  } catch (error) {
    console.log(
      "❌ Geocode error:",
      error?.name === "AbortError" ? "timeout" : error
    );
    return "Unknown Location";
  }
};
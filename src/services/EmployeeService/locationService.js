export const getPlaceName = async (lat, lng) => {
  try {
    console.log(`🧭 getPlaceName: request lat=${lat} lng=${lng}`);
    // Reverse geocoding can hang under Doze/network restrictions.
    // Keep it bounded so the foreground loop can continue on schedule.
    const controller = new AbortController();
    const timeoutMs = 8000;
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        signal: controller.signal,
        headers: {
          "User-Agent": "attendance-app",
        },
      }
    );

    clearTimeout(timeout);

    if (!res.ok) {
      console.log("Geocode API error:", res.status);
      return "Unknown Location";
    }

    // ✅ SAFE parsing
    const data = await res.json();

    const place = data?.display_name || "Unknown Location";
    console.log("🧭 getPlaceName: response place=", place);
    return place;
  } catch (error) {
    // Fetch aborted or network failure.
    console.log(
      "Geocode error:",
      error?.name === "AbortError" ? "timeout" : error
    );
    return "Unknown Location";
  }
};
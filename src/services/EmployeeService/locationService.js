export const getPlaceName = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          "User-Agent": "attendance-app",
        },
      }
    );

    if (!res.ok) {
      console.log("Geocode API error:", res.status);
      return "Unknown Location";
    }

    // ✅ SAFE parsing
    const data = await res.json();

    return data?.display_name || "Unknown Location";
  } catch (error) {
    console.log("Geocode error:", error);
    return "Unknown Location";
  }
};
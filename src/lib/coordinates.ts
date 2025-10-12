/**
 * Utility functions for working with geographic coordinates
 */

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Validates if coordinates are valid
 */
export const isValidCoordinate = (lat: number | null, lng: number | null): boolean => {
  if (lat === null || lng === null) return false;
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};

/**
 * Formats coordinates for display
 */
export const formatCoordinates = (lat: number, lng: number): string => {
  return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
};

/**
 * Example coordinates for major cities in West Africa
 */
export const EXAMPLE_COORDINATES: Record<string, Coordinates> = {
  'Lomé, Togo': { latitude: 6.1319, longitude: 1.2228 },
  'Accra, Ghana': { latitude: 5.6037, longitude: -0.1870 },
  'Cotonou, Benin': { latitude: 6.3703, longitude: 2.3912 },
  'Lagos, Nigeria': { latitude: 6.5244, longitude: 3.3792 },
  'Abidjan, Ivory Coast': { latitude: 5.3600, longitude: -4.0083 },
  'Dakar, Senegal': { latitude: 14.6928, longitude: -17.4467 },
  'Bamako, Mali': { latitude: 12.6392, longitude: -8.0029 },
  'Ouagadougou, Burkina Faso': { latitude: 12.3714, longitude: -1.5197 },
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
export const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.latitude)) *
    Math.cos(toRad(coord2.latitude)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Get Google Maps URL for coordinates
 */
export const getGoogleMapsUrl = (lat: number, lng: number): string => {
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

/**
 * Parse coordinates from various string formats
 */
export const parseCoordinates = (input: string): Coordinates | null => {
  // Try different formats: "6.1319, 1.2228" or "6.1319,1.2228" or "6.1319 1.2228"
  const cleaned = input.trim().replace(/\s+/g, ' ');
  const parts = cleaned.split(/[,\s]+/);
  
  if (parts.length !== 2) return null;
  
  const lat = parseFloat(parts[0]);
  const lng = parseFloat(parts[1]);
  
  if (isNaN(lat) || isNaN(lng)) return null;
  if (!isValidCoordinate(lat, lng)) return null;
  
  return { latitude: lat, longitude: lng };
};


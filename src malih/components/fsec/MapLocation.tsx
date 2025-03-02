import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapLocationProps {
  address: string;
  onLocationChange: (lat: number, lng: number) => void;
}

export const MapLocation: React.FC<MapLocationProps> = ({ address, onLocationChange }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on Valenzuela City
    map.current = L.map(mapContainer.current).setView([14.690, 120.97], 25);

    // Add OpenStreetMap tiles (completely free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ''
    }).addTo(map.current);

    // Initialize marker
    marker.current = L.marker([14.690, 120.97], { draggable: true })
      .addTo(map.current);

    // Handle marker drag events
    marker.current.on('dragend', () => {
      const latLng = marker.current?.getLatLng();
      if (latLng) {
        onLocationChange(latLng.lat, latLng.lng);
      }
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  // Update marker position when address changes
  useEffect(() => {
    if (!map.current || !marker.current || !address) return;

    // Use OpenStreetMap Nominatim API for geocoding (free)
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`, {
      headers: {
        'Accept': 'application/json',
        'Accept-Language': 'en',
        'User-Agent': 'FSEC_Form_Application'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          const latLng = [Number(lat), Number(lon)] as [number, number];
          marker.current?.setLatLng(latLng);
          map.current?.setView(latLng, 25);
          onLocationChange(Number(lat), Number(lon));
        }
      })
      .catch(error => {
        console.error('Error fetching location:', error);
        const currentLatLng = marker.current?.getLatLng();
        if (currentLatLng) {
          onLocationChange(currentLatLng.lat, currentLatLng.lng);
        }
      });
  }, [address]);

  return (
    <div ref={mapContainer} className="w-full h-[450px] rounded-lg" />
  );
};
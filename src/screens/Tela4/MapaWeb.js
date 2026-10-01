
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import L from 'leaflet';

export default function MapaWeb({ semaforos, onSelect }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    // CSS do Leaflet sem imagens locais
    const style = document.createElement('style');

    style.innerHTML = `
      .leaflet-container {
        width: 100%;
        height: 100%;
        font-family: Arial, sans-serif;
        background: #ddd;
      }

      .leaflet-control-zoom {
        border: none !important;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }

      .leaflet-control-zoom a {
        background: white !important;
        color: #242B67 !important;
        border: none !important;
        font-weight: bold;
      }

      .leaflet-popup-content-wrapper {
        border-radius: 10px;
      }

      .leaflet-popup-content {
        margin: 12px 15px;
        font-size: 14px;
        line-height: 1.5;
      }

      .custom-marker {
        background: #242B67;
        width: 34px;
        height: 34px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.35);
      }

      .custom-marker span {
        display: block;
        transform: rotate(45deg);
        text-align: center;
        line-height: 28px;
        font-size: 17px;
      }
    `;

    document.head.appendChild(style);

    const map = L.map(containerRef.current).setView(
      [-24.4875, -47.8445],
      14
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      }
    ).addTo(map);

    semaforos.forEach((semaforo) => {
      // Marcador personalizado
      const icon = L.divIcon({
        className: '',
        html: `
          <div class="custom-marker">
            <span>🚦</span>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
        popupAnchor: [0, -34],
      });

      const marker = L.marker(
        [
          semaforo.latitude,
          semaforo.longitude,
        ],
        { icon }
      ).addTo(map);

      marker.bindPopup(`
        <strong>${semaforo.nome}</strong>
        <br />
        📍 ${semaforo.descricao}
        <br />
        🟢 ${semaforo.status}
        <br />
        <small>
          Latitude: ${semaforo.latitude}
          <br />
          Longitude: ${semaforo.longitude}
        </small>
      `);

      marker.on('click', () => {
        if (onSelect) {
          onSelect(semaforo);
        }
      });
    });

    mapRef.current = map;

    setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      map.remove();
      mapRef.current = null;

      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        ref={containerRef}
        style={styles.map}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 18,
    overflow: 'hidden',
    minHeight: 400,
  },

  map: {
    width: '100%',
    height: '100%',
    minHeight: 400,
  },
});

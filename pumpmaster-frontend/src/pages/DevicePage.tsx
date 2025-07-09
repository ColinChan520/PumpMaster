import { useEffect } from 'react';
import { useDeviceStore } from '../stores/deviceStore';

export default function DevicePage() {
  const { devices, loading, error, loadDevices } = useDeviceStore();

  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Device List</h1>
      {loading && <p>Loading ... </p>}
      {error && <p className="text-red-500">Error Message: {error}</p>}
      <ul className="space-y-2">
        {devices.map((d) => (
          <li key={d.id} className="p-3 bg-gray-100 rounded">{d.name}</li>
        ))}
      </ul>
    </div>
  );
}
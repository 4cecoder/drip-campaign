export function haversineDistanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
	const R = 6371;
	const dLat = degreesToRadians(b.lat - a.lat);
	const dLon = degreesToRadians(b.lng - a.lng);
	const lat1 = degreesToRadians(a.lat);
	const lat2 = degreesToRadians(b.lat);

	const sinDLat = Math.sin(dLat / 2);
	const sinDLon = Math.sin(dLon / 2);
	const aa = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
	const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));
	return R * c;
}

function degreesToRadians(degrees: number): number {
	return (degrees * Math.PI) / 180;
}


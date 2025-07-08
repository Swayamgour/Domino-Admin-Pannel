export const getUserLocation = async () => {
  try {
    if (!navigator.permissions || !navigator.geolocation) {
      throw new Error('Geolocation or Permissions API not supported');
    }

    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });

    // If permission is granted OR prompt, request location
    if (permissionStatus.state === 'granted' || permissionStatus.state === 'prompt') {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            reject(new Error('User denied location permission or error occurred'));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });
    } else {
      throw new Error('Location permission denied');
    }
  } catch (err) {
    throw err;
  }
};

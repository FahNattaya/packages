export default class Devices {
  public static connectCameraDevice(): Promise<MediaStream> {
    return new Promise<MediaStream>((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((val: MediaStream) => {
          resolve(val);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

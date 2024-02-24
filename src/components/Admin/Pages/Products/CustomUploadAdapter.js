// CustomUploadAdapter.js
export default class CustomUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  upload() {
    return this.loader.file
      .then((file) => {
        return new Promise((resolve, reject) => {
          this._convertFileToBase64(file)
            .then((base64) => {
              resolve({ default: base64 });
            })
            .catch(reject);
        });
      });
  }

  _convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

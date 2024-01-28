# m6numo

**m6numo** is a JavaScript package providing a class for simplified interaction with Amazon S3. This package allows you to upload, delete, and retrieve files from an S3 bucket.

## Installation

Install the package using npm:

```bash
npm install m6numo
```

# Usage

## Import

```javascript
import * as m6numo from "m6numo";
```

## Create an instance

```javascript
const myUploader = new m6numo(
  "your-bucket-name",
  "your-region",
  "your-access-key-id",
  "your-secret-access-key"
);
```

## Upload a file

```javascript
const fileBuffer = /* Buffer containing your file */;
const fileName = "example.jpg";
const mimetype = "image/jpeg";

myUploader.uploadFile(fileBuffer, fileName, mimetype)
  .then(result => console.log("File uploaded successfully:", result))
  .catch(error => console.error("Error uploading file:", error));

```

## Delete a file

```javascript
const fileNameToDelete = "example.jpg";

myUploader
  .deleteFile(fileNameToDelete)
  .then((result) => console.log("File deleted successfully:", result))
  .catch((error) => console.error("Error deleting file:", error));
```

## Upload a excel file

```javascript
const fileBuffer = /* Buffer containing your file */;
const fileNameToUpload = "example.xlsx";

myUploader
  .uploadExcel(fileBuffer, fileNameToUpload)
  .then((result) => console.log("File uploaded successfully:", result))
  .catch((error) => console.error("Error uploading file:", error));
```

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

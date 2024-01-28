const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { sharp } = require("sharp");

/**
 * @class
 * @classdesc Represents a class for uploading files to an S3 bucket.
 */
class m6NmO {
  /**
   * @param {string} bucketName - The name of the S3 bucket.
   * @param {string} region - The AWS region of the S3 bucket.
   * @param {string} accessKeyId - The AWS access key ID for authentication.
   * @param {string} secretAccessKey - The AWS secret access key for authentication.
   */
  bucketName;
  constructor(bucketName, region, accessKeyId, secretAccessKey) {
    if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
      throw new Error("All parameters are required.");
    }
    this.bucketName = bucketName;
    this.s3Client = new S3Client({
      region: region,
      credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      },
    });
  }

  /**
   * Uploads a file to the S3 bucket.
   *
   * @param {Buffer} fileBuffer - The content of the file to be uploaded.
   * @param {string} fileName - The name of the file in the S3 bucket.
   * @param {string} mimetype - The MIME type of the file.
   * @returns {Promise<Object>} - A promise that resolves to the result of the S3 upload operation.
   */
  async uploadFile(fileBuffer, fileName, mimetype) {
    const buffer = Buffer.from(fileBuffer.data);
    const img = await sharp(buffer)
      .resize({ height: 720, width: 1280, fit: "contain" })
      .toBuffer();
    const uploadParams = {
      Bucket: this.bucketName,
      Body: img,
      Key: fileName,
      ContentType: mimetype,
    };

    return this.s3Client.send(new PutObjectCommand(uploadParams));
  }

  /**
   * Uploads an Excel file to the S3 bucket.
   *
   * @param {any} fileBuffer - The content of the Excel file to be uploaded.
   * @param {string} fileName - The name of the file in the S3 bucket.
   * @returns {Promise<Object>} - A promise that resolves to the result of the S3 upload operation.
   */
  async uploadExcel(fileBuffer, fileName) {
    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: fileBuffer,
    };
    try {
      const result = await this.s3Client.send(
        new PutObjectCommand(uploadParams)
      );
      return result;
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      throw error; // Re-throw the error for handling at a higher level if needed
    }
  }

  /**
   * Deletes a file from the S3 bucket.
   *
   * @param {string} fileName - The name of the file in the S3 bucket to be deleted.
   * @returns {Promise<Object>} - A promise that resolves to the result of the S3 delete operation.
   */
  deleteFile(fileName) {
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileName,
    };

    return this.s3Client.send(new DeleteObjectCommand(deleteParams));
  }

  /**
   * Gets a signed URL for downloading an object from the S3 bucket.
   *
   * @param {string} key - The key (filename) of the object in the S3 bucket.
   * @returns {Promise<string>} - A promise that resolves to the signed URL for the object.
   */
  async getObjectSignedUrl(key) {
    const params = {
      Bucket: this.bucketName,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const seconds = 60; // Adjust the expiration time as needed
    try {
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: seconds,
      });
      return url;
    } catch (error) {
      console.error("Error generating signed URL:", error);
      throw error; // Re-throw the error for handling at a higher level if needed
    }
  }
}

module.exports = m6NmO;

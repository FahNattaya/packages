const mongooseFieldEncryptionLib = require('mongoose-field-encryption');
const crypto = require('crypto');

export class Util {
	decryptDataKey = function (masterKey: any, encryptedDataKey: any): string {
		const secret = crypto.createHash('sha256').update(masterKey).digest('hex').substring(0, 32);
		return mongooseFieldEncryptionLib.decrypt(encryptedDataKey, secret);
	};
}

import * as crypto from 'crypto';

export class SecurityUtils {
  static generateSecureRandomKey(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  static hashData(data: string, salt?: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(salt ? data + salt : data);
    return hash.digest('hex');
  }

  static maskSensitiveData(data: string, visibleChars = 4): string {
    if (data.length <= visibleChars) return data;
    return `${data.slice(0, visibleChars)}${'*'.repeat(data.length - visibleChars)}`;
  }
}

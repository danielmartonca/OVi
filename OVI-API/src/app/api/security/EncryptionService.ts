export class EncryptionService {
    public static hash(plaintext: string): string {
        try {
            //TODO
            return plaintext;
        } catch (e) {
            console.error(`Failed to hash plaintext. Reason: ${e}`);
            throw e;
        }
    }

    public static hashMatch(plaintext: string, hash: string): boolean {
        try {
            //TODO
            return true;
        } catch (e) {
            console.error(`Failed to check if hash matches plaintext. Reason: ${e}`);
            throw e;
        }
    }
}
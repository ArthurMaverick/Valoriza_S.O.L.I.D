export interface Decrypter {
  decrypter: (ciphertext: string) => Promise<string>
}

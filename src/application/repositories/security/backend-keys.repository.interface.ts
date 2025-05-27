export interface IBackendKeysRepository {
    generateBackendKey(): {key: string, encoded: string}
    validateBackendKey(value: string): Promise<boolean>
}
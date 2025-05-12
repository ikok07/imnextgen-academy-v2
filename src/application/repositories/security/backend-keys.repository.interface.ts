export interface IBackendKeysRepository {
    generateBackendKey(): string
    validateBackendKey(value: string): Promise<boolean>
}
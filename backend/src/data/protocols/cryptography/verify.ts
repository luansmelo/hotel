export interface Verify {
    verify: (token: string) => Promise<boolean>;
}
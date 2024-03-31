export interface HasherComparer {
    compare(value: string, digest: string): Promise<boolean>;
}
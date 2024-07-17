export interface File {
    fieldname: string;
    filename: string;
    originalname: string;
    encoding?: string;
    mimetype: string;
    buffer?: Buffer;
    size: number;
}
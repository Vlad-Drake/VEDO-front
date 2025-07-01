export type SignerId = string;
export type RowSigner = number;

export type SignerModel = {
    id: SignerId;
    //row: RowSigner;
    jobTitleId: number | null;
    email: string;
}
export type SignersRecord = Record<RowSigner, SignerModel>;
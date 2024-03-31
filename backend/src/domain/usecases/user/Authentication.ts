export interface AuthenticationModel {
    email: string;
    password: string;
}

export interface AuthenticatedUserModel {
    id: string;
    name: string;
    email: string;
    token: string;
    role: string;
}

export interface Authentication {
    auth(authenticationModel: AuthenticationModel): Promise<AuthenticatedUserModel | null>
}
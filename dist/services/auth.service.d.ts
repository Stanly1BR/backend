import type { LoginDTO, AuthResponseDTO, RegisterDTO } from '../schemas/auth.schema.js';
export declare class AuthService {
    Login(authData: LoginDTO): Promise<AuthResponseDTO>;
    Register(authData: RegisterDTO): Promise<AuthResponseDTO>;
}
//# sourceMappingURL=auth.service.d.ts.map
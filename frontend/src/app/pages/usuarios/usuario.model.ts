export class Usuario {
    constructor(
        public GUID?: string,
        public CODIGO?: number,
        public COD_PERFIL_USUARIO?: number,
        public PERFIL_USUARIO?: string,
        public NOME?: string,
        public EMAIL?: string,
        public SENHA?: string,
        public token?: string
      
    ){}
} 
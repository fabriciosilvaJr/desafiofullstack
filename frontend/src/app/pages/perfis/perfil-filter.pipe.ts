import { PipeTransform, Pipe } from '@angular/core';
import { Perfil } from './perfil.model';


@Pipe({
    name: 'perfilFilter'
})
export class PerfilFilterPipe implements PipeTransform {

    transform(perfis: Perfil[], searchTerm: string): Perfil[] {
        if (!perfis || !searchTerm) {
            return perfis;
        }
            
     return perfis.filter(perfil => 
        JSON.stringify(perfil.CODIGO).toLowerCase().includes(searchTerm) ||
        (perfil.DESCRICAO).toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(perfil.PERFIL).toLowerCase().includes(searchTerm.toLowerCase())|| 
        JSON.stringify(perfil.SITUACAO  == 'A' ? 'Ativo' : 'Inativo').toLowerCase().includes(searchTerm.toLowerCase())
        
        ); 
    }
}

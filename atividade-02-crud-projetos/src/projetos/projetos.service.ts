import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjetoDto } from './dto/create-projeto.dto';
import { UpdateProjetoDto } from './dto/update-projeto.dto';
import { Projeto } from './entities/projeto.entity';

@Injectable()
export class ProjetosService {
  private projetos: Projeto[] = [
    { id: 1, nome: 'TCC', descricao: 'Pesquisa e escrita do trabalho de conclusão', cor: 'roxo' },
    { id: 2, nome: 'Academia', cor: 'vermelho' },
  ];
  private proximoId = 3;

  findAll(): Projeto[] {
    return this.projetos;
  }

  findOne(id: number): Projeto {
    const encontrado = this.projetos.find((projeto) => projeto.id === id);
    if (!encontrado) {
      throw new NotFoundException('Projeto não encontrado');
    }
    return encontrado;
  }

  create(dto: CreateProjetoDto): Projeto {
    const projeto: Projeto = { id: this.proximoId++, ...dto };
    this.projetos.push(projeto);
    return projeto;
  }

  update(id: number, dto: UpdateProjetoDto): Projeto {
    const projeto = this.findOne(id);
    Object.assign(projeto, dto);
    return projeto;
  }

  remove(id: number): void {
    this.findOne(id);
    this.projetos = this.projetos.filter((projeto) => projeto.id !== id);
  }
}

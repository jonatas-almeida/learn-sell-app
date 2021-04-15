import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/interfaces/Cursos';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cursos: any[];
  curso: any;
  cursoId: any;
  cursosForm: FormGroup;

  constructor(private cursoService: CursoService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.validation();
    this.getCursos();
  }

  validation(): void{
    this.cursosForm = this.fb.group({
      course_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      course_price: ['', [Validators.required]],
      course_description: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  goToDetails(curso: Cursos){
    this.cursoId = curso;
    localStorage.setItem('cursoId', this.cursoId);
    this.router.navigateByUrl("/cursos-details");
  }

  getCursos(): void{
    this.cursoService.getCursos().subscribe(
      (response) => {
        this.cursos = response.reverse();
      }, error => {
        throw error;
      }
    )
  }

  addCurso(): void{
    if(this.cursosForm.valid){
      this.curso = Object.assign({}, this.cursosForm.value);

      this.cursoService.postCurso(this.curso).subscribe(
        (novoCurso: Cursos) => {
          this.getCursos();
          //alert(`Curso adicionado com sucesso: ${novoCurso.course_name}`);
        }, error => {
          throw error;
        }
      )
    }
    else{
      if(!this.cursosForm.valid) alert('Preencha os campos antes de inserir!');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cursos } from 'src/app/interfaces/Cursos';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-cursos-details',
  templateUrl: './cursos-details.component.html',
  styleUrls: ['./cursos-details.component.scss']
})
export class CursosDetailsComponent implements OnInit {

  cursoDetails: any = {};
  cursoUpdate: any;
  openFormState = false;
  cursosEditForm: FormGroup
  cursoId = localStorage.getItem('cursoId');

  constructor(private cursoService: CursoService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getCursoDetails();
    this.validation();
  }

  validation(): void{
    this.cursosEditForm = this.fb.group({
      course_name: ['', Validators.required],
      course_price: ['', Validators.required],
      course_description: ['', Validators.required]
    })
  }

  openForm(){
    this.openFormState = true;
  }

  closeForm(){
    this.openFormState = false;
  }

  getCursoDetails(): void{
    if(localStorage.getItem('cursoId')){
      this.cursoService.getCurso(this.cursoId).subscribe(
        (response) => {
          this.cursoDetails = response;
        }
      )
    }
    else{
      this.router.navigateByUrl("/home");
    }
  }

  updateCurso(){
    if(this.cursosEditForm.valid){
      this.cursoUpdate = Object.assign({}, this.cursosEditForm.value);

      this.cursoService.putCurso(this.cursoId, this.cursoUpdate).subscribe(
        () => {
          alert("Curso atualizado");
          this.getCursoDetails();
          this.closeForm();
        }, error => {
          throw error
        }
      )
    }
    else{
      alert("Preencha os campos corretamente e tente de novo");
    }
  }

  removeCurso(): void{
    this.cursoService.deleteCurso(this.cursoId).subscribe(
      () => {
        alert(`Curso excluído: ${this.cursoDetails.course_name}`);
        this.router.navigateByUrl("/home");
        localStorage.removeItem('cursoId');
      }, error => {
        throw error;
      }
    )
  }

}

import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../servicios/login.service';
import { LoginInDTO } from '../../dto/inputs/login.in.dto';
import { ResponseDTO } from '../../dto/response.dto';
import { AuthService } from '../../servicios/auth.service';
import { AuthResponseDTO } from '../../dto/auth-response.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginService = inject(LoginService);

  authService = inject(AuthService);

  router = inject(Router);

  constructor(private formBuilder: FormBuilder) {

  }


  formulario = this.formBuilder.group(
    {
      username: ["admin@gmail.com"],
      password: ["12345678"]
    }
  );

  public login(): void {

    let login: LoginInDTO = this.formulario.value as LoginInDTO;

    this.loginService.login(login).subscribe(
      {
        next: (respuesta: ResponseDTO) => {
          if (respuesta.status && respuesta.codeStatus === 200) {
            //console.log(respuesta);
            const authResponseDTO: AuthResponseDTO = respuesta.data;
            this.authService.addAuthResponseDTO(authResponseDTO);
            this.router.navigate(['productos']);
          }
        }
      }
    );
  }

}

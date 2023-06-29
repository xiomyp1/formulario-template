import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contact, PhoneType } from 'src/app/contact.model';
import { ContactsService } from 'src/app/contacts.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public model: Contact = new Contact(0,'', 'assets/th.jpg', [], )
  public readonly phoneType: string[] = Object.values(PhoneType) //va agarrar todos los valores mobile, home, work.
  @ViewChild('contactForm') contactForm:NgForm

  constructor(
    private contactsService: ContactsService
  ) {}

  ngOnInit() {
  }

  addContact(){
    //Llamamos al metodo addContact con el modelo actual.
    this.contactsService.addContact(this.model);
    //le pasamos la propiedad model para vaciar el formulario.
    this.model = new Contact(0,'');
    this.contactForm.reset();
  }

  addNewPhoneToModel(){
    //Agregar nuevos numeros al objeto
    this.model.phones.push({type: null, number: null});
  }

  addImage(event){
    // me devuelve una archivo que esta en event.target.file en posicion 0 el archivo lo tengo ahora en file
    const file = event.target.files[0];
    // queremos mostrar la img recibida, esto lo podemos hacer leyendo la imagen con la clase de fileReader JS 
    const reader = new FileReader();
    //Aquí lo que voy a hacer es cargar el contenido del archivo como una U R.L en base64 y le pasa el archivo
    reader.readAsDataURL(file);
    //carga el archivo en el onLoad definimos una funcion y pasamos esa img lo que hago es pasar esa imagen codificada base a 64 a la propiedad Picho del modelo
    reader.onload = (evt) => {
      this.model.picture = <string>reader.result;
    }
  }

}

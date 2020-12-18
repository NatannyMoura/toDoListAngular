import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode ='list';
  public todos: Todo[] = [];
  public title:string = 'Minhas tarefas';

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required
      ])]
    })
}

ngOnInit() {
  this.load();
}

  add(){
    const title = this.form.controls['title'].value;
    const id = this.todos.length +1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset();
  }

  remove(item:Todo) {
    const index = this.todos.indexOf(item);
    if(index != -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(item:Todo) {
    item.done = true;
    this.save();
  }

  markAsUndone(item) {
    item.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if(data){
    this.todos = JSON.parse(data)
  } else {
    this.todos = [];
  }
}

changeMode(mode:string) {
  this.mode = mode;
}
}
import { Component, OnInit } from '@angular/core';
import { TodoService, TodoItem } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodo: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const todo: TodoItem = { id: 0, name: this.newTodo, isComplete: false };
      this.todoService.addTodo(todo).subscribe(newTodo => {
        this.todos.push(newTodo);
        this.newTodo = '';
      });
    }
  }

  toggleComplete(todo: TodoItem): void {
    // todo.isComplete = !todo.isComplete;
    todo.isComplete = todo.isComplete;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteTodo(todo: TodoItem): void {
    this.todoService.deleteTodo(todo.id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }
}

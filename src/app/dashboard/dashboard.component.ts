import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  array:any
  project:any={}
  p:any;
  assignments:any
todoList:any
todoListTask:any
complete:any
progress:any
assignment_id:any
 

  constructor(private user:UserserviceService,private router:Router) { }

  ngOnInit(): void {
    this.add()
    
  
  }
  arrdata: any
  add(){
    debugger;
    this.user.getData().subscribe((data:any) =>{
     this.array=data
     console.log(this.array.data)
     this.arrdata = this.array.data
     this.todoList = this.arrdata.filter((item:any) => item.assignment_name === 'To Do')
     this.complete = this.arrdata.filter((item:any) => item.assignment_name === 'Completed')
     this.progress = this.arrdata.filter((item:any) => item.assignment_name === 'Inprogress')
   
     console.log('ToDoList',this.todoList)
   console.log('Complete',this.complete)
   console.log('Progress',this.progress)
    })
  }
  getKey(data:any,id:any){
    debugger;
    localStorage.setItem('assignment_name',data)
    localStorage.setItem('assignment_id',id)
    this.router.navigate(['detail'])
  }
}


import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  arr: any = []
  taskArr: any
  lineData: any
  activeId: any
  array1: any
  array: any
  name: any
  taskData: any
  task!: FormGroup
  line!: FormGroup
  editTask!: FormGroup
  editLine!: FormGroup
  lol:any=[]
  apt:any=[]
  sum:any=0

  constructor(private serve: UserserviceService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.task = this.fb.group({
      task_name: ['', Validators.required],
      assignment_id: [0],
      created_by: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.editTask = this.fb.group({
      task_name: ['', Validators.required],
      assignment_id: [0],
      created_by: ['', Validators.required],
      description: ['', Validators.required]
    })

    this.line = this.fb.group({
      lineitem_name: ['', Validators.required],
      task_id: [0],
      created_by: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    })

    this.editLine = this.fb.group({
      lineitem_name: ['', Validators.required],
      task_id: [0],
      created_by: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', Validators.required]
    })

    this.name = localStorage.getItem('assignment_name')
    this.collect()
    
  }
  

 
  total:any
  collect() {
    debugger
    this.serve.getData().subscribe((data: any) => {
      this.array1 = data.data
      this.array = this.array1.filter((item: any) => {
        if (item.assignment_name === this.name) {
          this.taskData = item.tasks
        }
      })
      console.log(this.taskData)
     
      for(let j=0;j<this.taskData.length;j++){
      for(let i=0;i<this.taskData[j].lineitems.length;i++){
        this.lol=this.taskData[j].lineitems[i].amount
        
        this.total=parseInt(this.lol)
        this.sum=this.sum+this.total
        
      }
      this.taskData[j].total=this.sum;
      this.sum=0;
      
    }
      // console.log(this.lineData)
      console.log("hello",this.taskData);
      this.taskArr=this.taskData[0]
    })
  }
  getTaskData(data: any, index: any) {
    debugger
    this.taskArr = data
    this.lineData = data.lineitems
    
    
  }


  // amount(lineitems:any){
  //   let sum = 0
  //   sum = lineitems.reduce((first:any,next:any)=>{
  //     return first+parseInt(next.amount===null || next.amount==="" ? 0: next.amount)
  //   },0)
  //   return sum
  // }
  getActive(active: any) {
  debugger
    this.activeId = active
  }
  active_id: any
  pull:any
  onclick(){
    debugger
     this.pull=this.taskArr
    console.log('sun',this.pull)

  }
  getactive(active: any) {
    debugger
    this.active_id = active
    this.onclick
  }
  lineClick: any
  getLineData(data: any) {
    debugger;
    console.log(data)
    console.log(data.amount)
    this.lineClick = data
    console.log('fool', this.lineClick)
  }
  taskRes: any
  addTask() {
    debugger
    if (this.task.invalid) {
      alert('Please fill required fields')
      return
    }
    let body = {
      "assignment_id": localStorage.getItem('assignment_id'),
      "task_name": this.task.value.task_name,
      "created_by": this.task.value.created_by,
      "description": this.task.value.description,
    }
    this.serve.addTask(body).subscribe((item: any) => {
      this.taskRes = item
      if (this.taskRes.status === 1) {
        alert(this.taskRes.message)
        this.task.reset()
        this.collect()
      }
      else {
        alert(this.taskRes.message)
      }
      this.taskArr=this.taskData[0]
    })
    

  }
  editRes: any
  taskEditSave() {
    debugger;
    if (this.editTask.invalid) {
      alert('Please fill required fields')
      return
    }
    let body = {
      "id": this.taskArr.id,
      "task_name": this.editTask.value.task_name,
      "created_by": this.editTask.value.created_by,
      "description": this.editTask.value.description,
    }
    this.serve.editTask(body).subscribe((result: any) => {
      this.editRes = result
      if (this.editRes.status === 1) {
        alert(this.editRes.message)
        this.editTask.reset()
        this.collect();
        this.taskData;
      }
      else {
        alert(this.editRes.message)

      }
    })
  }
  onEditTask() {
    debugger;
    this.editTask.patchValue({
      task_name: this.taskArr.task_name,
      created_by: this.taskArr.created_by,
      description: this.taskArr.description,
    });
  }
  route() {
    this.router.navigate(['dash'])
  }
  editLineRes: any
  editLineSave() {
     debugger
    let body = {
      "id": this.lineClick.id,
      "lineitem_name": this.editLine.value.lineitem_name,
      "created_by": this.editLine.value.created_by,
      "description": this.editLine.value.description,
      "amount": this.editLine.value.amount
    }
    this.serve.editLine(body).subscribe((result: any) => {
      this.editLineRes = result
      if (this.editLineRes.status === 1) {
        alert(this.editLineRes.message)
        this.editLine.reset();
        this.collect();
      }
      else {
        alert(this.editLineRes.message)
      }
    })
  }
  lineRes: any
  addLine() {
     debugger
    let body = {
      "task_id": this.taskArr.id,
      "lineitem_name": this.line.value.lineitem_name,
      "created_by": this.line.value.created_by,
      "description": this.line.value.description,
      "amount": this.line.value.amount
    }
    this.serve.addItems(body).subscribe((item: any) => {
      this.lineRes = item
      console.log('shit',this.lineRes)
      if (this.lineRes.status === 1) {
        alert(this.lineRes.message)
        this.line.reset();
        this.collect();
        this.lineData.push(body)
      }
      else {
        alert(this.lineRes.message)
      }
      this.taskArr=this.taskData[0]
    })
  }
  onEditLine() {
    this.editLine.patchValue({
      lineitem_name: this.lineClick.lineitem_name,
      created_by: this.lineClick.created_by,
      description: this.lineClick.description,
      amount: this.lineClick.amount
    })
  }
}

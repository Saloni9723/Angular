import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserserviceService } from 'src/app/userservice.service';


@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  @Input() lineData!: any;

  @Input() taskArr!:any;
  line!: FormGroup
  editLine!: FormGroup
  arr: any = []
  // taskArr: any
  // lineData: any
  activeId: any
  array1: any
  array: any
  name: any
  taskData: any
  task!: FormGroup
 
  editTask!: FormGroup
 
  lol:any=[]
  apt:any=[]
  sum:any=0

  constructor(private fb: FormBuilder,private serve: UserserviceService) { }

  ngOnInit(): void {
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
    this.collect();
  }

 

  total:any
  mond:any
  collect() {
    debugger
    this.serve.getData().subscribe((data: any) => {
      this.array1 = data.data
      console.log('pun',this.array1)
      this.array = this.array1.filter((item: any) => {
        if (item.assignment_name === this.name) {
          this.taskData = item.tasks
          this.lineData= this.taskData.lineitems
          console.log(this.lineData)

    


        }
      })
     
     
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
  lineClick: any
 
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
      console.log('edithai', this.editLineRes)
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
  getactive(active: any) {
    debugger
    this.activeId= active
    this.onclick
  }
  
  getLineData(data: any) {
    console.log(data)
    console.log(data.amount)
    this.lineClick = data
  }
  pull:any
  onclick(){
    debugger
     this.pull=this.taskArr
    console.log(this.taskArr)

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
     if (this.lineRes.status === 1) {
       alert(this.lineRes.message)
       this.line.reset();
        //this.lineData.push(body)
      //  this.serve.addItems(body).subscribe((items:any)=>{
      //    this.lineData=items.lineitems[0]
      //    console.log('naveen',this.lineData)
      //    this.collect();
      //  })
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

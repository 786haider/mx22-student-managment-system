import inquirer from "inquirer";

import chalk from "chalk";

class student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.id = student.counter++;
    this.name = name;
    this.courses = [];
    this.balance = 100;
  }
  //Method to enroll a student im a course
  enroll_course(course: string) {
    this.courses.push(course);
  }
  // Method to view student balance
  view_balance() {
    console.log(
      chalk.green.bold.italic`Blanace for ${this.name} : $${this.balance}`
    );
  }
  // Method to pay student fees
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(
      chalk.green.bold.italic(
        `$${amount} Fees paid successfully for ${this.name} :  ${this.balance}`
      )
    );
  }
  //   Method to display student status
  show_status() {
    console.log(chalk.green.bold.italic(`ID:${this.id}`));
    console.log(chalk.green.bold.italic(`Name:${this.name}`));
    console.log(chalk.green.bold.italic(`Courses:${this.courses}`));
    console.log(chalk.green.bold.italic(`Balance:${this.balance}`));
  }
}
// Student manager class to manage student
class student_manager {
  students: student[];

  constructor() {
    this.students = [];
  }

  //method to add a new student
  add_new_student(name: string) {
    let newStudent = new student(name);
    this.students.push(newStudent);
    console.log(
      chalk.yellowBright.bold.italic(
        `Student: ${name} added successfully. Student ID : ${newStudent.id}`
      )
    );
  }
  // Method to enroll a student in a course
  enroll_student(student_id:number,course:string){
    let student = this.find_student(student_id); 
         if(student){
         student.enroll_course(course)
         console.log(chalk.yellow.bold.italic(`${student.name}: enrolled in ${course} successfully`)); 
     if(student_id != student_id){
      console.log(chalk.red.bold.italic("Enter a correct ID"));
      
     }
        }
  }

  // Method to view  a student balance
  view_student_balance(student_id: number){
     let student =this.find_student(student_id);
     if(student){
      student.view_balance()
     }
     else{
      console.log(chalk.red.bold.italic("Student not found ! Plz enter acorrect student id"));
      
     }
  }
//  Method to pay student fess
pay_student_fees(student_id:number , amount: number){
  let student =this.find_student(student_id);
  if(student){
    student.pay_fees(amount)
  }
  else{
    console.log(chalk.red.bold.italic("Student not found ! Plz enter acorrect student id"));
    
}
}

// Method to display student status
show_student_status(student_id: number){
  let student =this.find_student(student_id);
  if(student){
    student.show_status
  }
}

  // Method to find a student by student id
  find_student(student_id:number){
    return this.students.find(std => std.id ===student_id);
  }
}

// Main function to run the program
async function main(){
  console.log(chalk.magentaBright.overline.bold.italic(
    "\n\t Wellcome to mx22-Student-Managment-System: {Made By Haider Hussain}  \n\t"
  ));

  console.log("-".repeat(50));
  
  let Student_manager= new student_manager();
  
  //while loop tp keep program running
  while(true){
    let choice = await inquirer.prompt([
       {
       name:"choice",
       type:"list",
       message: "Select an option",
       choices:[
        "Add Student",
        "Enroll Student",
        "View Student Balance",
        "Pay Fees",
         "Show Status",
         "Exit"
       ]  
      }
    ]) 
    // Using switch case to handle user choice
    switch(choice.choice){
      case "Add Student" :
      let name_input= await inquirer.prompt([
       { 
        name:"name",
        type:"input",
        message:"Enter A Student name"
      }
      ]);

      Student_manager.add_new_student(name_input.name);
      break;
      case "Enroll Student":
        let course_input= await inquirer.prompt([
          {
            name:"student_id",
            type:"number",
            message:"Enter a student ID",
          },
  
          {
            name:"course",
            type:"input",
            message:"Enter a course name",
          }

        ]);
       Student_manager.enroll_student(course_input.student_id, course_input.course);
       break;
      case "View Student Balance":
        let balance_input=await inquirer.prompt([
          {
            name:"student_id",
            type:"number",
            message:"Enter a student ID",
          }
        ]);
        Student_manager.view_student_balance(balance_input.student_id);
        break;
        case "Pay Fees":
          let fees_pay= await inquirer.prompt([
            {
              name:"student_id",
              type:"number",
              message:"Enter a student ID",
            },
            {
              name:"amount",
              type:"number",
              message:"Enter the amount to pay",
            }
          ]);
          Student_manager.pay_student_fees(fees_pay.student_id, fees_pay.amount);
          break;
       case "Show Status" :
        let status_show = await inquirer.prompt([
          {
             name:"student_id",
             type:"number",
             message:"Enter a student ID",            
          }
        ]);
        Student_manager.show_student_status(status_show.student_id);
        break;
        case "Exit":
          console.log(chalk.blueBright.bold.italic("Exiting..........."));
          process.exit();
    }
  }  
}

// Calling a main function
main();




















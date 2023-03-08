import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { addDays } from 'date-fns';
import { EventColor } from 'calendar-utils';
import { MilestoneService } from 'src/app/services/milestone.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TaskDetailsService } from 'src/app/services/task-details.service';
import { forkJoin } from 'rxjs';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-tile.component.html',
  styleUrls: ['./calendar-tile.component.scss']
})
export class CalendarTileComponent implements OnInit {

  
  milestones=[];
  milestoneList:any;
  tasksList:any;
  constructor(
    private service:MilestoneService,
    private taskService: TaskDetailsService,
    private spinner: NgxSpinnerService) { }
    
    ngOnInit(): void {
      this.getMilestoneData();
    }
    
  getAllMilestones$ = this.service.getAllMilestones();
  getAllTasks$ = this.taskService.getTasksList();

  getMilestoneData(){
    this.spinner.show('calendar-tile');
    forkJoin(this.getAllMilestones$,this.getAllTasks$).subscribe(
      ([milestoneList,tasksList])=>{
        this.spinner.hide('calendar-tile');
        this.milestones = [];
        this.milestoneList = milestoneList;
        this.tasksList = tasksList;
        if(this.milestoneList?.length > 0){
          this.milestoneList.forEach(mile=>{
            this.milestones.push({
              start: new Date(mile.milestoneDate),
              title: mile.name + " - " + mile.description,
              actions: this.actions,
              color: { ...colors.yellow }
            });
          })
        }

        if(this.tasksList?.length > 0){
          this.tasksList.forEach(task=>{
            this.milestones.push({
              start: new Date(task.taskETC),
              title: task.taskName + " - " + task.subTaskName,
              actions: this.actions,
              color: { ...colors.blue }
            });
          })
        }
        if(this.milestones.length>0){
          this.events = this.milestones;
        }
      },err=>{
        this.spinner.hide('calendar-tile');
      }
    );
  }

  viewDate: Date = new Date();
  viewD: CalendarView = CalendarView.Month;
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
       // this.handleEvent('Deleted', event);
      },
    },
  ];

  events = [
    // {
    //   start: (new Date()),
    //   title: 'Project 1 Code Drop',
    //   color: { ...colors.yellow },
    //   actions: this.actions,
    // },
    // {
    //   start: addDays(new Date(), 5),
    //   title: 'Project 2 Code Drop',
    //   //color: { ...colors.yellow },
    //   actions: this.actions,
    // },
  ];

  activeDayIsOpen: boolean = true;
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}

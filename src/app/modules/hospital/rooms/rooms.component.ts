import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/HospitalMapServices/room.service';
import { fabric } from 'fabric';
import { Group, Rect } from 'fabric/fabric-impl';
import {Building} from "../model/building.model";
import { Floor } from '../model/floor.model';
import { BuildingService } from '../services/HospitalMapServices/building.service';
import { FloorService } from '../services/HospitalMapServices/floor.service';
import { GroomService } from '../services/HospitalMapServices/groom.service';
import { GRoom } from '../model/groom.model';
import { forkJoin } from 'rxjs';
import {RoomMergingRequest} from "../model/RoomMergingRequest";
import {RoomMergingResponse} from "../model/RoomMergingResponse";
import {RoomSplitingRequest} from "../model/RoomSplitingRequest";
import {RoomSplitingResponse} from "../model/RoomSplitingResponse";
import {RoomEquipment} from "../model/roomEquipment";
import {RoomEquipmentService} from "../services/HospitalMapServices/roomequipment.service";
import {
  DateRange,
  EquipmentMovementAppointmentResponse,
  EquipmentMovementAppointmentRequest,
  Appointment,
} from 'src/app/api/api-reference';
import {EquipmentMovementService} from "../services/equipmentMovement.service";
import {OrderedTenderBlood, TenderOffer, TenderWithId} from "../model/tender.model";
import {TenderService} from "../services/tender.services";
import {BloodTypeToString} from "../blood-units/blood-units.component";
import {Chart} from "chart.js";
import {ChartType} from "chart.js";
import {MatLabel} from "@angular/material/form-field";
import { NgChartsModule } from 'ng2-charts';
//import _default from "chart.js";
//import numbers = _default.defaults.animations.numbers;

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {






//Show Equipment
  displayedColumns: string[] = [ 'amount', 'equipmentName',  'Edit'];
    public equipment = new MatTableDataSource<RoomEquipment[]> ;

   //For  Displaying Searched Equipment
  Searchedequipment = new MatTableDataSource<RoomEquipment[]> ;
  displayedColumns2: string[] = [ 'roomId', 'equipmentName', 'amount'];

  ////For  Displaying Moved Equipment amount
  MovedEquipment = new MatTableDataSource<EquipmentMovementAppointmentResponse[]> ;
  displayedColumns3: string[] = [ 'amount', 'equipmentName', 'startDate','endDate', 'DestinationRoom', 'OriginalRoom','Delete'];
  public izabran : any ; // for splicing MovedEquip matTable


  ////For  Displaying Moved Equipment amount
  shownAppointment = new MatTableDataSource<Appointment[]> ;
  displayedColumns4: string[] = [ 'emergent', 'startDate', 'endDate','doctorId','Delete'];
  public izabran2 : any ; // for splicing appointment matTable

  public chart: any;

  ////For  Displaying Room Spltting
  shownRenovation = new MatTableDataSource<RoomSplitingResponse[]> ;   ///ZAMENI APPOINTMENT
  displayedColumns5: string[] = [ 'RoomId', 'StartDate', 'EndDate','newRoomName','Delete'];
  public izabran3 : any ; // for splicing appointment matTable


  ////For  Displaying Room Spltting and Merging
  shownMerging = new MatTableDataSource<RoomMergingResponse[]> ;   ///ZAMENI APPOINTMENT
  displayedColumns6: string[] = [ 'Room1Id', 'Room2Id', 'DateRangeStart','DateRangeEnd','Delete'];
  public izabran4 : any ; // for splicing appointment matTable


////
  displayedColumnsTendersHistory: string[] = ['Type','Amount','Date', 'Price'];
  public mojaproba = new MatTableDataSource<OrderedTenderBlood>();


  public podaciTendera = new MatTableDataSource<TenderWithId[]>;
  zatvorenTender:string[]=['bloodUnitAmount', 'price', 'bloodType']

////

  //SELECTED
  public selectedBuilding: Building = new Building();
  public selectedFloor: Floor = new Floor();
  public selectedRoom: Room = new Room();
  public selectedRoomEquipment : RoomEquipment = new RoomEquipment();



  //ROOM EDIT
  public editBuildingName: string = '';
  public editFloorName: string = '';
  public editRoomName: string = '';



  //ROOM SEARCH
  public findThisRoom: string = '';



  //CONSTS
  floorLenght = 20;
  floorWidth = 15;
  squareSize= 30;

  //ALL DATA
  public allBuildings: Building[] = [];
  public allFloors: Floor[] = [];
  public allRooms: Room[] = [];
  public allGRooms: GRoom[] = [];


  public allRoomEquipments: RoomEquipment[] = [];

  //FOR VISUALISATION, FABRIC.JS
  public allRoomsGroups: Group[] = [];
  public allSquares: Rect[] = [];
  public allGreenSquares: Rect[]  =[];
  canvas: any;

  //NZM STA JE OVO NI DA LI TREBA
  public dataSource = new MatTableDataSource<Room>();
 // public displayedColumns = ['number', 'floor', 'update', 'delete'];
  shownRoom = false;  ///DA PRIKAZE SOBU KAD SE KLIKNE NA OBJEKAT SOBE
  shownEquipment =false; //za prikazivanje sobe


  //LOADING
  buildingsLoaded:boolean = false;
  floorsLoaded:boolean = false;
  roomsLoaded:boolean = false;
  groomsLoaded:boolean = false;


  //UPDATING
  buildingUpdating:boolean = false;
  floorUpdating:boolean = false;
  roomUpdating:boolean = false;

  //EQUIPMENT MOVEMENT
  displayedColumnsMovement: string[] = [ 'equipmentName', 'from', 'to', 'Schedule'];
  displayRoomRenovation: string[] = [ 'from', 'to', 'Schedule'];
  currentEquipmentResponsesTable = new MatTableDataSource<EquipmentMovementAppointmentResponse[]> ;
  currentRoomMergingResponsesTable = new MatTableDataSource<RoomMergingResponse[]> ;
  currentRoomSplitingResponsesTable = new MatTableDataSource<RoomSplitingResponse[]> ;
  tabNumber: number = 0;
  roomSplitingtabNumber:number =0;
  roomMergingtabNumber:number = 0;
  currentEquipmentRequest: EquipmentMovementAppointmentRequest = new EquipmentMovementAppointmentRequest();
  currentRoomMergingRequest: RoomMergingRequest = new RoomMergingRequest();
  currentRoomSplitingRequest: RoomSplitingRequest = new RoomSplitingRequest();
  currentEquipmentResponses: EquipmentMovementAppointmentResponse[] = [];
  currentRoomMergingResponses: EquipmentMovementAppointmentResponse[] = [];
  currentRoomSplitingResponses: EquipmentMovementAppointmentResponse[] = [];
  formDays: number = 0;
  formHours: number = 0;
  formMinutes: number = 0;
  formStartDate: Date = new Date();
  formEndDate: Date = new Date();
  formSelectedRoomId: string = '';

  constructor(private equipmentMovementService:EquipmentMovementService, private roomService: RoomService, private buildingService: BuildingService, private groomService: GroomService, private floorService: FloorService, private roomEquipmentService :RoomEquipmentService, private tenderService: TenderService , private router: Router) { }

  ngOnInit(): void
  {
    this.setInitialSquares();
    this.reloadAllInfo();
    this.SearchEquipment(); //Poziva fju za dobavljanje soba
    this.getTendere();
  this.createChart();
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ],
        datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  getFloorNameByFloorId(id:string): string
  {
    let name = '';
    this.allFloors.forEach(element => {
      if(element.id === id)
      {
        name = element.name;
      }
    });

    return name;
  }

  getBuildingNameByBuildingId(id:string): string
  {
    let name = '';
    this.allBuildings.forEach(element =>
    {
      if(element.id === id)
      {
        name = element.name;
      }

    });

    return name;
  }

  private reloadAllInfo()
  {

    this.allBuildings = [];
    this.allFloors = [];
    this.allRooms = [];
    this.allGRooms = [];
    this.allRoomEquipments=[]

    this.clearRooms();

    this.buildingsLoaded = true;
    this.floorsLoaded = true;
    this.roomsLoaded = true;
    this.groomsLoaded = true;
    //this.roomequipmentLoaded =true;



    forkJoin([this.buildingService.getBuildings(), this.floorService.getFloors(), this.roomService.getRooms(), this.groomService.getGRooms()])
    .subscribe((result => {
      this.allBuildings = result[0];
      this.allFloors = result[1];
      this.allRooms = result[2];
      this.allGRooms = result[3];
      this.checkIfAllLoadedAndProccesIt();
    }))
  }

  checkIfAnythingNeedsUpdate()
  {
    if(!(this.editBuildingName === this.selectedBuilding.name))
    {
      this.selectedBuilding.name = this.editBuildingName;
      this.updateBuilding(this.selectedBuilding);
    }

    if(!(this.editFloorName === this.selectedFloor.name))
    {
      this.selectedFloor.name = this.editFloorName;
      this.updateFloor(this.selectedFloor);
    }

    if(!(this.editRoomName === this.selectedRoom.name))
    {
      this.selectedRoom.name = this.editRoomName;
      this.updateRoom(this.selectedRoom);
    }
  }

  private checkIfAllLoadedAndProccesIt()
  {
    if(this.checkIfAllLoaded())
    {
      this.loadEverythingIntoEverything();
    }
  }

  private checkIfAllLoaded(): boolean
  {
    return (this.roomsLoaded && this.groomsLoaded && this.buildingsLoaded && this.floorsLoaded);
  }

  private isStillUpdating(): boolean
  {
    return (this.buildingUpdating && this.floorUpdating && this.roomUpdating);
  }

  private loadEverythingIntoEverything()
  {
    this.loadGroomsToRooms(this.allGRooms);
    this.loadRoomsToFloors(this.allRooms);
    this.loadFloorsToBuildings(this.allFloors);

    this.allBuildings.forEach(building =>
    {
      if(this.selectedBuilding.id == building.id)
      {
        building.floors!.forEach(floor =>
        {
          if(floor.id == this.selectedFloor.id)
          {
            floor.Rooms.forEach(room => {
                if(room.id == this.selectedRoom.id)
                {
                  this.selectedRoom = room;
                }
            });
            this.selectedFloor = floor;
          }
        });
        this.selectedBuilding = building;
      }

    });
    this.reloadRooms();
  }

  private reloadIfEverythingUpdated()
  {
    if(!this.isStillUpdating())
    {
      this.reloadAllInfo();
    }
  }

  public updateBuilding(building: Building)
  {
    this.buildingUpdating = true;
    this.buildingService.updateBuilding(building).subscribe(res =>
    {
      this.buildingUpdating = false;
      this.reloadIfEverythingUpdated();
    });
  }

  public updateFloor(floor: Floor)
  {
    this.floorUpdating = true;
    this.floorService.updateFloor(floor).subscribe(res =>
    {
      this.floorUpdating = false;
      this.reloadIfEverythingUpdated();

    });
  }

  public updateRoom(room: Room) {
    this.clearRooms();
    this.roomUpdating = true;
    this.roomService.updateRoom(room).subscribe(res =>
    {
      this.roomUpdating = false;
      this.reloadIfEverythingUpdated();

    });
  }

  private setInitialSquares(): void
  {
    this.canvas = new fabric.Canvas('c');

    this.canvas.setHeight(455);

    this.canvas.setWidth(605);

    for(let l = 0; l < this.floorLenght; l++)
    {
      for(let w =0; w < this.floorWidth;w++)
      {
        let square = new fabric.Rect({

          left: l * this.squareSize,
          top: w * this.squareSize,
          fill: 'white',
          width: this.squareSize,
          height: this.squareSize,
          strokeWidth: 5,
          stroke: "black",
        });

        square.hoverCursor = "alias";
        square.hasControls = false;
        square.hasBorders = false;
        square.lockMovementX = true;
        square.lockMovementY = true;

        square.toObject.prototype.id = "ROOM"+l+"-"+w;
        square.toObject.prototype.posX = w;
        square.toObject.prototype.posY = l;

        this.allSquares.push(square);
        square.on('mousedblclick',function()
        {
          console.log("Clicked on: X: " + l + " Y: " + w);
        });
        this.canvas.add(square);

      }
    }

    this.canvas.renderAll();
  }

  private loadRoomsToFloors(roomsForLoad:Room[]):void
  {
    roomsForLoad.forEach(room =>
    {
      this.allFloors.forEach(floor =>
      {
        if(floor.id == room.floorId)
        {
          if(floor.Rooms == null)
          {
            floor.Rooms = [];
          }

          if(floor.id == room.floorId)
          {
            if(!floor.Rooms.includes(room))
            {
              floor.Rooms.push(room);
            }
          }
        }
      })

    })
  }

  private loadFloorsToBuildings(floorsForLoad:Floor[]):void
  {
    floorsForLoad.forEach(floor =>
    {
      this.allBuildings.forEach(building =>
      {

        if(building.floors == null)
        {
          building.floors = [];
        }

        if(building.id == floor.buildingId)
        {
          if(!building.floors.includes(floor))
          {
            console.log("UBACUJEM: " + floor.name + " u zgradu: " +building.name );
            building.floors.push(floor);
          }
        }

      })
    })
  }

  private loadGroomsToRooms(groomsForLoad:GRoom[]):void
  {
    groomsForLoad.forEach(groom =>
    {
      this.allRooms.forEach(room =>
      {
        if(room.id == groom.roomId)
        {
          room.groom = groom;
        }

      })
    })
  }

  public clearRooms(resetFloor=false):void
  {
    console.log("rooms: " + this.selectedRoom.name + " buildings: " + this.selectedBuilding.name + " floor: " + this.selectedFloor.name + " EquipmentName: " +
    this.selectedRoomEquipment.equipmentName + " EquipmentAmount :" + this.selectedRoomEquipment.amount);


    if(resetFloor)
    {
      this.shownRoom = false;

      this.selectedFloor = new Floor();
    }

    this.deleteOldRooms();
    this.canvas.renderAll();
  }

  public deleteOldRooms():void
  {
    this.allRoomsGroups.forEach(group =>
    {
      group.forEachObject(obj=>
      {
        this.canvas.remove(obj)
      })

      this.canvas.remove(group);
    });

    this.allRoomsGroups=[];

    this.canvas.renderAll();
  }

  public reloadRooms():void
  {
    this.shownRoom = false;
    this.clearRooms();

    //Load newRooms
    this.selectedFloor.Rooms.forEach(room =>
    {

      console.log("RELOADUJEM");

      //SQUARE
      let square = new fabric.Rect(
      {
        left: room.groom.positionX * this.squareSize,
        top: room.groom.positionY * this.squareSize,
        fill: 'red',
        width: this.squareSize * room.groom.width,
        height: this.squareSize * room.groom.lenght,
        strokeWidth: 5,
        stroke: "black",
      });

       this.canvas.add(square);

      //TEXT
      let text = new fabric.Text(room.name,
      {
        left: room.groom.positionX * this.squareSize + (this.squareSize * room.groom.width) / 4,
        top: room.groom.positionY * this.squareSize + (this.squareSize * room.groom.lenght) / 4,
        textAlign: 'center'
      });

      this.canvas.add(text);

      //GROUP
      let group = new fabric.Group([square, text], {});

      group.hoverCursor = "alias";
      group.hasControls = false;
      group.hasBorders = false;
      group.lockMovementX = true;
      group.lockMovementY = true;
      group.name = room.id;
      group.on('mousedblclick', () =>
      {
        this.selectedRoom = room; /// OVO OVDE DODATO
          this.editBuildingName = this.selectedBuilding.name;
          this.editFloorName = this.selectedFloor.name;
          this.editRoomName = this.selectedRoom.name;

          this.currentEquipmentRequest.originalRoomId = this.selectedRoom.id;
          this.roomEquipmentService.getAllEquipmentByRoomId(this.selectedRoom.id).subscribe((result => {
          console.log(result);
          this.equipment = new MatTableDataSource(<RoomEquipment[][]><unknown>result);
      }));
          this.equipmentMovementService.getAllAppointmentByRoomId(this.selectedRoom.id).subscribe(res => {
            console.log(res);
            this.shownAppointment = new MatTableDataSource(<Appointment[][]><unknown>res);
          });

        this.equipmentMovementService.getAllSplittingByRoomid(this.selectedRoom.id).subscribe(res => {
          console.log(res);
          this.shownRenovation = new MatTableDataSource(<RoomSplitingResponse[][]><unknown>res);
        });

        this.equipmentMovementService.getAllMergingByRoomid(this.selectedRoom.id).subscribe(res => {
          console.log(res);
          this.shownMerging = new MatTableDataSource(<RoomMergingResponse[][]><unknown>res);
        });


        this.equipmentMovementService.getAllMovementAppointmentByRoomId(this.selectedRoom.id).subscribe(res => {
          console.log(res);
          this.MovedEquipment = new MatTableDataSource(<EquipmentMovementAppointmentResponse[][]><unknown>res);
        });

          this.shownRoom = true; //PRIKAZE SPECIFIKACIJE SOBE

          this.selectRoom(room);
          console.log("Clicked on room: " + room.name);
      });

      this.canvas.add(group);
      this.allRoomsGroups.push(group);
    });

    this.canvas.renderAll();
  }

  public selectRoom(roomToSelect: Room):void
  {

    let allRoomsGroupsTemp: fabric.Group[] = [];

    //Load newRooms
    this.allRoomsGroups.forEach(group =>
    {
      let groupTemp = group;

      if(groupTemp.name == roomToSelect.id)
      {
        groupTemp.item(0).set('fill','green');
      }
      else
      {
        groupTemp.item(0).set('fill','red');
      }

      allRoomsGroupsTemp.push(groupTemp);
    });

      this.clearRooms();

      this.allRoomsGroups = allRoomsGroupsTemp;

      this.allRoomsGroups.forEach(element => {
        this.canvas.add(element);
      });

    this.canvas.renderAll();
  }

  public searchRoom():void
  {

      this.allRooms.forEach(room=>{
        if(room.name == this.findThisRoom){
          console.log("Room>>> "+room.buildingId+" "+room.floorId+" "+room.name);
          // NAdji sprat trazene sobe
          this.allFloors.forEach(floor=>{
            if (floor.id==room.floorId){
              this.selectedFloor=floor;
            }
          });
          //Nadji bolnicu trazene sobe
          this.allBuildings.forEach(building=>{
            if (building.id==room.buildingId){
              this.selectedBuilding=building;
            }
          });

          this.reloadRooms();
          this.selectRoom(room);
          return;
        }
      });
  }



public ShowEquipmentOnMap(bilosta : RoomEquipment):void{ //Prikazuje sobu na mapi nakon klika na listu opreme

   this.allRooms.forEach(room=>{
     if(room.id == bilosta.roomId){
        console.log("IDEMO BREEEEEEEEEEE");
       // NAdji sprat trazene sobe
       this.allFloors.forEach(floor=>{
         if (floor.id==room.floorId){
           this.selectedFloor=floor;
         }
       });
       //Nadji bolnicu trazene sobe
       this.allBuildings.forEach(building=>{
         if (building.id==room.buildingId){
           this.selectedBuilding=building;
         }
       });
       this.reloadRooms();
       this.selectRoom(room);

       return;
     }
   });

  }

  public SearchEquipment() :void{ //Dobavlja svu opremu

        this.roomEquipmentService.getAllEquipment().subscribe(res => {
        this.Searchedequipment = new MatTableDataSource(<RoomEquipment[][]><unknown>res);
    });

  }

  public getTendere() :void{ //Dobavlja sve tendere

    this.tenderService.getClosedTenders().subscribe(res => {
      this.podaciTendera = new MatTableDataSource(<TenderWithId[][]><unknown>res);
    });
  }

  public applyFilter(event:Event) {    //Filtrira Opremu na search Equipment

        const filterValue = (event.target as HTMLInputElement).value;
        this.Searchedequipment.filter = filterValue.trim().toLowerCase();
        this.shownEquipment = true;
  }


  public onEquipmentMoveClick(equipmentToMove: RoomEquipment):void
  {
    this.selectedRoomEquipment = equipmentToMove;
    this.currentEquipmentRequest.equipmentId = this.selectedRoomEquipment.roomEquipmentId;
    this.currentEquipmentRequest.equipmentName = this.selectedRoomEquipment.equipmentName;
    this.tabNumber = 1;
    console.log(equipmentToMove.equipmentName + " amount: " + equipmentToMove.amount)
    console.log(this.tabNumber)
  }
  public onRoomMerging():void
  {
    if(this.selectedRoom.id != "")
    {
      this.currentRoomMergingRequest.Room1Id = this.selectedRoom.id;
      this.roomMergingtabNumber = 1;
      console.log('Room merging ' + this.roomMergingtabNumber)
    }
  }
  public onRoomSpliting():void
  {
    if(this.selectedRoom.id != "")
    {
      this.currentRoomSplitingRequest.RoomId = this.selectedRoom.id;
      this.roomSplitingtabNumber = 1;
      console.log('Room spliting ' + this.roomSplitingtabNumber)
    }
  }

  public onEquipmentScheduleClick(selectedEquipmentAppointment : EquipmentMovementAppointmentResponse):void
  {
    console.log("IZABRAN APOINTMENTJ: " + selectedEquipmentAppointment.duration?.from);

    this.equipmentMovementService.create(selectedEquipmentAppointment).subscribe((result => {
    this.tabNumber = 0;
    this.currentEquipmentResponses = [];
    this.currentEquipmentResponsesTable = new MatTableDataSource(<EquipmentMovementAppointmentResponse[][]><unknown>this.currentEquipmentResponses);

    this.reloadAllInfo();
    }))
  }

  public onRoomMergingClick(selectedRoomMerging : RoomMergingResponse):void
  {
    console.log("IZABRAN APOINTMENTJ: " + selectedRoomMerging.DateRangeOfMerging?.from);

    this.roomService.createRoomMerging(selectedRoomMerging).subscribe((result => {
    this.roomMergingtabNumber = 0;
    this.currentRoomMergingResponses = [];
    this.currentRoomMergingResponsesTable = new MatTableDataSource(<RoomMergingResponse[][]><unknown>this.currentRoomMergingResponses);

    this.reloadAllInfo();
    }))
  }

  public onRoomSplitingClick(selectedRoomSpliting : RoomSplitingResponse):void
  {
    console.log("IZABRAN APOINTMENTJ: " + selectedRoomSpliting.DatesForSearch?.from);

    this.roomService.createRoomSpliting(selectedRoomSpliting).subscribe((result => {
    this.roomSplitingtabNumber = 0;
    this.currentRoomSplitingResponses = [];
    this.currentRoomSplitingResponsesTable = new MatTableDataSource(<RoomSplitingResponse[][]><unknown>this.currentRoomSplitingResponses);

    this.reloadAllInfo();
    }))
  }
  public nextPageInEquipmentMovement():void
  {
    if(this.tabNumber < 4)
    {
      //Do validation of current data
      this.tabNumber += 1;
    }
    else
    {
      this.currentEquipmentRequest.destinationRoomId = this.formSelectedRoomId;
      this.currentEquipmentRequest.duration = this.formDays+":"+this.formHours+":"+this.formMinutes+":00";

      let currentDate = new Date();


      let fromDate:Date = new Date(new Date(this.formStartDate!).setHours(7,0,0,0))
      let endDate:Date  = new Date(new Date(this.formEndDate!).setHours(20,0,0,0))

      this.currentEquipmentRequest.datesForSearch = new DateRange({
        from: fromDate,
        to: endDate
      })

      console.log("PROBACEMO DA POSALJEMo");
      this.equipmentMovementService.getAvailableByRequest(this.currentEquipmentRequest).subscribe((result => {
        if(!Array.isArray(result) || result.length != 0)
        {
          this.currentEquipmentResponses = result;
          this.currentEquipmentResponsesTable = new MatTableDataSource(<EquipmentMovementAppointmentResponse[][]><unknown>this.currentEquipmentResponses);
          console.log(result);
        }
        else
        {
          console.log(result);
          alert("BAD REQUEST!");
        }
      }))
      //End of form try to send data
    }
  }

  public nextPageInRoomMerging():void
  {
    if(this.roomMergingtabNumber < 3)
    {
      //Do validation of current data
      this.roomMergingtabNumber += 1;
    }
    else
    {
      this.currentRoomMergingRequest.Room1Id = this.selectedRoom.id;
      this.currentRoomMergingRequest.Room2Id = this.formSelectedRoomId;
      this.currentRoomMergingRequest.Duration = this.formDays+":"+this.formHours+":"+this.formMinutes+":00";

      let currentDate = new Date();


      let fromDate:Date = new Date(new Date(this.formStartDate!).setHours(7,0,0,0))
      let endDate:Date  = new Date(new Date(this.formEndDate!).setHours(20,0,0,0))

      this.currentRoomMergingRequest.DateRangeOfMerging = new DateRange({
        from: fromDate,
        to: endDate
      })

      console.log("PROBACEMO DA POSALJEMo");
      this.roomService.getAvailableByRoomMergingRequest(this.currentRoomMergingRequest).subscribe((result => {
        if(!Array.isArray(result) || result.length != 0)
        {
          this.currentRoomMergingResponses = result;
          this.currentRoomMergingResponsesTable = new MatTableDataSource(<RoomMergingResponse[][]><unknown>this.currentRoomMergingResponses);
          console.log(result);
        }
        else
        {
          console.log(result);
          alert("BAD REQUEST!");
        }
      }))
      //End of form try to send data
    }
  }

  public nextPageInRoomSpliting():void
  {
    if(this.roomSplitingtabNumber < 3)
    {
      //Do validation of current data
      this.roomSplitingtabNumber += 1;
    }
    else
    {
      this.currentRoomSplitingRequest.RoomId = this.selectedRoom.id;
      this.currentRoomSplitingRequest.Duration = this.formDays+":"+this.formHours+":"+this.formMinutes+":00";

      let currentDate = new Date();


      let fromDate:Date = new Date(new Date(this.formStartDate!).setHours(7,0,0,0))
      let endDate:Date  = new Date(new Date(this.formEndDate!).setHours(20,0,0,0))

      this.currentRoomSplitingRequest.DatesForSearch = new DateRange({
        from: fromDate,
        to: endDate
      })

      console.log("PROBACEMO DA POSALJEMo");
      this.roomService.getAvailableByRoomSplitingRequest(this.currentRoomSplitingRequest).subscribe((result => {
        if(!Array.isArray(result) || result.length != 0)
        {
          this.currentRoomSplitingResponses = result;
          this.currentRoomSplitingResponsesTable = new MatTableDataSource(<RoomSplitingResponse[][]><unknown>this.currentRoomSplitingResponses);
          console.log(result);
        }
        else
        {
          console.log(result);
          alert("BAD REQUEST!");
        }
      }))
      //End of form try to send data
    }
  }
  public previousPageInEquipmentMovement():void
  {
    if(this.tabNumber > 1)
    {
      this.tabNumber -= 1;
    }
    else
    {
      this.tabNumber = 0;
    }
  }

  public previousPageInRoomMerging():void
  {
    if(this.roomMergingtabNumber > 1)
    {
      this.roomMergingtabNumber -= 1;
    }
    else
    {
      this.roomMergingtabNumber = 0;
    }
  }

  public previousPageInRoomSpliting():void
  {
    if(this.roomSplitingtabNumber > 1)
    {
      this.roomSplitingtabNumber -= 1;
    }
    else
    {
      this.roomSplitingtabNumber = 0;
    }
  }

  public exitEquipmentMovementForm():void
  {
    this.selectedRoomEquipment = new RoomEquipment();
    this.tabNumber = 0;

  }
  public exitroomMergingForm():void
  {
    this.selectedRoomEquipment = new RoomEquipment();
    this.roomMergingtabNumber = 0;

  }
  public exitroomSplitingForm():void
  {
    this.selectedRoomEquipment = new RoomEquipment();
    this.roomSplitingtabNumber = 0;

  }

  public deleteMovementEquipment(movedEquipment : EquipmentMovementAppointmentResponse){

    this.izabran = movedEquipment.id;
    this.equipmentMovementService.deleteMoveAppointment(this.izabran).subscribe(
      (resp) =>{
        console.log(resp);
        console.log("OBRISAOOOO");
        this.MovedEquipment.data.splice(this.izabran,1)
        this.MovedEquipment.filter='';
      }, err=>{
        console.log(err);
        console.log("GRESKA");
      });
  }


  public deleteAppointment(movedAppointment : Appointment){

    this.izabran2 = movedAppointment.id;
    this.equipmentMovementService.deleteAppointment(this.izabran2).subscribe(
      (resp) =>{
        console.log(resp);
        console.log("OBRISAOOOO");
        this.shownAppointment.data.splice(this.izabran2,1)
        this.shownAppointment.filter='';
      }, err=>{
        console.log(err);
        console.log("GRESKA");
      });
  }


  BloodTypeString(bloodType: any) {
    return ToString[bloodType]
  }

  formatDate = (date:any) => {
    let d = new Date(date)
    return `${d.getMonth().toString().padStart(2,'0')}/${d.getDate().toString().padStart(2,'0')}/${d.getFullYear()}`;
  }





}

export enum ToString {
  "A-"= 0,
  "A+" = 1,
  "B-" = 2,
  "B+" = 3,
  "AB+" = 4,
  "AB-" = 5,
  "O+" = 6,
  "O-" = 7,
}

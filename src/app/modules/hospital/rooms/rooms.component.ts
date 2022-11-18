import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/HospitalMapServices/room.service';
import { fabric } from 'fabric';
import { Group, Rect } from 'fabric/fabric-impl';
import {FormControl} from '@angular/forms';
import {Building} from "../model/building.model";
import { Floor } from '../model/floor.model';
import { BuildingService } from '../services/HospitalMapServices/building.service';
import { FloorService } from '../services/HospitalMapServices/floor.service';
import { GroomService } from '../services/HospitalMapServices/groom.service';
import { GRoom } from '../model/groom.model';
import { forkJoin, switchMap } from 'rxjs';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  //SELECTED
  public selectedBuilding: Building = new Building();
  public selectedFloor: Floor = new Floor();
  public selectedRoom: Room = new Room();
  
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

  //FOR VISUALISATION, FABRIC.JS
  public allRoomsGroups: Group[] = [];
  public allSquares: Rect[] = [];
  public allGreenSquares: Rect[]  =[];
  canvas: any;

  //NZM STA JE OVO NI DA LI TREBA
  public dataSource = new MatTableDataSource<Room>(); 
  public displayedColumns = ['number', 'floor', 'update', 'delete'];
  shownRoom = false;  ///DA PRIKAZE SOBU KAD SE KLIKNE NA OBJEKAT SOBE
  
  //LOADING
  buildingsLoaded:boolean = false;
  floorsLoaded:boolean = false;
  roomsLoaded:boolean = false;
  groomsLoaded:boolean = false;

  //UPDATING
  buildingUpdating:boolean = false;
  floorUpdating:boolean = false;
  roomUpdating:boolean = false;

  constructor(private roomService: RoomService, private buildingService: BuildingService, private groomService: GroomService, private floorService: FloorService,  private router: Router) { }

  ngOnInit(): void 
  {
    this.setInitialSquares();
    this.reloadAllInfo();
  }

  private reloadAllInfo()
  {
    
    this.allBuildings = [];
    this.allFloors = [];
    this.allRooms = [];
    this.allGRooms = [];

    this.clearRooms();

    this.buildingsLoaded = true;
    this.floorsLoaded = true;
    this.roomsLoaded = true;
    this.groomsLoaded = true;

    forkJoin([this.buildingService.getBuildings(), this.floorService.getFloors(), this.roomService.getRooms(), this.groomService.getGRooms()])
    .subscribe((result => {
      this.allBuildings = result[0];
      this.allFloors = result[1];
      this.allRooms = result[2];
      this.allGRooms = result[3];
      this.checkIfAllLoadedAndProccesIt();
    }))
/*
    this.buildingService.getBuildings().subscribe(res =>{
      this.allBuildings = res;
      this.buildingsLoaded = true;
      this.checkIfAllLoadedAndProccesIt();
    })

    this.floorService.getFloors().subscribe(res =>{
      this.allFloors = res;
      this.floorsLoaded = true;
      this.checkIfAllLoadedAndProccesIt();
    })

    this.groomService.getGRooms().subscribe(res =>{
      this.allGRooms = res;
      this.groomsLoaded = true;
      this.checkIfAllLoadedAndProccesIt();
    })

    this.roomService.getRooms().subscribe(res => {
      this.allRooms = res;
      this.dataSource.data = this.allRooms; //NZM STA JE OVO
      this.roomsLoaded = true;
      this.checkIfAllLoadedAndProccesIt();
    })*///////
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

    this.canvas.setHeight(screen.height);

    this.canvas.setWidth(screen.width/2);

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
    console.log("rooms: " + this.selectedRoom.name + " buildings: " + this.selectedBuilding.name + " floor: " + this.selectedFloor.name);
    

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
    this.clearRooms();

      if (this.findThisRoom.length > 0){

      this.allRooms.forEach(room=>{
       if (this.selectedBuilding.name.length==0 || this.selectedBuilding.id==room.buildingId){
          if(this.selectedFloor.name.length==0 || this.selectedFloor.id==room.floorId){
             if(room.name.toLowerCase().includes(this.findThisRoom.toLowerCase())){
              this.getBuildingByRoom(room);
              this.getFloorByRoom(room);
              this.reloadRooms();
              this.selectRoom(room);
              return;
            }
          }
        }
      });
    }
  }

  public getBuildingByRoom(room: Room):void
  {
    // RETURN value is in public  this.selectedBuilding
    this.allBuildings.forEach(building=>{
      if (building.id==room.buildingId){
        this.selectedBuilding=building;
      }
    });
  }

  public getFloorByRoom(room: Room):void
  {
     // RETURN value is in public  this.selectedFloor
    this.allFloors.forEach(floor=>{
      if (floor.id==room.floorId){
        this.selectedFloor=floor;
      }
    });
  }
  public clearSearch():void
  {
    this.findThisRoom="";
    this.selectedFloor = new Floor();
    this.selectedBuilding = new Building();
    this.clearRooms();

  }
  
}

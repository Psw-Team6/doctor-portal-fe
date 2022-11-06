import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Room } from 'src/app/modules/hospital/model/room.model';
import { RoomService } from 'src/app/modules/hospital/services/room.service';
import { fabric } from 'fabric';
import { Group, Rect } from 'fabric/fabric-impl';
import {FormControl} from '@angular/forms';
import {Building} from "../model/building.model";
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  selectedBuilding: Building = new Building();
  selectedFloor: string = '';

  selectedRoom :Room = new Room(); ///OVO OVDE MENJANO

  loadedRooms: Room[]=[];

  shownRoom = false;  ///DA PRIKAZE SOBU KAD SE KLIKNE NA OBJEKAT SOBE


  //CONSTS
  floorLenght = 20;
  floorWidth = 15;
  squareSize= 30;
  //
  public buildings: Building[] = [];
  allFloors: string[] = [];

  allRooms: Group[] = [];
  allSquares: Rect[] = [];

  canvas: any;

  public dataSource = new MatTableDataSource<Room>();
  public displayedColumns = ['number', 'floor', 'update', 'delete'];
  public rooms: Room[] = [];

  constructor(private roomService: RoomService, private router: Router) { }

  ngOnInit(): void {

    this.setInitialSquares();

    this.roomService.getRooms().subscribe(res => {
      this.rooms = res;
      this.dataSource.data = this.rooms;
      this.loadBuildings(this.rooms);
      this.loadRooms(this.rooms);
    })
  }

  public chooseRoom(id: number) {
    this.router.navigate(['/rooms', id]);
  }

  public updateRoom(id: number) {
    this.router.navigate(['/rooms/' + id + '/update']);
  }

  public deleteRoom(id: number) {
    this.roomService.deleteRoom(id).subscribe(res => {
      this.roomService.getRooms().subscribe(res => {
        this.rooms = res;
        this.dataSource.data = this.rooms;
      })
    })
  }

  public addRoom() {
    this.router.navigate(['/rooms/add']);
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

  private loadBuildings(roomsForLoad:Room[]):void
  {
    roomsForLoad.forEach(room => {
      let foundSame = false;
      this.buildings.forEach(building=>
      {
        if(building.buildingName == room.buildingName)
        {
          foundSame = true;
          if(!building.floorNames.includes(room.floorName))
          {
            building.floorNames.push(room.floorName);
          }
        }
      })

      if(!foundSame)
      {
          let bf = new Building();
          bf.buildingName = room.buildingName;
          bf.floorNames.push(room.floorName);
          this.buildings.push(bf);
      }
    })
  }

  private  loadRooms(roomsForLoad:Room[]):void
  {
    this.loadedRooms = roomsForLoad;
  }

  public clearRooms(resetFloor=false):void
  {

    if(resetFloor)
    {
      this.selectedFloor = "";
    }
    //Delete old rooms
    this.allRooms.forEach(group =>
    {
      group.forEachObject(obj=>
      {
        this.canvas.remove(obj)
      })

      this.canvas.remove(group);
    });
    this.allRooms=[];
  }

  public reloadRooms():void
  {
    this.clearRooms();
    //Load newRooms
    this.loadedRooms.forEach(room => {

      console.log("RELOADUJEM");
      if(room.floorName == this.selectedFloor && room.buildingName == this.selectedBuilding.buildingName) {

        //SQUARE
        let square = new fabric.Rect({
          left: room.positionX * this.squareSize,
          top: room.positionY * this.squareSize,
          fill: 'red',
          width: this.squareSize * room.width,
          height: this.squareSize * room.lenght,
          strokeWidth: 5,
          stroke: "black",
        });

        this.canvas.add(square);

        //TEXT
        let text = new fabric.Text(room.number, {
          left: room.positionX * this.squareSize + (this.squareSize * room.width) / 4,
          top: room.positionY * this.squareSize + (this.squareSize * room.lenght) / 4,
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


        group.on('mousedblclick', () => { //MORA SE DODATI OVAJ handler da bi radio this.shownRoom
          this.selectedRoom = room; /// OVO OVDE DODATO
          this.shownRoom=true; //PRIKAZE SPECIFIKACIJE SOBE
          console.log("Clicked on room: " + room.number);
        });

        this.canvas.add(group);
        this.allRooms.push(group);
      }
    });

    this.canvas.renderAll();

  }



}

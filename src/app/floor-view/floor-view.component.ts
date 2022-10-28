import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ROOME } from '../ROOME';



@Component({
  selector: 'app-floor-view',
  templateUrl: './floor-view.component.html',
  styleUrls: ['./floor-view.component.css']
})
export class FloorViewComponent implements OnInit {

  canvas: any;
  
  rOOM :ROOME ={
    name : "PetaSoba",
    id: 5,
    floor: 55,
  }




  constructor() { }

  ngOnInit(): void {

    var canvas = new fabric.Canvas('c');
    
    
    const Room1 = {   //za hardCodovanje na f12 i console za klik na bolnicu i podatke izbaci
      name: "Room 1 ", 
      number: 15,
      floor: 1
    };

    const Room2 = { //za hardCodovanje na f12 i console  za klik na bolnicu i podatke izbaci
      name: "Room 2",
      number: 8,
      floor: 2
    };

    const TrianglEE = { //za hardCodovanje na f12 i console  za klik na bolnicu i podatke izbaci
      name: "Random Trougao",
      number: 8,
      floor: 2
    };
   

    /******************* */
    
    // create a rectangle 
    var rect1 = new fabric.Rect({
      width: 160,
      height: 130,
      fill: '#800000',
      stroke: 'black', //ZaIvice
      originX: 'center',
      originY: 'center',
      scaleY: 0.5,
    });

    // create a rectangle
    var rect2 = new fabric.Rect({
      width: 100,
      height: 150,
      fill: '#67a6ef',
      stroke: 'black',
      originX: 'center',
      originY: 'center',
    });

    var text1 = new fabric.Text('Room 1', { //za text unutar pravougaonika
      fontSize: 20,
      originX: 'center',
      originY: 'center',
    });

    var text2 = new fabric.Text('Room 2', {
      fontSize: 20,
      originX: 'center',
      originY: 'center',
    });

    var group1 = new fabric.Group([ rect1, text1 ], { //text unutar objekta link: http://fabricjs.com/fabric-intro-part-3#groups
      left:50,
      top: 80, 
    });
    canvas.add(group1);


    var group2 = new fabric.Group([ rect2, text2 ], { //text unutar objekta link: http://fabricjs.com/fabric-intro-part-3#groups
      left: 350,
      top: 80,
    });
    canvas.add(group2);

    /*
    group1.on('selected', function(){ ///NZM KOJI DJAVO NECE NA 'mouse:down' mora na selected za sada
      console.log("Name: "+Room1.name +"\n" +"Number: "+Room1.number+"\n"+"Floor: "+Room1.floor);      ///Moras f12 i consolu da bi video
     });   
*/
     group1.on('selected', function(){ 
     document.write("Name: "+Room1.name +"<br>" +"Number: "+Room1.number+"<br>"+"Floor: "+Room1.floor);      
     }); 

    
    group2.on('selected', function(){ //KAD KLIKNES NA group2 izbaci ti text 
      console.log("Name: "+Room2.name +"\n" +"Number: "+Room2.number+"\n"+"Floor: "+Room2.floor);
     });
     


    var triangle = new fabric.Triangle({
      left: 210,
      top: 250,
      fill: '',
      stroke: 'black',
      width: 80,
      height: 110
    });

    canvas.add(triangle);


    triangle.on('selected', function(){
      console.log("Name: "+TrianglEE.name +"\n" +"Number: "+TrianglEE.number+"\n"+"Floor: "+TrianglEE.floor);
     });

     
 /// DA SE NE POMERA TEXT+KVADRAT -GRUPA1 
 group1.hasControls = false;
 group1.hasBorders = false;
 group1.lockMovementX = true;
 group1.lockMovementY = true;
 group1.hoverCursor = "alias";

 /// DA SE NE POMERA TEXT+KVADRAT -GRUPA2
 group2.hasControls = false;
 group2.hasBorders = false;
 group2.lockMovementX = true;
 group2.lockMovementY = true;
 group2.hoverCursor = "alias";

/*
 /// DA SE NE POMERA KVADRAT 
    rect1.hasControls = false;
    rect1.hasBorders = false;
    rect1.lockMovementX = true;
    rect1.lockMovementY = true;
    rect1.hoverCursor = "alias";
*/

  }

  

}

  
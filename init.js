
//초기화 
var map;
const Grid = tui.Grid;

window.onload=function(){
    console.log("call type............... 0");
    document.getElementById("myBtn").addEventListener("click", addMarker);

    initMap();
    initGrid();

    
    
  
    

}

// Initialize and add the map
function initMap() {
    // The location of Uluru
    const seoul = { lat: 37.5642, lng: 127.001 };
    // The map, centered at Uluru
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: seoul,
    });
    // The marker, positioned at Uluru
    
  }


function addMarker(){
    var uluru = { lat: -25.344, lng: 131.036 };
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
      });
}



function initGrid(){



   const grid = new Grid({
        el: document.getElementById('grid'),
        data: [ {'name':'suram'},{},{},{},{},{},{}  ],
        showDummyRows: true,
        scrollY: true,
        bodyHeight:60,
        
        rowHeaders: ['checkbox','rowNum'],
        columns: [
          {
            header: 'Name',
            name: 'name',
            editor: 'text'
          },
          {
            header: 'Artist',
            name: 'artist',
            editor: 'text'
          },
          {
            header: 'Type',
            name: 'type',
            editor: 'text'
          },
          {
            header: 'Release',
            name: 'release',
            editor: 'text'
          },
          {
            header: 'Genre',
            name: 'genre',
            editor: 'text'
          }
        ]
      });
    
 
  //grid.resetData([]);

  
  //instance.resetData(newData); // Call API of instance's public method
  
  //Grid.applyTheme('clean'); // Call API of static method

}
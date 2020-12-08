
//초기화 
var map;
const Grid = tui.Grid;
var mygrid;

class YourColorRenderer {
  constructor(props) {
    const el = document.createElement('input');
    const { grid, rowKey, columnInfo } = props;

    el.type = 'color';
    el.value="#dc9656";
    console.log(el.value);
    el.setAttribute('list','colors');
    var colors = ["#ab4642","#dc9656", "#f7ca88", "#a1b56c", "#86c1b9", "#7cafc2", "#ba8baf"];
    var colorList = document.createElement('datalist');
    colorList.setAttribute('id','colors');
    for( var i=0; i<colors.length; i++){
      var option = document.createElement('option');
      option.value = colors[i];
      colorList.appendChild(option);
    }
    el.append(colorList);
    el.addEventListener('input', () => {
      grid.setValue(rowKey, columnInfo.name, el.value);
      console.log(el.value);
    });

    this.el = el;
    this.render(props);
    el.setAttribute('value','#ab4642');

  }
  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  render(props) {
    this.el.value = String(props.value);
  }
}

class MyColorRenderer {
  constructor(props) {
    const el = document.createElement('button');
    const { grid, rowKey, columnInfo } = props;

    //el.type = 'color';
    el.style.backgroundColor="#f7ca88";
    el.style.width="20px";
    el.style.height="10px";
    el.addEventListener('input', () => {
      grid.setValue(rowKey, columnInfo.name, el.value);
    });
    
    /*
    var colorpicker2 = tui.colorPicker.create({
      container: el,
      preset : ["#ab4642","#dc9656", "#f7ca88", "#a1b56c", "#86c1b9", "#7cafc2", "#ba8baf"]
  });*/

    this.el = el;
    this.render(props);
  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  render(props) {
    this.el.value = String(props.value);
  }
}
class CustomEditor {
  constructor(props) {
    const el = document.createElement('button');

    

    this.el = el;

    el.addEventListener("click",alert("hii"));
    


  }

  getElement() {
    return this.el;
  }

  getValue() {
    return this.el.value;
  }

  mounted() {
    //this.el.select();
  }
}
const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];



window.onload=function(){
    console.log("call type............... 0");
    

    initMap();
    initGrid();
    //initColorPicker();

    
    
    document.getElementById("myBtn").addEventListener("click", addMarker);
    
    

}

function addMarker(){
    
    var posArray = new Array();
    posArray = mygrid.getData();
    console.log(posArray);
    posArray = parsePosition(posArray);
      

      const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  const markers = posArray.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}

function initGrid(){



   mygrid = new Grid({
        el: document.getElementById('grid'),
        data: locations,
        editingEvent:'click',
        showDummyRows: true,
        scrollY: true,
        bodyHeight:60,
        
        rowHeaders: ['checkbox','rowNum'],
        columns: [
          {
            header: '학교명',
            name: 'name',
            editor: 'text'
          },
          {
            header: '위도',
            name: 'lat',
            editor: 'text'
          },
          {
            header: '경도',
            name: 'lng',
            editor: 'text'
          },
          {
            header: '마커 색상',
            name: 'color',
            renderer:{
              type:YourColorRenderer,
              options:{
                list:'colors'
              }
            }
          },
          {
            header: '추가 정보',
            name: 'info',
            editor : 'text'
          }
        ]
      });
    
 
  //grid.resetData([]);
  
  //Grid.applyTheme('clean'); // Call API of static method

}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: -28.024, lng: 140.887 },
  });
  // Create an array of alphabetical characters used to label the markers.
  
}

function parsePosition(arrayData){

  var positions = new Array();
  var pos;
  for(i=0; i<arrayData.length; i++){
    pos = new Object();
    pos.lat=Number(arrayData[i].lat);
    pos.lng=Number(arrayData[i].lng);
    positions.push(pos);
  }

  return positions;

}

function initColorPicker(){
  var result = document.getElementById('color-picker');

        var colorpicker = tui.colorPicker.create({
            container: result
        });

        colorpicker.getColor();
}
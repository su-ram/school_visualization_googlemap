'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckboxRenderer = function () {
  function CheckboxRenderer(props) {
    _classCallCheck(this, CheckboxRenderer);

    var grid = props.grid;
    var rowKey = props.rowKey;


    var label = document.createElement('label');
    label.className = 'checkbox';
    label.setAttribute('for', String(rowKey));

    var hiddenInput = document.createElement('input');
    hiddenInput.className = 'hidden-input';
    hiddenInput.id = String(rowKey);

    var customInput = document.createElement('span');
    customInput.className = 'custom-input';

    label.appendChild(hiddenInput);
    label.appendChild(customInput);

    hiddenInput.type = 'checkbox';
    hiddenInput.addEventListener('change', function () {
      if (hiddenInput.checked) {
        grid.check(rowKey);
      } else {
        grid.uncheck(rowKey);
      }
    });

    this.el = label;

    this.render(props);
  }

  _createClass(CheckboxRenderer, [{
    key: 'getElement',
    value: function getElement() {
      return this.el;
    }
  }, {
    key: 'render',
    value: function render(props) {
      var hiddenInput = this.el.querySelector('.hidden-input');
      var checked = Boolean(props.value);

      hiddenInput.checked = checked;
    }
  }]);

  return CheckboxRenderer;
}();


var MyColorRenderer = function () {
  function MyColorRenderer(props) {
    _classCallCheck(this, MyColorRenderer);

    var el = document.createElement('input');
    var grid = props.grid;
    var rowKey = props.rowKey;
    var columnInfo = props.columnInfo;
    
    el.setAttribute('type','text');
    el.setAttribute('vale',' ');
    el.setAttribute('class','yellow');
    if(mygrid){
    console.log(mygrid.getRow(rowKey));}
    
        //el.setAttribute('style',"background-color:"+mygrid.getRow(rowKey).color);
    //el.type = 'color';
    el.addEventListener('input', function () {
      
    });

    this.el = el;
    this.render(props);
  }

  _createClass(MyColorRenderer, [{
    key: 'getElement',
    value: function getElement() {
      return this.el;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.el.value;
    }
  }, {
    key: 'render',
    value: function render(props) {
      this.el.value = String(props.value);
    }
  }]);

  return MyColorRenderer;
}();

var map;
var Grid = tui.Grid;
var mygrid;
var markers = [];
var colorMap = new Map()
colorMap.set('#ab4642','red');
colorMap.set('#dc9656', 'orange');
colorMap.set('#f7ca88','yellow');
colorMap.set('#a1b56c','green');
colorMap.set('#86c1b9','blue');
colorMap.set('#7cafc2','navy');
colorMap.set('#ba8baf','purple');
var color2Hex = new Map() 
color2Hex.set('빨', '#ab4642');
color2Hex.set('주', '#dc9656');
color2Hex.set('노', '#f7ca88');
color2Hex.set('초', '#a1b56c');
color2Hex.set('파', '#86c1b9');
color2Hex.set('남', '#7cafc2');
color2Hex.set('보', '#ba8baf');

var initGridData = new Array();

var locations = [{ lat: -31.56391, lng: 147.154312}, { lat: -33.718234, lng: 150.363181 }, { lat: -33.727111, lng: 150.371124 }, { lat: -33.848588, lng: 151.209834 }, { lat: -33.851702, lng: 151.216968 }, { lat: -34.671264, lng: 150.863657 }, { lat: -35.304724, lng: 148.662905 }, { lat: -36.817685, lng: 175.699196 }, { lat: -36.828611, lng: 175.790222 }, { lat: -37.75, lng: 145.116667 }, { lat: -37.759859, lng: 145.128708 }, { lat: -37.765015, lng: 145.133858 }, { lat: -37.770104, lng: 145.143299 }, { lat: -37.7737, lng: 145.145187 }, { lat: -37.774785, lng: 145.137978 }, { lat: -37.819616, lng: 144.968119 }, { lat: -38.330766, lng: 144.695692 }, { lat: -39.927193, lng: 175.053218 }, { lat: -41.330162, lng: 174.865694 }, { lat: -42.734358, lng: 147.439506 }, { lat: -42.734358, lng: 147.501315 }, { lat: -42.735258, lng: 147.438 }, { lat: -43.999792, lng: 170.463352 }];

window.onload = function () {
 
  initMap();
  initGrid();

  
  $("#excelFile2").click(function() {
    var fileinit = document.getElementById('excelFile').value;
    console.log(fileinit);
    
    
    $('#excelFile').click();

  });

  
<<<<<<< HEAD
 
=======
  $('input:file', '.ui.action.input')
    .on('change', function(e) {
      var name = e.target.files[0].name;
      //$('input:text', $(e.target).parent()).val(name);
      
    });
  
>>>>>>> 88972422b92a62dc2544dde9f895c9037df4b2e6
  document.getElementById("myBtn").addEventListener("click", addMarker);
  document.getElementById("excelFile").addEventListener("change", handle_fr);
  document.getElementById('deleteChecked').addEventListener("click",deleteCheckedRows);
  document.getElementById("deleteAll").addEventListener("click",deleteAllRows);


  
};

function deleteCheckedRows(){

//선택 삭제인 경우 처음/나중으로 경우의 수를 나눠야 함 
<<<<<<< HEAD
=======

if(markers.length == 0){
>>>>>>> 88972422b92a62dc2544dde9f895c9037df4b2e6

if(markers.length == 0){

  mygrid.removeCheckedRows();
}else{
  mygrid.removeCheckedRows();
}else{
  mygrid.removeCheckedRows();
  deleteMarkers();
  addMarker();
}
 

}
function deleteAllRows(){

  mygrid.clear();
  mygrid.resetData(createInitRows(0));
  deleteMarkers();
  $('#excelFileName').text('');
}




function createInitRows(num){
  var i;
  var initRows = new Array();
  var limit;

  if (num == 0 ){

    limit = 50; 

  }else{
    limit = num % 50;
    limit = 50 - limit; 
  }
  for(i=0; i<limit; i++){
    var row = new Object();
   
    row.lat = null;
    row.lng=null;
    initRows.push(row);
  }

  return initRows;
}
// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    if(markers[i] != null){
      markers[i].setMap(map);

    }
    
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function addMarker() {

  deleteMarkers();
  var posArray = mygrid.getData();
  console.log(posArray);
  parse2Number(posArray);

  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
  /*
  new MarkerClusterer(map, markers, {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  });
  */

  var i;

  var _loop = function _loop() {

    
    var contentString = '<div id="siteNotice">' +
    '<h3>' + posArray[i].name + '</h3>'+ 
    '<p>'+
    posArray[i].info+'</p>'+
    '</div>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var location;
    var marker;

    if(posArray[i].lat != null && posArray[i].lng != null){
    
      location = { lat: posArray[i].lat, lng: posArray[i].lng };
    
    
      marker = new google.maps.Marker({
      position: location,
      map: map,
     
    });
  }

    if(posArray[i].color != null){

      var iconUrl = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|"+posArray[i].color.substr(1,6);
      console.log(iconUrl);
      marker.setIcon({url:iconUrl});

    }
    
    if(posArray[i].info != null){

      var contentString = '<h3>' + posArray[i].name + '</h3>' + '<br>'+posArray[i].info;
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener("click", function () {
        infowindow.open(map, marker);
      });

    }
    markers.push(marker)
  };

  for (i = 0; i < posArray.length; i++) {
    _loop();
  }

 // showMarkers();
}

function initGrid() {


  var parentWidth = $('#firstClm').height();
  console.log(parentWidth);


  mygrid = new Grid({
    el: document.getElementById('grid'),
    data: [{}],
    bodyHeight:parentWidth*0.8,
    showDummyRows: true,
    scrollY: true,
    rowHeaders: [
      {
        type: 'rowNum'
      },
      {
        type: 'checkbox',
        
        renderer: {
          type: CheckboxRenderer
        }
      }
    ],
    rowHeight: 30,
    minRowHeight: 20,
    header: {
      height: 35
    },
    columns: [{
      header: '학교명',
      name: 'name',
      width:150,
      editor: 'text'
    }, {
      header: '위도',
      name: 'lat',
      width:80,
      editor: 'text'
    }, {
      header: '경도',
      name: 'lng',
      width:80,
      editor: 'text'
    }, {
      header: '마커 색상',
      name: 'color',
      width:100  

    }, 
    {
      header:'색상',
      name:'palette',
      width:50,
      editor:'text'
    },
    {
      header: '추가 정보',
      name: 'info',
      editor: 'text'
    }],
    
    pageOptions: {
      useClient: true,
      perPage: 50
    },
    

    columnOptions: {
      resizable: true
    }
    

  });
  mygrid.hideColumn('color');
  //mygrid.hideColumn('info');
  mygrid.on('check', function(ev) {
    console.log('check', ev);
  });
  mygrid.on('afterChange', function(ev){
    pasteData(ev.changes);
    console.log(ev);
    mygrid.appendRows([{}]);
  });
  mygrid.on('paste',function(ev){

    console.log(ev);

  });


}
function pasteData(changes){

  var i;
  for(i=0; i<changes.length; i++){
    if(changes[i].columnName == 'palette'){
      var colorName = changes[i].value;
      var row = mygrid.getRow(changes[i].rowKey);
      row.color = color2Hex.get(colorName);
      row._attributes={
        className: {
          
          column: {
            palette: [colorMap.get(row.color)]
            
          }
        }
      };

      row.palette='';
      console.log(row);
      mygrid.setRow(changes[i].rowKey, row);
    }

   
  }

}
function initMap() {

  var current = { lat: 37.511408804814025, lng: 127.04398602292653 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: current
  });
  // Create an array of alphabetical characters used to label the markers.
}

function handleFile(e) {
  var files = e.target.files,
      f = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = new Uint8Array(e.target.result);
    var wb = XLSX.read(data, { type: 'binary' });

    wb.SheetNames.forEach(function (sheetName) {
      var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
      console.log(wb.Sheets[sheetName]);
    });
  };
  reader.readAsArrayBuffer(f);
}

function handle_fr(e) {

<<<<<<< HEAD
  console.log(e.target.files);
  var files = e.target.files,
      f = files[0];

=======
  var files = e.target.files;

 
  if(files.length == 0){
    return;
  }

  var f = files[0];

  
>>>>>>> 88972422b92a62dc2544dde9f895c9037df4b2e6
  $('#excelFileName').text(f.name);
  
  var reader = new FileReader();
  var rABS = !!reader.readAsBinaryString;
  reader.onload = function (e) {
    var data = e.target.result;
    if (!rABS) data = new Uint8Array(data);
    var wb = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
    wb.SheetNames.forEach(function (sheetName) {
      var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: ["name", "lat", "lng", "color", "info"] });
      var i;
      var exelData = new Array();
      var data;

      for (i = 1; i < rowObj.length; i++) {

        data = new Object();
        data.lat = Number(rowObj[i].lat);
        data.lng = Number(rowObj[i].lng);
        data.name = rowObj[i].name;
        data.color = color2Hex.get(rowObj[i].color);
        data.info = rowObj[i].info;
        data._attributes={
          className: {
            
            column: {
              palette: [colorMap.get(data.color)]
              
            }
          }
        };
        exelData.push(data);
      }
      deleteMarkers();
      mygrid.resetData(exelData);
      mygrid.appendRows(createInitRows(exelData.length));
    });
  };
  if (rABS) {
<<<<<<< HEAD
    console.log("rABS");
    reader.readAsBinaryString(f);
  }else {console.log("not rABS"); 
  reader.readAsArrayBuffer(f);}
=======
    
    reader.readAsBinaryString(f);
  }else { 
  reader.readAsArrayBuffer(f);
}
>>>>>>> 88972422b92a62dc2544dde9f895c9037df4b2e6

  document.getElementById('excelFile').value='';


}

function parsePosition(arrayData) {

  var positions = new Array();
  var pos;
  var i;
  for (i = 0; i < arrayData.length; i++) {
    pos = new Object();
    pos.lat = Number(arrayData[i].lat);
    pos.lng = Number(arrayData[i].lng);
    positions.push(pos);
  }

  return positions;
}

function parse2Number(arrayData) {

  var i;
  for (i = 0; i < arrayData.length; i++) {
    if(arrayData[i].lat != null && arrayData[i].lng != null){
      arrayData[i].lat = Number(arrayData[i].lat);
      arrayData[i].lng = Number(arrayData[i].lng);
    }
    
  }
}

function updateColor(checkedRows,color){
var i;
var index;
var updateRow;

for(i=0; i<checkedRows.length; i++){
  index = checkedRows[i].rowKey;
  updateRow = mygrid.getRow(index);
  updateRow.color = color;
 
  updateRow._attributes={
    className: {
      
      column: {
        palette: [colorMap.get(color)]
        
      }
    }
  };
  
  mygrid.setRow(index,updateRow);

  
  
}


}
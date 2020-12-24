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
var markerCluster; 
var colorMap = new Map()
colorMap.set('#F60000','red');
colorMap.set('#FF8C00', 'orange');
colorMap.set('#FFD700','yellow');
colorMap.set('#4DE94C','green');
colorMap.set('#4aa0f0','blue');
colorMap.set('#154b75','navy');
colorMap.set('#B413EC','purple');
var color2Hex = new Map() 
color2Hex.set('빨', '#F60000');
color2Hex.set('주', '#FF8C00');
color2Hex.set('노', '#FFD700');
color2Hex.set('초', '#4DE94C');
color2Hex.set('파', '#4aa0f0');
color2Hex.set('남', '#154b75');
color2Hex.set('보', '#B413EC');

var initGridData = new Array();

var locations = [{ lat: -31.56391, lng: 147.154312}, { lat: -33.718234, lng: 150.363181 }, { lat: -33.727111, lng: 150.371124 }, { lat: -33.848588, lng: 151.209834 }, { lat: -33.851702, lng: 151.216968 }, { lat: -34.671264, lng: 150.863657 }, { lat: -35.304724, lng: 148.662905 }, { lat: -36.817685, lng: 175.699196 }, { lat: -36.828611, lng: 175.790222 }, { lat: -37.75, lng: 145.116667 }, { lat: -37.759859, lng: 145.128708 }, { lat: -37.765015, lng: 145.133858 }, { lat: -37.770104, lng: 145.143299 }, { lat: -37.7737, lng: 145.145187 }, { lat: -37.774785, lng: 145.137978 }, { lat: -37.819616, lng: 144.968119 }, { lat: -38.330766, lng: 144.695692 }, { lat: -39.927193, lng: 175.053218 }, { lat: -41.330162, lng: 174.865694 }, { lat: -42.734358, lng: 147.439506 }, { lat: -42.734358, lng: 147.501315 }, { lat: -42.735258, lng: 147.438 }, { lat: -43.999792, lng: 170.463352 }];

window.onload = function () {
  console.log("call type............... 0");

  initMap();
  initGrid();
  addMarker();

  
  $("#excelFile2").click(function() {
    
    $('#excelFile').click();

  });


  
 
  document.getElementById("myBtn").addEventListener("click", addMarker);
  document.getElementById("excelFile").addEventListener("change", handle_fr);
  document.getElementById('deleteChecked').addEventListener("click",deleteCheckedRows);
  document.getElementById('downloadTemplate').addEventListener("click",downloadTemplate);
  $('.ui.radio.checkbox').checkbox({
    onChecked:function(){

      var index = $(this).parent().find('input').attr('tabIndex');
      initSchools(index);
      
      
    }
  });
  
 

}
function colorSetting(dataList){

  dataList.forEach(function(data){

    data.color = color2Hex.get(data.color);
    data._attributes={
      className: {
        
        column: {
          palette: [colorMap.get(data.color)]
          
        }
      }
    };
  });
  return dataList;
}
function initSchools(index){

  var schoolList = new Array();

  switch(index){
    case "0":

      schoolList = school_all;  

      break;
    case "1"://초등학교

      schoolList = school_elem;

      



      break;
    case "2"://중학교

      schoolList = school_mid;


      break;
    case "3"://고등학교

      schoolList = school_high;


      break;
  }



  
  
  mygrid.resetData(colorSetting(schoolList));
  addMarker();



}

function downloadTemplate(){
  
  
  
  var url = "http://localhost:8080/suram/template.xlsx";
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.responseType = "arraybuffer";
  
  req.onload = function(e) {
    var data = new Uint8Array(req.response);
    var workbook = XLSX.read(data, {type:"array"});
    var wopts = { bookType:'xlsx', bookSST:false, type:'array' };
    workbook = XLSX.write(workbook,wopts);
    window.navigator.msSaveOrOpenBlob(new Blob([workbook],{type:"application/octet-stream"}),'엑셀파일양식.xlsx');


    /* DO SOMETHING WITH workbook HERE */
  }
  
  req.send();




}

function deleteCheckedRows(){

//선택 삭제인 경우 처음/나중으로 경우의 수를 나눠야 함 

if(markers.length == 0){

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
 
  parse2Number(posArray);

 
  if(markerCluster){
    markerCluster.clearMarkers();}
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

 
  markerCluster.addMarkers(markers);
  markerCluster.repaint();
  
  
 // showMarkers();
}
function parseLocations(arr){

  var locationsArr = new Array();
  var i; 

  for(i=0; i<arr.length; i++){

    if(arr[i].lat != null && arr[i].lng != null){

      var data = new Object();
      data.lat = arr[i].lat;
      data.lng = arr[i].lng;
  
      locationsArr.push(data);

    }
   
  }

  console.log(locationsArr);
  return locationsArr;

}
function addMarkerCluster(arr){



  markers = parseLocations(arr).map(function (location, i) {
    return new google.maps.Marker({
      position: location,

    });
  });
  console.log(markers);

  

}
function initGrid() {


  var parentWidth = $('#grid').height();
  console.log(parentWidth);


  mygrid = new Grid({
    el: document.getElementById('grid'),
    data:colorSetting(school_all),
    bodyHeight:parentWidth-155,
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
      header: '추가 정보',
      name: 'info',
      editor: 'text'
    },
    {
      header: '학교명',
      name: 'name',
      editor: 'text',
      align:'left'
    }, {
      header: '위도',
      name: 'lat',
      
      editor: 'text'
    }, {
      header: '경도',
      name: 'lng',
      
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
      
    }
    ],
    
    pageOptions: {
      useClient: true,
      perPage: 50
    },
    

    columnOptions: {
      resizable: true
    }
    ,
    summary: {
      height: 30,
      position: 'bottom', // or 'top'
      columnContent: {
       name : {
          template: function(valueMap) {
            return '총 '+valueMap.cnt +' 개';
          }
        }
      }
    }
    

  });
  mygrid.hideColumn('color');
  mygrid.hideColumn('info');
  mygrid.on('check', function(ev) {
    console.log('check', ev);
  });
  mygrid.on('afterChange', function(ev){
    pasteData(ev.changes);
    console.log('something changed!!');
    
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
  
  var current = { lat: 36.123504364789376, lng: 127.61773204206187 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: current
  });

 
  markerCluster = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
  
  map.addListener("zoom_changed", function(){

    var zoom = map.getZoom();

    if(zoom <= 8){
      $("#floating-panel").show();
    }else{
      $('#floating-panel').hide();
    }



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

  console.log(document.getElementById('excelFile').value);
  var files = e.target.files;
      
    
  if(files.length == 0 ){
    return;
  }
  
  var f = files[0];

  
  
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
      //mygrid.appendRows(createInitRows(exelData.length));
    });
  };
  if (rABS) {
    
    reader.readAsBinaryString(f);
  }else {
  reader.readAsArrayBuffer(f);}

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
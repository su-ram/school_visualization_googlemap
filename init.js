"use strict";

//초기화 

var map;
var Grid = tui.Grid;
var mygrid;

var locations = [{ lat: -31.56391, lng: 147.154312 }, { lat: -33.718234, lng: 150.363181 }, { lat: -33.727111, lng: 150.371124 }, { lat: -33.848588, lng: 151.209834 }, { lat: -33.851702, lng: 151.216968 }, { lat: -34.671264, lng: 150.863657 }, { lat: -35.304724, lng: 148.662905 }, { lat: -36.817685, lng: 175.699196 }, { lat: -36.828611, lng: 175.790222 }, { lat: -37.75, lng: 145.116667 }, { lat: -37.759859, lng: 145.128708 }, { lat: -37.765015, lng: 145.133858 }, { lat: -37.770104, lng: 145.143299 }, { lat: -37.7737, lng: 145.145187 }, { lat: -37.774785, lng: 145.137978 }, { lat: -37.819616, lng: 144.968119 }, { lat: -38.330766, lng: 144.695692 }, { lat: -39.927193, lng: 175.053218 }, { lat: -41.330162, lng: 174.865694 }, { lat: -42.734358, lng: 147.439506 }, { lat: -42.734358, lng: 147.501315 }, { lat: -42.735258, lng: 147.438 }, { lat: -43.999792, lng: 170.463352 }];

window.onload = function () {
  console.log("call type............... 0");

  initMap();
  initGrid();
  //initColorPicker();


  document.getElementById("myBtn").addEventListener("click", addMarker);
  document.getElementById("excelFile").addEventListener("change", handle_fr);
};

function addMarker() {

  var posArray = mygrid.getData();
  console.log(posArray);
  parse2Number(posArray);

  var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  /*
  var markers = posArray.map(function (location, i) {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length]
    });
  });
  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
  });
  */

  var i;
  var markers = new Array();

  var _loop = function _loop() {
    var contentString = '<h3>' + posArray[i].name + '</h3>' + posArray[i].info;
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var location = { lat: posArray[i].lat, lng: posArray[i].lng };
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
    marker.addListener("click", function () {
      infowindow.open(map, marker);
    });
  };

  for (i = 0; i < posArray.length; i++) {
    _loop();
  }
}

function initGrid() {

  mygrid = new Grid({
    el: document.getElementById('grid'),
    data: [new Object()],
    editingEvent: 'click',
    showDummyRows: true,
    scrollY: true,
    rowHeaders: ['checkbox', 'rowNum'],
    rowHeight : 30,
    minRowHeight : 20,
    header : {
      height:35
    },
    columns: [{
      header: '학교명',
      name: 'name',
      editor: 'text'
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
      editor: 'text'
    }, {
      header: '추가 정보',
      name: 'info',
      editor: 'text'
    }],
    
    
  });

  //grid.resetData([]);
  Grid.applyTheme('default'); // Call API of static method
}
function createRowHeight(height) {
  const option = { rowHeight: height };

  // If the height is less than 40, minRowHeight should be set.
  if (height < 40) {
    option.minRowHeight = height;
  }

  console.log('rowHeight option', option);
  return option;
}
function initMap() {

  var current = { lat: 37.511408804814025, lng:  127.04398602292653 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: current
  });

  new google.maps.Marker({
    position: current,
    map: map
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
  var files = e.target.files,
      f = files[0];
  var reader = new FileReader();
  var rABS = !!reader.readAsBinaryString;
  reader.onload = function (e) {
    var data = e.target.result;
    if (!rABS) data = new Uint8Array(data);
    var wb = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
    wb.SheetNames.forEach(function (sheetName) {
      var rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], { header: ["name", "lat", "lng", "color", "info"] });
      console.log(rowObj);

      var i;
      var exelData = new Array();
      var data;

      for (i = 1; i < rowObj.length; i++) {

        data = new Object();
        data.lat = Number(rowObj[i].lat);
        data.lng = Number(rowObj[i].lng);
        data.name = rowObj[i].name;
        data.color = rowObj[i].color;
        data.info = rowObj[i].info;
        exelData.push(data);
      }

      mygrid.resetData(exelData);
    });
  };
  if (rABS) reader.readAsBinaryString(f);else reader.readAsArrayBuffer(f);
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
    arrayData[i].lat = Number(arrayData[i].lat);
    arrayData[i].lng = Number(arrayData[i].lng);
  }
}
function initColorPicker() {
  var result = document.getElementById('color-picker');

  var colorpicker = tui.colorPicker.create({
    container: result
  });

  colorpicker.getColor();
}
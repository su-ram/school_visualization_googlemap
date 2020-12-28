
var map;
var Grid = tui.Grid;
var mygrid;
var markers = [];
var markerCluster; 
var mapCenter = { lat: 36.123504364789376, lng: 127.61773204206187 };
var mapZoom = 7;

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

window.onload = function () {

  initMap();
  initGrid();
  initSchools("0");
  
  $("#uploadExcel").click(function() {
    
    $('#excelFile').click();

  });

$('.ui.radio.checkbox').checkbox({
    onChecked:function(){

      var index = $(this).parent().find('input').attr('tabIndex');
      initSchools(index);
      
      
    }
  });
  
 

  document.getElementById("excelFile").addEventListener("change", handleFile);  
 

}


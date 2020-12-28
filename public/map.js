function initMap() {
    //구글 지도 초기화. 
    
    
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: mapZoom,
      center: mapCenter
    });
   
    markerCluster = new MarkerClusterer(map, markers, {
      imagePath:
        "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    });
    
    map.addListener("zoom_changed", function(){
  
      var zoom = map.getZoom();
      if(zoom <= 8){ $("#floating-panel").show(); } else{ $('#floating-panel').hide(); }
  
    });
  
  }
  function setMapOnAll(map) {
    // 마커를 지도에 표시
    
      for (let i = 0; i < markers.length; i++) {
        if(markers[i] != null){
          markers[i].setMap(map);
    
        }
        
      }
    }
    
    
    function clearMarkers() {
      // 지도에서 마커를 안 보이도록 함.
    
      setMapOnAll(null);
    
    
    }
    
    
    function showMarkers() {
      // 마커 보이도록 함. 
    
      setMapOnAll(map);
    
    
    }
    
    
    function deleteMarkers() {
      // 마커 초기화 하고, 지도에서 모든 마커 없앰. 
    
      clearMarkers();
      markers = [];
    
    }
    
    function addMarker() {
      // 그리드 로우 데이터를 기준으로 마커 생성. 
    
      deleteMarkers();
    
    
      var location;
      var marker;
      var posArray = mygrid.getData();
      var i;
    
    
    
    
      parse2Number(posArray);
    
      if(markerCluster){ markerCluster.clearMarkers();}
    
      var _loop = function _loop() {
    
        var contentString = '<div id="siteNotice">' +
        '<h3>' + posArray[i].name + '</h3>'+ 
        '<p>'+
        posArray[i].info+'</p>'+
        '</div>';
    
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
    
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
    
      for (i = 0; i < posArray.length; i++) { _loop(); }
    
      markerCluster.addMarkers(markers);
      markerCluster.repaint();
      
      map.setZoom(mapZoom);
      map.setCenter(mapCenter);

    }
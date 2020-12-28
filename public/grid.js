
function colorSetting(dataList){
    //한글로된 색상명을 그리드에 표현할 수 있도록 속성값 설정. 
    
      dataList.forEach(function(data){
    
        if(data._attributes == null){
        data.color = color2Hex.get(data.color);
        data._attributes={
          className: {
            
            column: {
              palette: [colorMap.get(data.color)]
              
            }
          }
        };}
      });
    
    
      return dataList;
    }
    
    
    function initSchools(index){
    // 라디오 버튼 (전체/초.중/고) 값에 따라 셋팅값이 바뀌도록 설정. 
    
    
      var schoolList = new Array();
    
      switch(index){
    
    
        case "0"://전체
    
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
    
    function deleteCheckedRows(){
    //체크된 로우들만 삭제 (지도 위의 마커들도 함께 삭제) 
    
        if(markers.length == 0){
    
          mygrid.removeCheckedRows();
    
        }else{
    
          mygrid.removeCheckedRows();
          deleteMarkers();
          addMarker();
    
    
        }
    
    }
    

    
    function downloadTemplate(){
    // '엑셀양식 다운로드' 버튼 누르면 실행되는 함수. 
    
    
    
    
    }
    
    
    function parseLocations(arr){
      // 위치 데이터만 따로 추출. 
    
    
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
    
      return locationsArr;
    
    }
    
    function initGrid() {
      // 그리드 초기화. 
    
    
      var parentWidth = $('#grid').height();
    
      mygrid = new Grid({
    
    
        el: document.getElementById('grid'),
        bodyHeight:parentWidth-155,
        showDummyRows: true,
        scrollY: true,
        rowHeaders: [
          {
            type: 'rowNum'
          },
          {
            type: 'checkbox',
            
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
        },
    
        summary: {
          height: 30,
          position: 'bottom',
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
    
    
    }
    
    function handleFile(e) {
      // '엑셀파일 업로드'버튼 누르면 실행되는 함수.
      // sheetJS로 엑셀 파일을 읽어와서 그리드에 표현한다. 
      
      var files = e.target.files;
        
      if(files.length == 0 ){ return; }
      
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
                column: { palette: [colorMap.get(data.color)] }
              }
            };
            exelData.push(data);
          }
       
          mygrid.resetData(exelData);
          
        });
      };
    
    
      if (rABS) { reader.readAsBinaryString(f); }else { reader.readAsArrayBuffer(f); }
      document.getElementById('excelFile').value='';
    
    
    }
    
    function parse2Number(arrayData) {
    // 위경도를 문자 -> 숫자로 형식 변환. 
    
      for (var i = 0; i < arrayData.length; i++) {
    
        if(arrayData[i].lat != null && arrayData[i].lng != null){
          arrayData[i].lat = Number(arrayData[i].lat);
          arrayData[i].lng = Number(arrayData[i].lng);
        }
      }
    }

# 구글 map API를 이용한 초중고등학교 시각화 페이지 구축

- 링크 
    - https://su-ram.github.io/school_visualization_googlemap/public/
    
- 페이지 구조

| 폴더 | 파일 | 설명 | 설명 |
|:--------|:--------|:--------|:--------|
|/public  |  |  | |
|  | grid.js | 그리드 관련 함수 | |
|  | index.html | 메인 페이지 | |
|  | init.js | 변수, 그리드, 지도 초기화| |
|  | map.js | 지도 관련 함수 | |
|  | mycss.css | css 파일 | |
|  | /school_list | 학교 리스트 폴더 | |
|  |  | all.js | 전체 학교 목록|
|  |  | elementary.js | 초등학교 목록|
|  |  | middle.js | 중학교 목록|
|  |  | high.js | 고등학교 목록|


- 기술스택
    - html
    - css
    - javascript(ES5) 
    - google map javascript api, 
    - toast ui (grid, pagination)
    - semantic ui 
    - sheetJS

- 엑셀양식 다운로드. 
    - `grid.js` 파일 내의 `downloadTemplate()` 함수. Line :94

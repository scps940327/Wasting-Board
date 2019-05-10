function doGet(e) {
  var params = e.parameter;
  var requestAction  = params.requestAction;
  var url = "https://docs.google.com/spreadsheets/d/1aqHAAD-qbaC5XO8hwS2eio33PE030-KabKS-8v9CCsk/edit#gid=0"; //params.url;  
  var name = "工作表1"; //params.name;
  var SpreadSheet = SpreadsheetApp.openByUrl(url);
  var SheetName = SpreadSheet.getSheetByName(name);
  
  if(requestAction == 'newPost'){
    var d = params.data;   // 原始 data，字串格式
    var dimg = params.dataImg || '';
    var row = params.row;  // 由原始 data 判斷需要插入幾列
    var column = params.column; // 由原始 data 判斷每一列有幾欄
    var insertType = params.insertType;  // 插入在上方，或插入在下方
    var lastRow = SheetName.getLastRow();  // 讀取最後一列的列數
    var range, data, arr;
    
//    if(d.indexOf(',')!=-1){
//      arr = d.split(','); // 把原始資料用 , 分割成陣列
//      data=[];
//      for(var i=0; i<row; i++){
//        data[i]=[];
//        for(var j=0; j<column; j++){
//          data[i].push(arr[i*column+j]); // 藉由 row 和 column 變成二維陣列
//        }
//        data[i].push(dimg);
//      }
//    }else{
//      data = [[d]];
//    }
    
    data=[];
    data[0]=[params.dataTime, params.data, params.dataImg];
    
    if(insertType=='top'){
      SheetName.insertRowsBefore(1,row);
      range = SheetName.getRange(1,1,row,column);
    }else if(insertType=='bottom'){
      range = SheetName.getRange(lastRow+1,1,row,column);
    }
    
    range.setValues(data);
  }
  
  var startRow = 2; 
  var startColumn = 1; 
  var endRow = SheetName.getLastRow();
  var endColumn = 3;
  var data = SheetName.getSheetValues(startRow,startColumn,endRow,endColumn);
  
  var nowDate = new Date();
  var beforeDate = new Date(nowDate.getTime() - 24*60*60*1000); //前一天
  var Arr = [], output = {};
  
  for (var i = 1; i < endRow; i++) {
    if(new Date(data[i][0]) > beforeDate){
      var obj = {};
      obj.date = data[i][0];
      obj.text = data[i][1];
      obj.img = data[i][2];
      Arr.push(obj);
    }
  }
  
  Logger.log(Arr);
  return ContentService.createTextOutput(JSON.stringify(Arr)).setMimeType(ContentService.MimeType.JSON); // 將資料透過 ContentService 拋出
}

function myFunction() {
  var postImgItemData = "data:image/png;base64%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";
  doGet({
    parameter:{
      requestAction: 'newPost',
      dataTime: new Date(),
      data: '我好想趕快把這個寫完啊',
      dataImg: postImgItemData,
      insertType: 'bottom',
      row: 1,
      column: 3
    }
  })
}

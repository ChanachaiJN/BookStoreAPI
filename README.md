"# BookStoreAPI" 

"# BookStoreAPI" 

1.login โดยใช้ Username และ password

โดยระบบจะสามารถ
  - สร้าง User 
    POST : localhost:4000/users/register 
    
    body (raw type:json) :{
        "username" : "Magarett",
        "password" : "Aftrss144",
        "firstName" : "Chanachai",
        "lastName": "jumpon"
    }
    
   - Login 
   POST : localhost:4000/users/login
     body (raw type:json) :{
        "username" : "Magarett",
        "password" : "Aftrss144",  
    }
    โดยจะได้ Token สำหรับ Authorization มา ให้เพิ่ม token ตัวนี้ไปในส่วนของ Authorization (type : bearer token)
    
   - ดู User ในระบบ
   GET : localhost:4000/users 

2.ลงทะเบียนลูกค้า

โดยระบบจะสามารถ
    - สร้าง Customer 
     POST : localhost:4000/Customer/register 
        body (raw type:json) :{
        "firstName" : "Chanachai",
        "lastName": "jumpon"
    }
    โดยจะได้ CustomerID มา (CUS-xx)
    return {
        "CustomerID" : "CUS-1",
        "firstName" : "Chanachai",
        "lastName": "jumpon"
    }
    
    - ดู Customer ในระบบ
    GET : localhost:4000/Customer 
    GET : localhost:4000/Customer/:CustomerID
    
    - ค้นหาด้วย Keyword
      POST : localhost:4000/Customer/SearchFromKeyWord 
        body (raw type:json) :{
        "Keyword" : "Chanachai",
    }
 3.ลงทะเบียนข้อมูลหนังสือ
    โดยข้อมูลหนังสือจะมี 2 ส่วน 
      1 .ฺ Book Data : รายชื่อหนังสือในระบบ
      2 . ฺBook Stock : รายการหนังสือในระบบโดยต้องมีข้อมูลหนังสือในระบบก่อนถึงจะบันทึกรายการได้ โดยแต่ละรายการจะมี Key ที่ต่างกัน 
      
     - สร้าง Book Data 
     POST : localhost:4000/books/CreateNewBook
          body (raw type:json) :{
        "bookName" : "Chanachai",
        "bookPrice" : 150
    }
    return (กรณีปกติ) {    "bookName" : "Chanachai",
        "bookPrice" : 150,
        "rentPrice" : 15}
      โดยระบบจะคิดค่าเช่าต่อวันเป็น 10% ของราคาหนังสือ  
       
    return (กรณีมีหนังสือเล่มนี้ในระบบแล้ว) message : Chanachai books has been created
    
    
     - ดู Book Data  ในระบบ
      GET : localhost:4000/books/BookList
      
     - ค้นหา Book Data ด้วย Keyword
      POST : localhost:4000/books/SearchBookByKeyword 
        body (raw type:json) :{
        "Keyword" : "Chanachai",
    }
      
     - สร้าง Book Stock
     POST : localhost:4000/books/ImportBook
          body (raw type:json) :{
        "bookName" : "Chanachai",
        "ItemKEY" : "24512421"
    }
    return (กรณีปกติ) {}
    return (กรณีมีไม่มีหนังสือเล่มนี้ในระบบแล้ว) message : Chanachai books not exist in Shelf
    return (กรณีมี ItemKEY นี้ในระบบแล้ว) message : 24512421 exist in System
    
     - ดู Book Stock  ในระบบ
      GET : localhost:4000/books/BookList
      
     - ค้นหา Book Stock ที่ยังไม่ถูกยืมด้วย Keyword
      POST : localhost:4000/books/SearchAvailStockByKeyword 
        body (raw type:json) :{
        "Keyword" : "Chanachai",
    }
    
  4.การยืมหนังสือ
  
    - เช่าหนังสือ
      โดยในการเช่าหนังสือจะส่งเป็นรหัสลูกค้ากับชื่อหนังสือที่ต้องการเช่าไป
      โดยจะเลือกเช่าหนังสือใน stock ที่ยังไม่ถูกเช่า
      โดยระบบจะคิดค่าเช่าวันแรกลงที่ InitPrice
      
      POST : localhost:4000/rent/CreateNewRent 
        body (raw type:json) :{
        "bookName" : "Chanachai",
        "CustomerID" : "CUS-1"
    }
    return {      "createdDate": "2020-08-30",
        "isEnd": false,
        "CustomerID": "CUS-1",
        "bookName": "Chanachai",
        "CustomerName": "Magarettz",
        "CustomerLastName": "Arty",
        "ItemKEY": "87144575",
        "StartDate": "2020-08-30",
        "initPrice": 15,
        "headerid": "HD-5",
        "id": "5f4ba0a8051dfa4644cd6927"
       }
    return (กรณีหนังสือมีน้อยกว่า 2 เล่ม) Chanachai  only has 1
    
    - ดูรายการเช่าในระบบ
       GET : localhost:4000/rent/RentTransaction
       GET : localhost:4000/rent/RentTransaction/:headerid
       
    - ดูรายการเช่าค้างในระบบ
    
       GET : localhost:4000/rent/CurrentTransaction
       
    - ดูรายการเช่ารายลูกค้า
    
     GET : localhost:4000/rent/CustomerTransaction/:CustomerID
     
    - ดูรายการเช่ารายหนังสือ
    
     GET : localhost:4000/rent/BookTransaction/:bookName
     
     - คืนหนังสือ     
     
     โดยเราจะส่งรหัสลูกค้าและรหัส stock ขอหนังสือกับวันที่คืนหนังสือไป
       POST : localhost:4000/rent/CreateNewRent 
        body (raw type:json) :{  
           "ItemKEY"  : "87144575"
   	    	, "CustomerID" : "CUS-3"
   	    	, "EndDate" : "2020-09-03"
        }
    return {
    "createdDate": "2020-08-30",
    "isEnd": true,
    "CustomerID": "CUS-3",
    "bookName": "Data Engineer Course",
    "CustomerName": "Magarettz",
    "CustomerLastName": "Arty",
    "ItemKEY": "87144575",
    "StartDate": "2020-08-30",
    "initPrice": 15,
    "headerid": "HD-5",
    "EndDate": "2020-09-03",
    "rentPrice": 45,
    "FeePrice": 40,
    "id": "5f4ba0a8051dfa4644cd6927"
}
โดยจะคำนวนค่าเช่าที่เหลือลงในช่อง rentPrice และค่าปรับกรณีเช่าเกิน 3 วันลงช่อง FeePrice

return (กรณีรหัสลูกค้าหรือรหัส stock ผิดหรือเล่มนี้มีการคืนแล้ว) {
this Transaction is End Or Not Exists
}


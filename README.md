API
---
GET **/api/:user_id/list**  
NO params  
return :  
[{
"id": 7,
"content": "aa",
"done": 0,
"user_id": 2,
"priority": "A",
"tag": "other",
"date": "2014-05-02T17:04:20.000Z"
}]

---
POST **/api/:user_id/create**  
params  { content : string}  
return :  
{ todo_id : string }

---
DELETE **/api/destroy/:id**  
NO params  
return done  or  fail

---
PUT **/api/update/:id**
params  { content : string , done: bool , tag : String }  
return done  or  fail


---
POST **/api/login**  
params  { username : string, password : string }    
return { user_id } or fail  

---
POST **/api/signup**  
params  { username : string, password : string }    
return { user_id } or fail 

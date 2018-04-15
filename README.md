# rangewell-test

### To run project
1. Install dependencies
```
npm install
```
2. Run webpack to create bundle js
```
npm run webpack
```
3. Run dev server
```
npm start
```
4. Run API server
```
npm run start-api-server
```

Consider an idea/memo board where you can create an idea, edit existing ideas and delete old ideas.

Each idea should have a unique id (read-only), a creation date (read-only), a title (editable), and a body (editable), which can contain a maximum of 140 characters. 

Assume that there is a backend REST service with the following endpoints:
```
GET ideas/ -> [{“id”: “:id”, “created_date”: “:created_date”, “title”: “:title”, “body”: “:body”}, {}, …]
GET ideas/new -> { “id”: “:id”, “created_date”: “:created_date” } 
POST idea/update { “id”: “:id”, “title”: “:title”, “body”: “:body” }
POST idea/delete { “id”: “:id” }
```
Assume that the back-end makes use of standard HTTP success and error codes. 

### Required
1.	Ideas should be displayed as tiles (as per the [card-design.png](https://github.com/Rangewell/rangewell-test/blob/master/card-design.png) file), aligned horizontally to fit screen width. You can hard code a few ideas to get you started. 
2.	There should be a button that can be clicked to add a new blank idea, and the title field should be focused to prompt the user to begin typing. A request should be made to a backend REST service to get an id for the new idea, as well as the created_date. 
3.	The title and body fields should be editable. Blurring any of these fields should trigger an update request to the backend REST service. 
4.	Each tile should have a delete icon which should only be visible when hovering over the tile (the [trash-icon.svg](https://github.com/Rangewell/rangewell-test/blob/master/trash-icon.svg) file). Clicking it should remove the idea and make an update request to the backend REST service.
5.	Please fork the provided github repository, make a new branch, make a commit to that branch before finally pushing your finished work back to github

### Stretch 
1.	Implement sorting that changes with a dropdown. The sort options should be title and created_date. 
2.	Implement a character counter that is displayed when the body field is edited and the remaining character count is <15. Hide the counter when the remaining characters count is >15. 
3.	Use localStorage to persist the ideas so that they persist after a page refresh.  
4.	Implement a notification to tell the user that edits have been successfully saved. Ensure the notification isn’t intrusive. 

### Submission
Please share you’re your finished work as a url pointing to a publicly accessible github repository.

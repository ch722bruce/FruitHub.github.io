# FruitHub.github.io
FruitHub emerges as a modern marketplace dedicated solely to fresh fruits. By offering users the ability to browse, purchase, and learn more about various fruit products, we aim to bridge the gap between fruit enthusiasts and premium quality produce. 


# CS5610-Project-three
### Project 3 : FruitHub
#### [FruitHub](https:// /) 
Based on JavaScript, CSS, HTML, and Bootstrap v5.3.2, Express Node, Node JS, MongoDB@7, React.                                                                       
CS 5610 Web Development:  [Class Link](https://johnguerra.co/classes/webDevelopment_fall_2023/)                         
Northeastern University San Jose                                                    
Instructor: John Alexis Guerra Gómez                                                                                          
 

### Author:
Created By: 
[Zhehao Xu](https://zhehao9758.github.io/Zhehao-portfolio/)  & 
[Chuanzhao Huang](https://chuanzhaohuang.github.io/)                                                     
Release: [Homepage](https:// /)  

### Project Objective
Our platform stands out by integrating user feedback in the form of comments and by allowing users to subscribe for regular fruit deliveries, ensuring they never run out of their favorites. Each product detail page is meticulously designed to provide comprehensive information about the fruit, along with promoting related fruit products, thus giving users an enhanced shopping experience.

### Features
1) Customers: User Authentication
Customers can register for a personal account to track their orders, manage their subscriptions, and maintain a profile. This secure system ensures users' data is safeguarded and enhances the personalized shopping experience.

2) Customers: Add, remove fruit from the shopping carts
Once logged in, users can seamlessly add their favorite fruits to their shopping cart. They also have the freedom to modify their cart by removing items if they change their mind.

3) Customers: Subscription fruit order
For those who wish for regular fruit deliveries, there's an option to subscribe. Users can choose the frequency of their orders, ensuring they always have fresh produce at their disposal.

4) Customers: Leave comments
@Zhehao Xu
After making a purchase, users are encouraged to leave comments on the product. This feedback helps other customers make informed choices and helps sellers improve their products and services.

5) Admin Dashboard
A comprehensive dashboard for shop owners and administrators. This tool helps in managing inventory, tracking sales, monitoring user feedback, and ensuring smooth operations. It's an essential feature that provides a real-time overview of the business and aids in strategic decision-making.



### Installation


Clone the repository and then do:

```
npm install
npm start
```
Which will start the backend server, running on http://localhost:3000. 


## Database

This application assumes that you have a Mongo server running on localhost:27017, or configured in the `MONGOMONGODB_URI` environment variable. For initializing the database you can run the command `npm run initDB` which will run `mongoimport` on the [./db/initialPhotoSharingData.json](./db/initialPhotoSharingData.json) data, and will create a `photoSharing` database with a `photos` collection


## Frontend

The express application will serve the compiled react application hosted on [./front](./front) folder. If you want to recompile it just run 

```npm install
npm run build``` 

on the font folder. You can also start a secondary development server for the front end using `npm run dev` on the [./front](./front)  folder courtesy of vite, which will serve the front via http://localhost:5173




### Preview:
[Thumbnail Page]
< >


[Login Page]
< >


[SignUp Page]
< >


[App Page] 
< >
< >
< >
< >


[Product List Page]
< >


[Product Detail Page]
< >



### Demonstration:
[Mockup](https://www.figma.com/file/1fF493BQYAyzJn8wudSi0d/FruitHub-Design?type=whiteboard&node-id=0%3A1&t=HLYiwqAJ2ZpFWfwp-1/)

[Video]( /)                       

[Slides]( /)


###  Copyright:
This webpage takes advantage of templates from bootstrap. This project is under MIT license. All modified image resources could be distributed with same methods. Photos of myself will be shared with CC 4.0 BY-NC-ND license.

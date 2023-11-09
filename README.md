# FruitHub.github.io

FruitHub emerges as a modern marketplace dedicated solely to fresh fruits. By offering users the ability to browse, purchase, and learn more about various fruit products, we aim to bridge the gap between fruit enthusiasts and premium quality produce.

## CS5610-Project-three

### Project 3 : FruitHub

#### [FruitHub](Link: https://fruithub-kcyx.onrender.com )

Based on JavaScript, CSS, HTML, and Bootstrap v5.3.2, Express Node, Node JS, MongoDB@7, React, Vite.

CS 5610 Web Development:  [Class Link](https://johnguerra.co/classes/webDevelopment_fall_2023/)

Northeastern University San Jose
Instructor: John Alexis Guerra Gómez

### Author

Created By:
[Zhehao Xu](https://zhehao9758.github.io/Zhehao-portfolio/)  &
[Chuanzhao Huang](https://chuanzhaohuang.github.io/)
Release: [Homepage](https://fruithub-kcyx.onrender.com/)  

## Project Objective

Our platform stands out by integrating user feedback in the form of comments and by allowing users to subscribe for regular fruit deliveries, ensuring they never run out of their favorites. Each product detail page is meticulously designed to provide comprehensive information about the fruit, along with promoting related fruit products, thus giving users an enhanced shopping experience.

## Features

1) Customers: User Authentication
Customers can register for a personal account to track their orders, manage their subscriptions, and maintain a profile. This secure system ensures users' data is safeguarded and enhances the personalized shopping experience.

2) Customers: Add, remove fruit from the shopping carts
Once logged in, users can seamlessly add their favorite fruits to their shopping cart. They also have the freedom to modify their cart by removing items if they change their mind.

3) Customers: Subscription fruit order
For those who wish for regular fruit deliveries, there's an option to subscribe. Users can choose the frequency of their orders, ensuring they always have fresh produce at their disposal.

4) Customers: Leave comments
After making a purchase, users are encouraged to leave comments on the product. This feedback helps other customers make informed choices and helps sellers improve their products and services.

## Installation

Clone the repository and then do:

```bash
npm install
npm start
```

Which will start the backend server, running on <http://localhost:3000>.

### Database

This application assumes that you have a Mongo server running on localhost:27017, or configured in the `MONGOMONGODB_URI` environment variable. For initializing the database you can run the command `npm run initDB` which will run `mongoimport` on the [./db/initialPhotoSharingData.json](./db/initialPhotoSharingData.json) data, and will create a `photoSharing` database with a `photos` collection

### Frontend

The express application will serve the compiled react application hosted on [./front](./front) folder. If you want to recompile it just run

```bash
npm install
npm install react-router-dom@6
npm run build
```

On the font folder. You can also start a secondary development server for the front end using `npm run dev` on the [./front](./front)  folder courtesy of vite, which will serve the front via <http://localhost:5173>

```bash
npm run dev
```

## Preview

[Thumbnail Page]
<img width="1270" alt="thumbnail" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/64b71528-c52e-4264-9787-be45a6fac335">



[Login Page]
<img width="1270" alt="signIn" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/a927c0ef-cdd5-4a8a-a2ca-3d9b37d162fe" >



[SignUp Page]
<img width="1270" alt="signUp" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/325e03a8-61d6-43f7-b48a-b021a11f7a53" >



[Home Page]
<img width="1270" alt="home" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/1f4bb7a5-e6dc-4fcb-943e-b9c5d5c69ee4" >



[Product List Page]
<img width="1270" alt="productList" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/8831f949-93c8-4651-90bc-ff33f55fc28e">



[Product Detail Page]
<img width="1270" alt="productDetail" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/077abaed-6041-4cdf-a235-80e4172cc3d8">



[Subscribe Page]
<img width="1270" alt="subscribe" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/3a9df0c4-33cd-437e-b8f8-78f307a0bb3f">



[Comment Page]
<img width="1270" alt="comment" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/ba52954b-6d87-466f-bde1-61e47e543320">



[Check Out Page]
<img width="1270" alt="checkout" src="https://github.com/ch722bruce/FruitHub.github.io/assets/122564637/3eaaab11-bc85-47ea-8985-59b0c331002f">

## Demonstration

[Mockup](https://www.figma.com/file/1fF493BQYAyzJn8wudSi0d/FruitHub-Design?type=whiteboard&node-id=0%3A1&t=HLYiwqAJ2ZpFWfwp-1/)

[Video]( /)

[Slides](https://docs.google.com/presentation/d/14P9sTI-FGuUNTdSkbweUCTmTOifv4DBN13r62_3YqrA/edit?usp=sharing/)

## Copyright

This webpage takes advantage of templates from bootstrap. This project is under MIT license. All modified image resources could be distributed with same methods. Photos of myself will be shared with CC 4.0 BY-NC-ND license.

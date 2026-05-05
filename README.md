# 📦 Project Setup Instructions

This project is a full-stack application with a React frontend and Node.js/Express backend.

---



1.
```bash
git clone <(https://github.com/LucasW14/Term-Project-WTW.git)>
cd <Term-Project-WTW>

2.
cd Term-Project- WTW/Backend
node  --watch server.js

3.
cd Frontend/use-react-vite
npm run dev

deployed app url: https://term-project-wtw.onrender.com


Design Choices: Why you chose your frontend framework, backend structure, and database schema
-  I chose react because it is a very popular front end framework used in a lot of businesses and corporate settings and I feel like it was something I should get familiar with for when i start my career.
- I chose node js for the backend framework because we spent the most time working on that framework for javascript. Express mae things simple to create  RESTful API routes to handle CRUD opertaions. I sturctured backend by seperating routes, controllers, and services to maintain code. 
- I chose my database schema to be simple and efficient for handling data. I used a neon db which is postrgre sql database. I chose fields that were essential to the applications functionality.

Challenges: Technical or conceptual hurdles you faced and how you solved them
- I had problems with the deployment of the app I couldn't get it to deploy until I realized that I was missing a bunch of necessary dependencies so I download those dependencies and was able to deploy the app
- Another Problem I had was put in authentication for the app. My google authentication wasn't working but I had to modify the backend feautres such as the server, and routes. I also had to add authentication routes and install dependencies to go along with them.


Learning Outcomes: What you learned about full-stack development and deployment
- I learned that frontend deals with a lot of backend mechanics to you have to make sure you are feeding the write info to the front end or else the whole thing will shut down.
_ I also learned that apps and their deployment are heavily reliant on the dependencies installed.

Future Work: Features you would add or refine with more time
- If given more time i would edit my frontend to make it a little more exciting
- I would also edit my backend to make it require pictures for each event.
- I would also add a chatbot feature to make it suggest where to go based off of your personality. 


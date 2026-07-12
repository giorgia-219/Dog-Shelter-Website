# WIE Project - Dog Shelter Website

## Getting started

This project consists of a frontend and a backend component, which are organized in two separate folders, and implements a simple website for a dog shelter. Users can browse and filter dogs for adoption, access information about the shelter and send adoption forms.

A simple html frontend with bootstrap and AJAX

The backend is written in NodeJS and stores the data in a SQLite database.

This project was tested using node version v24.16.0

## Structure
```text
├── backend/                  
│   ├── express/              # routes and handlers (dogs, inquiries)
│   ├── sequelize/            # database connection, schemas, models
│   ├── db.sqlite             # local database
│   ├── seed.js               # populates database with sample dogs data
│   └── clear-inquiries.js    # script to wipe form submissions
├── frontend/                 
│   ├── adopt.html/.js        # the main grid gallery with client-side filters
│   ├── dog-detail.html/.js   # dynamic single profile viewer
│   ├── contact-us.html/.js   # multistep validation inquiry form
│   └── style.css             # custom color tokens and card layout overrides
└── doc/					  # 3 project presentations (idea/zwischenstand/final)
```
## NodeJS

To run the backend node is required. To install it use one of the following methods

### Windows

Download the MSI installer from the [NodeJS website](https://nodejs.org/en/download) and follow the install steps.

### MacOS

Install NodeJS using Homebrew Package Manager
	
	`brew install node`
	
## Backend

All required modules are defined in `package.json`. You can install them using

	`npm install`

You can start the backend using

	`npm start`


## Frontend

Just open index.html in a browser. Use localhost or a live server VScode extension to interact with the database (i.e. to see dogs and send forms)

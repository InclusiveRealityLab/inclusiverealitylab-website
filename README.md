# Inclusive Reality Lab website 
This guide aims to provide information with regards to maintaining and contributing to IRL's website project. This website has been built for the purpose of showcasing the lab's vision, project and publications along with providing potential collaborators to easily connect with the lab.

## Contents
- [Tech Stack](#tech-stack)
- [Application structure](#application-structure)
- [Running locally](#running-locally)
  - [Prerequisites](#prerequisites)
  - [Project Setup](#project-setup)
  - [Environment Variables](#environment-variables)
- [Deployment](#deployment)
    - [Deployment (Frontend - GitHub Pages)](#deployment-frontend---github-pages)    
    - [Deployment (Backend- Google Apps Script)](#deployment-backend--google-apps-script)

## Tech Stack
| Layer | Tech |
|-------|---------|
| Frontend | React.js, Tailwind CSS, Framer-motion|
| Backend     | Google Apps Script |
| Deployment |GitHub Pages and Google App Script Web App |

### Other tools 
| Purpose | Tech |
|-------|---------|
| Frontend-Development Server |Vite|
| Version Control System |Git and GitHub|

## Application structure
This website project has been built using React.js (a JS library used for building frontend applications). It uses react-router-dom package for enabling the routing on the frontend. Vite.js has been used as the development server to allow the changes in code to be immediately reflected in the browser (when developing). Tailwind CSS v4 has been used to style the user interface components accoridng to the design spec file.

This repo has the following three main components:
-  <b>frontend</b> : this contains the frontend source code (what is displayed to the user on thr broswer, and how it is displayed, fetching results from the data source)
- <b>backend</b> : this contains the backend code (this has been archived and is not in use for the first release, it includes a backend server dedicated to the task of fetching and interacting with the data source and serve the results to the frontend, please note : this is not being used as of the first release though)
- <b>.github/ISSUE_TEMPLATE</b>  : this folder contains custom templates for documenting task and linking that to code, for smoother project management experience. For future improvements, feel free to create an issue using the templates provided and link this issue with your pull request.



## Running locally
### Prerequisites 
Please ensure that you have [Node.js LTS](https://nodejs.org/en) installed. This project uses version v20.11.1.  

### Project Setup

In order to run the project locally, please ensure the prerequisits are met.

1. Clone the repo using the link.

   ``` git clone <link of github repo>```

2. Redirect to the folder in which the repo was cloned, then change directory to ```inclusiverealitylab-website```
3. Open this folder in a code editor such as VS Code.
4. Expand the ```frontend``` folder, and create a file named ```.env``` at the root of ```frontend``` folder.
    1. Open this newly created file and copy and paste the following:
    ``` 
        VITE_API_BASE_URL=
        VITE_API_POST_BASE_URL= 
    ```
    2. Contact Ivy to obtain the URLs of the two web apps, such that the first corresponds to the deployed google app script attached to IRL Team Data and the second corresponds to the IRL Inquiries.


3. Now, open the cloned project in a terminal. Redirect to the 'frontend' folder ```cd frontend```

4. Now run
    ``` npm install all```
5. Now run
    ``` npm run dev ```

6. The terminal will display the link of where the project is being served locally. Copy and past it inside a broswer to view website live locally.

### Environment Variables

VITE_API_BASE_URL – Base URL for read-only endpoints (e.g., people, projects, publications, news).

VITE_API_POST_BASE_URL – Base URL for POSTing inquiries.

Frontend env vars are public at build time. Do not store secrets here.

## Deployment

### Deployment (Frontend - GitHub Pages - Automated)

The frontend is deployed to GitHub Pages using GitHub Actions.
Production deployment is fully automated and triggered on every push to the main branch.

Manual deployment commands are no longer required.

**Note on refactor for deployment on GitHub Pages**

GitHub Pages is a static host and can’t rewrite arbitrary paths to index.html. Inititally, Browser Router was used but this issue became apparent during deployment to GitHub pages. HashRouter keeps the route after a # (e.g., /index.html#/projects), so the server always serves index.html and React Router handles the route client‑side.

#### Review of Setup for deployment 
1. Usage of ```Hashrouter``` in ```App.jsx```.

```
    import { HashRouter, Routes, Route } from 'react-router-dom';
    // ...
    <HashRouter>
        <Routes>{/* routes */}</Routes>
    </HashRouter>

```
2. Configuration of Vite base inside ``` vite.config.js ```.
A variable ```repo``` is initialised to this project's repo's name i.e. ```inclusiverealitylab-website```. The base is configured to either ```'/'``` if in development (running locally) or  ```'/${repo}/'``` in production/deployment.

```import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

const repo = 'inclusiverealitylab-website';

export default ({ mode }) => defineConfig({
  plugins: [tailwindcss(), react()],
  base: mode === 'development' ? '/' : `/${repo}/`,
});
```
 
3. Deployment Setup :
-  Hosting: GitHub Pages
- Live branch: gh-pages
- Trigger: Push to main
- Build tool: Vite
- CI/CD: GitHub Actions
- Custom domain: www.inclusiverealitylab.org
  
4. Worfklow Location
   
   ```
   .github/workflows/main.yml
   ```
5. Deployment Workflow for live site update
   
    On every push to main, GitHub Actions performs the following:

-  Checks out the repository
- Sets up Node 20.11.1 (with npm cache)
- Installs dependencies from frontend/
- Builds the app using:
  ```
   npm run build -- --mode=custom

   ```
- Copies index.html to 404.html for SPA routing
- Generates a CNAME file for the custom domain
- Publishes frontend/dist to the gh-pages branch

6. Environment Variables
   
   The build uses GitHub repository variables:
   
    ```VITE_API_BASE_URL```

    ```VITE_API_POST_BASE_URL```

    Configured under:

    ```
      GitHub → Settings → Secrets and variables → Actions → Variables
    ```

#### Update Steps
To deploy changes to the live site:
1. Commit your changes to your working branch.
2. Push the changes to the main branch (by making a pull request and merging with the main branch). 
3. GitHub Actions builds and deploys automatically.
4. Site updates within ~1–2 minutes.

**NOTE** :
- Pushing to ```main``` will **now** update the live site.
- Keep ```public/CNAME``` in the repo so the custom domain stays linked after each deployment.
- The gh-pages branch should not be edited manually. 
- ```deploy:prod``` and ```deploy:gh-pages``` scripts remain for reference only and are no longer used for production.


### Deployment (Backend- Google Apps Script)
There are two Google Apps Scripts which are each attached to the Google Sheets containing the IRL Team Data and IRL Inquiries respectively. The first sscript is used to fetch data from the IRL Team Data sheet and the second script is used to post inquiries to the IRL Inquiries sheet. These scripts have been deployed as web apps so that the deployed frontend can fetch and post data to these sheets.

In case of future changes, please ensure that the following steps are followed:
1. Open the Google Apps Script project, and refresh the script to ensure that the latest changes are present.
2. Choose Deploy -> New deployment.
3. Select "Web app" as the type of deployment.
4. Enter a description for the deployment (optional, but recommended).
5. Under "Execute as", select "Me" to ensure the script runs with your permissions.
6. Under "Who has access", select "Anyone" to allow public access to the web app.
7. Click "Deploy" to create a new deployment. Record the new URL and place it in ```frontend/.env``` file (as described above).
8. Repeat the above steps for the second script (IRL Inquiries).


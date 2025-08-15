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

### Deployment (Frontend - GitHub Pages)

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
 
3. Deployment scripts inside ```package.json```.

Two scripts with ```'deploy'``` prefix have been added to the scripts object.

| Script | Description |
|--------|-------------|
| ```deploy:prod ```| Builds the React App for production (custom domain), outputs the static files to the dist folder, creates a 404.html SPA fallback, includes the CNAME file, and publishes the contents of dist to the gh-pages branch on the repository (this is used by GitHub Pages to serve the live site at the custom domain). |
| ```deploy:gh-pages``` | Builds the app in test/preview mode (for the GitHub Pages project URL), outputs to the dist folder, creates a 404.html, and publishes to the gh-pages-test branch (useful for staging or preview). We will mostly use the ```deploy:prod``` command. |

4. Deployment to GitHub Pages.

- To deploy the app from the custom domain (www.inclusiverealitylab.org), run the command ```npm run deploy:prod``` from ```frontend``` folder. This will build the app by performing the following steps: 
  - Build the app with base: '/' for the custom domain.
  - Copy index.html → 404.html for SPA routing.
  - Include the ```public/CNAME ```file in the build. 
  - Push the contents of ```dist``` to the ```gh-pages``` branch of the repository (automatically created on the first run).

- Then in GitHub -> Settings -> Pages:
    - Source : Deploy from a branch
    - Branch : ```gh-pages```
    - Folder : ```/ (root)```
    - Custom domain: www.inclusiverealitylab.org
   - The website will be available at ```https://www.inclusiverealitylab.org/``` after a few minutes.

- If deploying in preview mode (npm run deploy:gh-pages), the site will be available at:
```https://inclusiverealitylab.github.io/inclusiverealitylab-website/```

#### Update Steps
Anytime you make changes to the frontend code that you want to deploy to the live site (production/release ready changes):
1. Commit your changes to your working branch.
2. Run : ```npm run deploy:prod```. 
3. Wait ~1 minute for GitHub Pages to update the live site.

**NOTE** :
- Pushing to ```main``` will not update the live site, you must run the deploy script.
- Keep ```public/CNAME``` in the repo so the custom domain stays linked after each deployment.


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


# AudioFiles

AudioFiles is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to manage and play audio files.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Install Node.js from [nodejs.org](https://nodejs.org/).
- **npm**: Node Package Manager is included with Node.js.
- **MongoDB**: Set up a MongoDB database. You can use a local instance or a cloud service like MongoDB Atlas.
- **Git**: Install Git from [git-scm.com](https://git-scm.com/).

**Webex Contact Center Integration Setup**

This integration enables developers to manage .wav audio files within an organization. These audio files can be played to customers when calls are queued on the network until they are distributed to a team with available capacity. Additionally, audio files can be integrated into a Routing Strategy to play when an agent puts a call on hold.

Registering an [integration(https://developer.webex-cx.com/documentation/integrations).

- log in [here](https://developer.webex-cx.com/).
- select My Webex Apps from the menu under your avatar at the top of this page.
- You'll need to provide some basic information such as the name and description of your integration.
- Provide redirect URI(s) and scopes during registration. For more information on scopes, please see the section below about the environment variables and get the redirect from there.

- After successful registration, you'll be taken to a different screen that displays your integration's newly created Client ID and Client Secret. The Client Secret will only be shown once so please copy it and keep it safe!

To create and manage audio files, you need:

- **Adminstrator Role**: you can get a developer sandbox [here](https://developer.webex-cx.com/sandbox).
- **The appropriate scopes**: ```cjp:config_write``` or ```cjp:config_read```.

### API ENDPOINT

Create a New Audio File
- **Endpoint**: ```POST /organization/{orgid}/audio-file```
- **Description**: Create a new audio file in a given organization

Delete Specific Audio File by ID
- **Endpoint**: ```DELETE /organization/{orgid}/audio-file/{id}```
- **Description**: Delete an existing audio file by ID in a given organization.

Partially Update Audio File by ID
- **Endpoint**: ```PATCH /organization/{orgid}/audio-file/{id}```
- **Description**: Partially update an audio file by ID in a given organization.

List Audio Files
- **Endpoint**: ```GET /organization/{orgid}/v2/audio-file```
- **Description**: Retrieve a list of audio files in a given organization.

### Getting Started

Follow these steps to get the application up and running:

### Environment Variables

This project involves integrating with Webex Contact Center using specific environment variables for configuration. To ensure the application works correctly, you need to rename the `.env.example` file to `.env` and provide the correct values for each variable.

## Steps to Configure Environment Variables

1. **Rename the File**:
   - Navigate to the root directory of your project.
   - Rename the `.env.example` file to `.env`.

2. **Fill in the Environment Variables**:
   - Open the newly renamed `.env` file.
   - Replace the placeholder values with your actual configuration details.

### Required Environment Variables

- **MONGO_URI**:
  - Format: `mongodb+srv://YOURCLUSTER.mongodb.net/`
  - Description: The connection URI for your MongoDB cluster. Ensure this URI points to the correct cluster used for storing application data.

- **PORT**:
  - Example: `5000`
  - Description: The port number on which your application will run. You can use the default port or choose another available port.

- **CLIENT_ID**:
  - Format: `YOUR_WXCC_CLIENTID`
  - Description: The client ID provided by Webex Contact Center for authentication. This should be replaced with your actual client ID.

- **CLIENT_SECRET**:
  - Format: `YOUR_WXCC_CLIENTSECRET`
  - Description: The client secret associated with your Webex Contact Center client ID. This is used for secure authentication.

- **REDIRECT_URI**:
  - Example: `http://localhost:5173/oauth`
  - Description: The URI to redirect to after authentication. Ensure this matches the redirect URI configured in your Webex Contact Center settings.

- Save the `.env` file after updating the values.
- Ensure the application can read these values correctly by restarting the application if necessary.

- **OAuth Authorize URL**:

    - Change the ```OAUTH AUTHORIZE URL``` in ```frontend/src/pages/Home.jsx``` to the proper Authorization url provided in the black box on the integration registration page. (My Apps section of Webex developer portal)

## Important Notes

- Keep the `.env` file secure and do not expose it in public repositories.
- Verify that each value is correct and corresponds to your Webex Contact Center setup and MongoDB configuration.

### Clone the Repository

1. Open your terminal.
2. Run the following command to clone the repository:

   ```bash
   git clone <repository-url>
   ```
3. Navigate to the root directory of the project:
    ```bash
    cd audiofiles
    ```
### Set Up the Backend
1. install dependencies
    ```bash
    npm install
    ```
2. start the backend server :
    ```bash
    npm run dev
    ```
    This will start the backend server using nodemon. The server will
    automatically restart if you make any changes to the backend code.

### Set Up the Frontend
1. Open a new terminal window and navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install the frontend dependencies:
    ```bash
    npm install
    ```
3. Start the Frontend development server :
    ```bash
    npm run dev
    ```
    This will start the frontend using Vite. You can view the app in your
    browser at the URL provided in the terminal. It is suggested to do this incognito to prevent session sharing. Use the developer sandbox admin credentials.


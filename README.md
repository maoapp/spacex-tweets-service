# SpaceX Launch Tracker Service

## Project Description

A microservice in Node.js that provides a secure and scalable backend for the space launch tracking application. This service allows users to query information about past and upcoming space launches using the public SpaceX API and to access recent tweets related to SpaceX or space launches through the Twitter API.

## Methodology

To build the Space Launch Tracker Service effectively, I adopted a structured approach that involved setting up the project foundation, defining the architecture, and integrating the necessary tools to ensure a robust and scalable service. This initial setup established the base for further tasks, such as defining the API routes for accessing SpaceX launch data, integrating Twitter for relevant tweets, and securing API keys.

For data fetching and API management, I used **Axios** to handle HTTP requests to external APIs (SpaceX and Twitter). **Express.js** was selected as the backend framework due to its flexibility and efficient routing capabilities. Additionally, I implemented **CORS** to restrict access to authorized clients only and **dotenv** to securely manage environment variables, especially sensitive API keys and tokens.

## Development Tasks Completed

The following tasks were completed in sequential order:

1. **Project Setup**: Initialized project structure, configuration, and dependencies. (initial commit)
   
3. [- Launches data service.](https://github.com/maoapp/spacex-tweets-service/pull/1):
   - Integrated SpaceX API to fetch upcoming and past launches.
     
4. [- Twitter data service.](https://github.com/maoapp/spacex-tweets-service/pull/2):
   - Integrated Twitter API to retrieve recent tweets about SpaceX and launches.
  
5. [- Launche details.](https://github.com/maoapp/spacex-tweets-service/pull/4):
   - Integrated SpaceX API to fetch launche details
   - Defined routes for retrieving specific launch details (e.g., date, location, mission status).
  
6. [- Twitter service cache implementation .](https://github.com/maoapp/spacex-tweets-service/pull/5):
   - Integrated cache service to avoid the rate limit error responses
  
7. [- Unit testing.](https://github.com/maoapp/spacex-tweets-service/pull/6):
   - Adding unit testing to services, routes , controllers and main
  
## Branching Strategy

For effective task management and code organization, the following branching strategy was employed:

- **Feature Branching**: Each main feature (e.g., Twitter integration, SpaceX data fetching) was developed in its own feature branch, allowing for isolated development and testing.
- **Fix Branching**: Bug fixes and refactoring tasks were handled in fix branches, focusing on resolving specific issues or enhancing code quality without introducing new functionality.

## Run Project locally

1.  Clone the repository:
   ```bash
   git clone https://github.com/maoapp/spacex-tweets-service.git
   ```

2.  Install dependencies:
   ```bash
   cd spacex-tweets-service
   npm install
   ```

3.  Start the development server:
   ```bash
   npm run dev
   ```
      
4.  Run the serivce in your browser at `http://localhost:8000`.


6.  Build service:

   ```bash
   npm run build
   ```


6.  Run Production:

   ```bash
   npm start
   ```


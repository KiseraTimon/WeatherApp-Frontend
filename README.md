# Weather App Frontend

## Introduction

This is a NextJS frontend application in a decoupled structure. The backend is implemented using Laravel.
Use the access link below to check it out:
[Laravel Backend](https://github.com/KiseraTimon/WeatherApp-Backend.git)

The project in general is an API service that fetches weather data from the OpenWeather resource.
The frontend, powered by NextJS, creates the necessary user interface to present retrieved information.
The backend, powered by Laravel - The PHP Framework, performs the API requests and prepares it for presentation.

For this repository, we will focus on the frontend.

## Getting Started

In a directory of your choice, create a folder named'frontend'
Move into this folder.

1. Installing NextJS

    ```bash
    npx create-next-app@latest frontend --typescript
    ```

    For the subsequent prompts, proceed as below.

    ```t

    Ok to proceed? (y)
    #y

    Would you like to use ESLint >> No/Yes
    #Yes

    Would you like to use Tailwind CSS >> No/Yes
    #Yes

    Would you like your code inside a `src/` directory? » No / Yes
    #Yes

    Would you like to use App Router? (recommended) » No / Yes
    #Yes

    Would you like to use Turbopack for `next dev`? » No / Yes
    #No

    Would you like to customize the import alias (`@/*` by default)? » No / Yes
    #No

    ```

2. Installing Dependencies

    This project used RippleUI and lucide-react dependencies within it's UI

    ```bash
    npm install rippleui
    ```

    ```bash
    npm install lucide-react
    ```

3. Pulling Repository

    With the dependencies installed and the setup complete, you can now pull this repository into your project

    In case you don't have the repository yet:

    ```bash
    git clone https://github.com/KiseraTimon/WeatherApp-Frontend.git
    ```

    The 'cd' into the directory

    In case you have cloned the repository already:

    ```bash
    git pull origin master
    ```

## Project Structure

By the end of the installation, your frontend directory should look like this:

```t
├── .next/           # NextJS setup files
|-- logs             # Contains log files for errors during development
|-- node_modules     # Contains node dependiencies during project initialization
|-- public           # Contains globally accessible assets of your project
├── src/             # Holds project source codes
|--|-- app/          # Holds NextJS app deployment files
├──├── assets/       # Custom made folder holding project assets
├──├── Components/   # Custom made folder holding reusable react components
├──├── Pages/        # Custom made folder holding Context API for global state management
├──├── tests/        # Testing environment before implementing features
├──├── utils/        # Utility file holding reused functions like error handling logic and terminal message formats
├── .gitignore       # Git ignore file
|-- eslint.config.mjs# ESLint Configurations
|-- issue.txt        # Contains app issue details up to the latest commit
|-- next.config.ts   # NextJS app configuration file
├── package.lock.json# Project dependencies
├── package.json     # Project dependencies
|-- postcss.config.ts# PostCSS configuration file
├── tsconfig.json    # Typescript configuration file
└── README.md        # Project documentation
```

## Usage

With installation complete, run the command below on your terminal, within the directory

1. Starting Development Server

    ```bash
    npm run dev
    ```

    This should start a development server, alongside the localhost URL to access your application

2. Functional Application

    With the server up and running, you can access the interface by pasting the URL on your termnal.
    Alternatively, hold 'Ctrl' (only on Windows) and click the link

    You can now use the search bar to retrieve weather data for various locations around the world
    Ensure you have populated the `env.local` file appropriately with your API details, as provided in the `assets` section of this document.

## Future Possible Enhancements

The current application does not capture the user's current address to fetch default weather data.
As a future update, the application will be able to capture native address by getting the user's consent to use their GPS location
The retrieved entries would then function populate certain API parameters to get weather data accurately

## Acknowledgements

[OpenWeather](https://openweathermap.org/) For providing the API to get weather data

## Assets

`env.local` file

```t
NEXT_PUBLIC_API_TIMEOUT = 5000                                              # Timer for API requests
NEXT_PUBLIC_API_BASE_URL =                                                  # Backend Access URL

NEXT_PUBLIC_TEMP_URL = http://api.openweathermap.org/geo/1.0/direct?q       # OpenWeather API Public URL
NEXT_PUBLIC_TEMP_API =                                                      # API Key
```

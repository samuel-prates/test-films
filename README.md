# Test Movies

## Description
Software developed with the sole purpose of demonstrating how to produce code with the minimum of detail

## Technical
* Organization based on Hexagonal Architecture. Layers:
    * Application
    * Domain
    * Infrastructure
    * Interfaces (entrypoints)
* NodeJs language Version 20.*.

## Installation
* You can start by installing via the link https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

* Start the application with the command:
``` npm run dev ```

* If you want to run the tests, use the command
``` npm run test ```

## Examples
* There are three registered routes:
    * ``` curl --location 'https://localhost:3000/api/movies'  --form 'file=@"/C:/Users/user/projetos/test-films/test/data/test.csv"' ```
    * ``` curl --location 'https://localhost:3000/api/producers' ```
    * ``` curl --location 'https://localhost:3000/api/producers/winners' ```
* If you want to use an example file, there is one in the path: docs/example.csv
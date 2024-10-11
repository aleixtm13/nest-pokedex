<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Execution steps
1. Clone the repository
2. Execute ```npm install```
3. Tener Nest CLI instalado
    - Ejecutar ```npm install -g @nestjs/cli```
4. Clone archive __.env.template__ and rename the copy to __.env.__
5. Fill the environment variables with the values of the __.env__ file
6. Execute ```npm run start:dev```
7. Thow up the database
    - Execute ```docker-compose up -d```
8. Rebuild the database
    - ``` localhost:3000/api/v2/seed``` 
    

## Main stack
* NestJS
* MongoDB

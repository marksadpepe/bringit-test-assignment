# Backend NestJS
The project is a NestJS backend organized as follows:
- **README.md** - project documentation
- **.gitignore** - file for ignoring unnecessary files in GIT
- **.env.example** - example of configuration file
- **package.json** - file with project dependencies and scripts
- **tsconfig.json** - TypeScript configuration file
- **nest-cli.json** - NestJS CLI configuration file
- **build/** - directory for project build files
- **src/** - main source code directory of the application
    - **app.module.ts** - root module of the application
    - **main.ts** - entry point for the application
    - **controllers/** - directory containing User and Post controllers that handle HTTP requests
    - **services/** - directory containing User and Post services with business logic
    - **prisma/** - directory containing Prisma models
- **test/** - directory for tests

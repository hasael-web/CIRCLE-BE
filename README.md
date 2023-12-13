<!-- ABOUT THE PROJECT -->

## About The Project

This is a Restful API repository for Circle. This Restful API is built using ExpressJS and PostgreSQL.

### Technology Used

- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Cloudinary](https://cloudinary.com/)

## Getting Started

### Installation

- Clone this project with `https://github.com/hasael-web/CIRCLE-BE.git`
- Install package required with `yarn`
- Setting .env

```bash
NODE_ENV=
PORT=

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

AMQP_SERVER=

REDIS_PORT=
REDIS_HOST=
REDIS_PASSWORD=
```

- Migrate database using `yarn run migrate:up`

### Executing program

- Run program with `yarn run dev` for development and `yarn run start` for production (must be compiled first with `yarn run compile`)

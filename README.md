# Anguka Nayo Cinemaz
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Anguka Nayo Cinemaz is a movie theatre site that enables users to perform CRUD operations on movies using a JSON server. Users can read, create/add, update, and delete movie information seamlessly through the application. This functionality is achieved using the FETCH, GET, POST, DELETE, and PATCH methods.

## API Reference

### Get all movies

```http
GET /api/movies
```

Retrieves a list of all movies stored in the database.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

### Get a specific movie

```http
GET /api/movies/${id}
```

Retrieves details of a specific movie identified by its `id`.

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID of the movie to fetch |

### Add a new movie

```http
POST /api/movies
```

Adds a new movie to the database. Requires a JSON payload with movie details.

### Update a movie

```http
PATCH /api/movies/${id}
```

Updates the details of a specific movie identified by its `id`. Requires a JSON payload with the updated movie information.

### Delete a movie

```http
DELETE /api/movies/${id}
```

Deletes a specific movie from the database identified by its `id`.

## Authors

- [@abudhosamuel](https://www.github.com/abudhosamuel)


## License

[MIT](https://choosealicense.com/licenses/mit/)

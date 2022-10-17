# projeto16-shortly

## Routes:

### Token example (Header):
```bash
  Authentication: Bearer yourToken
```


### Authentication:
- /signup (POST)
```bash
{
  name: "carlos",
  email: "carlos@driven.com",
  password: "123",
  confirmPassword: "123"
}
```
- /signin (POST)
```bash
{
  email: "carlos@driven.com",
  password: "123"
}
```
returns
```bash
{
  {token: key}
}
```

### Urls:
- /urls/shorten (POST - Needs Token)
```bash
{
 "url": "https://..."
}
```
returns
```bash
{
 "shortUrl": "a8745bcf"
}
```

- /urls/:id (GET)
- /urls/:id (DELETE - Needs Token)
- /urls/open/:shortUrl (GET)

### Users:
- /users/me (GET - Needs Token)

### Ranking:
- /ranking (GET)

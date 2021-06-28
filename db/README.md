Example of the "result" object that pg returned after an "INSERT" command, with no specified return: 

```Result {
  command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [],
  fields: [],
  _parsers: undefined,
  _types: TypeOverrides {
    _types: {
      getTypeParser: [Function: getTypeParser],
      setTypeParser: [Function: setTypeParser],
      arrayParser: [Object],
      builtins: [Object]
    },
    text: {},
    binary: {}
  },
  RowCtor: null,
  rowAsArray: false
}```

positive result of this query: 
  ```const res = await db.query('SELECT * FROM development_user WHERE email = $1', [email]);```

is:
```{
  id: 1,
  name: 'Winter',
  role: 'user',
  email: 'abc@gmail.com',
  password: '$2b$10$dFyk/plrGMaZL2zFKnpCkukOHSk86TgSoGc2eudoWa4xaiisU7ZSC'
}```
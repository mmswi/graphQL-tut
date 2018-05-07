Following the tutorial: https://www.howtographql.com/graphql-js/1-getting-started/

https://www.howtographql.com/graphql-js/4-adding-a-database/
Prisma URL: https://eu1.prisma.sh/public-charmsword-651/hackernews-node/dev

In cd database
used: prisma deploy
used: prisma token - and copy the token in the playground headers
{
  "Authorization": "Bearer __COPY HERE TOKEN__"
}

https://www.howtographql.com/graphql-js/5-connecting-server-and-database/

After .graphqlconfig.yml
used: prisma deploy in the root directory

In root: node src/index.js
New terminal tab, in root: graphql playground
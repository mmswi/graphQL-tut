const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
    // 1 encrypting the User’s password
    const password = await bcrypt.hash(args.password, 10)
    // 2 use the Prisma binding instance to store the new User in the database.
    // hardcoding the id in the selection set
    const user = await context.db.mutation.createUser({
      data: { ...args, password },
    }, `{ id }`)
  
    // 3 generating a JWT which is signed with an APP_SECRET
    const token = jwt.sign({ userId: user.id }, APP_SECRET)
  
    // 4 return the token and the user
    return {
      token,
      user,
    }
  }

async function login(parent, args, context, info) {
  // 1 using the prisma binding to get the user by email and return the id and passowrd
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  // 2 comparing the received password from the mutation with the password in the db
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  // 3 returning the token and user
  return {
    token,
    user,
  }
}

function post(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    },
    info,
  )
}

module.exports = {
    signup,
    login,
    post,
}
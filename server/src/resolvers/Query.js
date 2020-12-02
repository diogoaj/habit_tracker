function users(parent, args, context, info) {
  return context.prisma.user.findMany()
}

async function habits(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({where: {username: args.username}})

  if (user === null) {
    return null
  }

  return context.prisma.habit.findMany({
    where: {userId: user.id}
  })
}

module.exports = {users, habits}
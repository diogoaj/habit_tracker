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

async function habitDays(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({where: {username: args.username}})

  if (user === null) {
    return []
  }

  const habit = await context.prisma.habit.findFirst({
    where: {
      userId: user.id,
      name: args.name
    }
  })

  if (habit === null) {
    return []
  }

  return context.prisma.date.findMany({
    where: {
      habitId: habit.id,
      month: args.month,
      year: args.year
    }
  })
}


module.exports = {users, habits, habitDays}
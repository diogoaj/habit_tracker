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

async function checkedDays(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({where: {username: args.username}})
  const habit = await context.prisma.habit.findFirst(
    {
      where: {
        name: {
          equals: args.habit_name,
        },
        userId: {
          equals: user.id,
        },
      },
    })

  if (habit === null) {
    return []
  }

  return context.prisma.date.findMany({
    where: {habitId: habit.id}
  })
}

module.exports = {users, habits, checkedDays}
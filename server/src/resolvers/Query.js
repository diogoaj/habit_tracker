function users(parent, args, context, info) {
  return context.prisma.user.findMany()
}

async function habits(parent, args, context, info) {
  const { userId } = context;

  return context.prisma.habit.findMany({
    where: {userId: userId}
  })
}

async function habitDays(parent, args, context, info) {
  const { userId } = context;

  const habit = await context.prisma.habit.findFirst({
    where: {
      userId: userId,
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
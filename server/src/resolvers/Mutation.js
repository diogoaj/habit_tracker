async function createUser(parent, args, context, info) {
    const newUser = context.prisma.user.create({
        data: {
            username: args.username,
            habits: []
        }
    })

    return newUser
} 

async function createHabit(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { username: args.username } })
    
    const newHabit = context.prisma.habit.create({
        data: {
            name: args.name,
            days: [],
            user: {connect: {id: user.id}},
        }
    })

    context.prisma.user.update({
        where: {username: args.username},
        data: newHabit
    })

    return newHabit
} 

async function checkDay(parent, args, context, info) {
    const user = await context.prisma.user.findUnique({ where: { username: args.username } })
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

    const newDate = context.prisma.date.create({
        data: {
            epoch: args.day,
            habit: {connect: {id: habit.id}},
        }
    })
    
    context.prisma.habit.update({
        where: {
             where: {
              name: {
                equals: args.habit_name,
              },
              userId: {
                equals: user.id,
              },
            },
          },
        data: newDate
    })

    return newDate
} 

module.exports = {
    createUser,
    createHabit,
    checkDay
  }
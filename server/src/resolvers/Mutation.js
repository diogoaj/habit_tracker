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

module.exports = {
    createUser,
    createHabit
  }
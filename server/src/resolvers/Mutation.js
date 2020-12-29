const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');
const { APP_SECRET } = require('../config');

async function registerUser(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
      data: {
          username: args.username,
          password: password,
          habits: []
      }
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  
  return { token, user };
} 

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { username: args.username } })

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(
    args.password,
    user.password
  );
  
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {token, user};

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
    const habit = await context.prisma.habit.findFirst({
      where: {
          name: args.habit_name,
          userId: user.id
      }
    })

    const date = await context.prisma.date.findFirst({
        where: {
          day: args.day,
          month: args.month,
          year: args.year,
          habitId: habit.id
        }
      })

    if (date !== null) {
      return null
    }

    const newDate = context.prisma.date.create({
        data: {
            day: args.day,
            month: args.month,
            year: args.year,
            habit: {connect: {id: habit.id}},
        }
    })
    
    context.prisma.habit.update({
        where: {
          name: args.habit_name,
          userId: user.id,
          },
        data: newDate
    })

    return newDate
}
null


async function uncheckDay(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { username: args.username } })
  const habit = await context.prisma.habit.findFirst({
        where: {
          name: args.habit_name,
          userId: user.id,
        }
      })

  const d = await context.prisma.date.findFirst({
      where: {
        day: args.day,
        month: args.month,
        year: args.year,
        habitId: habit.id,
        }
      })

  if (d === null){
    return null
  }

  await context.prisma.date.delete({ 
      where: { id: d.id } 
  })

  return d
}



module.exports = {
    registerUser,
    login,
    createHabit,
    checkDay,
    uncheckDay,
  }
function days(parent, args, context) {
    return context.prisma.habit.findUnique({where: {id: parent.id} }).days()
}

module.exports = {days,}

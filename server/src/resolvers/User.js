function habits(parent, args, context) {
    return context.prisma.user.findUnique({where: {id: parent.id} }).habits()
}

module.exports = {habits,}

const mock_data = [
    {
      id: '0',
      name: 'Reading',
      days: [1606832578, 1606832588]
    },
    {
      id: '1',
      name: 'Programming',
      days: [1606832598, 1606832678]
    }
]

function habits(parent, args, context, info) {
    return mock_data
}

module.exports = {habits,}

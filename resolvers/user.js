const {users, tasks} = require('../constants');

module.exports = {
  Query: {
    greetings: () => "Hello",
    users: () => users,
    user: (_, {id}) => tasks.find(task => task.id === id)
  },
  Mutation: {
  },
  User: {
    tasks: ({id}) => {
      return tasks.find(task => task.id === id)
    }
  }
}

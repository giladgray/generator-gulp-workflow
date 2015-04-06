var src = './app';
var dest = 'dest';

module.exports = {
  <% _.forEach(tasks, function(task) { %>
  <%= task.task %>: {
    src: "#{src}/<%= task.glob %>",
    dest: dest,
    watch: true
  },<% }); %>
}

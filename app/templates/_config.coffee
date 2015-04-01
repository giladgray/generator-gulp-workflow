src = './app'
dest = 'dest'

module.exports =
  <% _.forEach(tasks, function(task) { %>
  <%= task.command %>:
    src: "#{src}/<%= task.glob %>"
    dest: dest
    watch: true<% }); %>

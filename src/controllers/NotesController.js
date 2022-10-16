const knex = require("../database/knex");

class NotesController{
  async create(request, response){
    const { title, description, tags, links} = request.body;
    const { user_id } = request.params;

    const node_id = await knex("notes").insert({
      title,
      description,
      user_id
    });

    const linksInsert = links.map(link => {
      return {
        node_id,
        url: links
      }
    });

    await knex("links").insert(linksInsert);

    const tagsInsert = tags.map(name => {
      return {
        node_id,
        name,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);

    response.json();
  }
}

module.exports = NotesController;
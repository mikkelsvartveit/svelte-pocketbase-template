/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f1rdrmhqtl9k8d")

  collection.viewRule = "@request.auth.id != \"\" && owner = @request.auth.id"
  collection.createRule = ""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "tckrkp6l",
    "name": "owner",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("9f1rdrmhqtl9k8d")

  collection.viewRule = null
  collection.createRule = null

  // remove
  collection.schema.removeField("tckrkp6l")

  return dao.saveCollection(collection)
})

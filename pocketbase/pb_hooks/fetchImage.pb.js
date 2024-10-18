/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/custom", (c) => {
  const collection = $app.dao().findCollectionByNameOrId("images");
  const record = new Record(collection);
  const form = new RecordUpsertForm($app, record);

  form.addFiles(
    "file",
    $filesystem.fileFromUrl("https://picsum.photos/200/300"),
  );

  form.submit();

  return c.json(200, { message: "Hello" });
});

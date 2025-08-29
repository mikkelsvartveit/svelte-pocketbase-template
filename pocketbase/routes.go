package main

import (
	"net/http"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func setupCustomRoutes(app *pocketbase.PocketBase) {
    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
        se.Router.GET("/api/custom/helloworld", func(e *core.RequestEvent) error {
            return e.String(http.StatusOK, "Hello World!")
        })

        return se.Next()
    })
}

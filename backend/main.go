package main

import (
	"backend/pkg"
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()

	// get vm ticket
	router.GET("/api/vm/ticket", func(c *gin.Context) {
		ctx := context.Background()
		vmName := c.Query("vm_name")
		if vmName == "" {
			c.JSON(http.StatusBadRequest, gin.H{
				"msg": "bad query params, eg: xxx",
			})
			return
		}

		res, err := pkg.GetVmTicket(ctx, vmName)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"msg": fmt.Sprintf("%v", err),
			})
		} else {
			c.JSON(http.StatusOK, res)
		}
	})

	_ = router.Run(":8888")
}

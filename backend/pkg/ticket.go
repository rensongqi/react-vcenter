package pkg

import (
	"context"
	"fmt"
	logger "github.com/sirupsen/logrus"
	"github.com/vmware/govmomi/vim25/mo"
	"github.com/vmware/govmomi/vim25/types"
	"path/filepath"
)

// GetVmTicket get vm ticket
func GetVmTicket(ctx context.Context, vmName string) (map[string]interface{}, error) {
	_, finder, err := vcClient(ctx)
	if err != nil {
		return nil, err
	}
	vml, _ := finder.VirtualMachineList(ctx, "*")
	vmInventoryPath := ""
	for _, machine := range vml {
		vmBaseInventoryPath := filepath.Base(machine.InventoryPath)
		if vmBaseInventoryPath == vmName {
			vmInventoryPath = machine.InventoryPath
		}
	}
	logger.Info(vmInventoryPath)

	// find vm
	vm, err := finder.VirtualMachine(ctx, vmInventoryPath)
	if err != nil {
		logger.Errorf("vm not found, err: %v", err)
		return nil, err

	}
	var mvm mo.VirtualMachine
	err = vm.Properties(ctx, vm.Reference(), []string{"summary", "config"}, &mvm)
	if err != nil {
		logger.Errorf("update to get VM properties, err: %v", err)
		return nil, err
	}
	// get web mks ticket
	ticket, err := vm.AcquireTicket(ctx, string(types.VirtualMachineTicketTypeWebmks))
	if err != nil {
		logger.Error("unable to acquire ticket")
		return nil, err
	}
	res := map[string]interface{}{
		"host":   ticket.Host,
		"port":   ticket.Port,
		"ticket": ticket.Ticket,
	}
	consoleURL := fmt.Sprintf("wss://%s:%d/ticket/%s", ticket.Host, ticket.Port, ticket.Ticket)
	logger.Info(consoleURL)
	return res, nil
}

package pkg

import (
	"context"
	"flag"
	logger "github.com/sirupsen/logrus"
	"github.com/vmware/govmomi"
	"github.com/vmware/govmomi/find"
	"github.com/vmware/govmomi/object"
	"net/url"
)

var (
	insecureFlag = true
	vcenterURL   = flag.String("vcurl", "https://rsq:123456@vcenter.rsq.cn/sdk", "URL of vCenter Server instance")
)

func vcClient(ctx context.Context) (*govmomi.Client, *find.Finder, error) {
	flag.Parse()
	u, err := url.Parse(*vcenterURL)
	if err != nil {
		logger.Errorf("[client] error parsing url %s err: %v", *vcenterURL, err)
		return nil, nil, err
	}

	// connect to vcenter
	client, err := govmomi.NewClient(ctx, u, insecureFlag)
	if err != nil {
		logger.Errorf("[client] connect to vcenter err: %v", err)
		return nil, nil, err
	}

	finder := find.NewFinder(client.Client, true)

	// set datacenter
	dcLists, err := finder.DatacenterList(ctx, "*")
	var dc *object.Datacenter
	if len(dcLists) != 0 {
		dc = dcLists[0]
	}
	finder.SetDatacenter(dc)

	return client, finder, nil
}

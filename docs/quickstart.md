---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
---

## Overview

This page should give a good indication of how to get started with
`pancloud`.

First off, ensure `pancloud` is `installed <installation>` and
`up-to-date <installation>`.

Let's start with a basic example.

<div class="note">

<div class="admonition-title">

Note

</div>

The examples below assume the existence of a `Developer Token
<credentials>` or a credentials.json file that has been properly
`generated <credentials>`. Please see the `Credentials <credentials>`
page for specific usage details.

</div>

## Querying Logging Service

Begin by importing `~pancloud.logging.LoggingService` and
`~pancloud.credentials.Credentials`:

``` python
from pancloud import LoggingService
from pancloud import Credentials
```

Next, let's construct a `~pancloud.logging.LoggingService` instance:

``` python
ls = LoggingService(
    url="https://api.us.paloaltonetworks.com",
    credentials=Credentials()
)
```

Now, let's define our `~pancloud.logging.LoggingService.query` JSON
body:

``` python
b = {
    "query": "select * from panw.traffic limit 5",
    "startTime": 0,  # 1970
    "endTime": 1609459200,  # 2021
    "maxWaitTime": 0  # no logs in initial response
}
```

Pass the JSON body to `~pancloud.logging.LoggingService.query` to query
for the last 5 traffic logs:

``` python
q = ls.query(b)
```

Print the `~pancloud.logging.LoggingService.query` results:

``` python
print(QUERY: {}".format(q.text))
```

``` json
{"queryId":"222a45ff-4f38-4418-be7d-45b511f191db","sequenceNo":0,"queryStatus":"RUNNING","clientParameters":{},"result":{"esResult":null,"esQuery":{"table":["panw.traffic"],"query":{"aggregations":{},"size":5},"selections":[],"params":{}}}}
```

Awesome\! So how do we `~pancloud.logging.LoggingService.poll` for
results?

``` python
p = ls.poll(query_id, 0, params)  # starting with sequenceNo 0
```

Cool. Let's take a peek at the results:

``` python
print(RESULTS: {}".format(p.text))
```

``` json
{"queryId":"222a45ff-4f38-4418-be7d-45b511f191db","sequenceNo":0,"queryStatus":"JOB_FINISHED","clientParameters":{},"result":{"esResult":{"took":183,"hits":{"total":73708,"maxScore":2,"hits":[{"_index":"147278001_panw.all_2018071000-2018072000_000000","_type":"traffic","_id":"147278001_lcaas:1:261405:0","_score":2,"_source":{"risk-of-app":"4","logset":"ForwardToLoggingService","bytes_received":1987,"natsport":41050,"sessionid":696398,"type":"traffic","parent_start_time":0,"packets":15,"characteristic-of-app":["able-to-transfer-file","has-known-vulnerability","tunnel-other-application","prone-to-misuse","is-saas"],"dg_hier_level_4":0,"dg_hier_level_1":11,"dg_hier_level_3":0,"dg_hier_level_2":0,"action":"allow","recsize":1524,"from":"L3-Untrust","parent_session_id":0,"repeatcnt":1,"app":"ms-rdp","vsys":"vsys1","nat":1,"technology-of-app":"client-server","pkts_r
```
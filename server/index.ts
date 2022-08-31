import express, { Request, Response } from "express";
import axios from "axios";
import os from "os";
const app = express();
const port = 4000;

app.get("/api/shopifystatus", (req: Request, res: Response) => {
  axios({
    method: "post",
    headers: {
      "x-shopify-react-xhr": 1
    },
    url: "https://www.shopifystatus.com/graphql",
    data: {
      "operationName": "StatusQuery",
      "variables": { "handle": null },
      "query": `query StatusQuery($handle: String) {
  status(handle: $handle) {
    name
    status
    warning
    currentIncidents {
      id
      name
      startedAt
      resolvedAt
      summary
      status
      components {
        label
        state
        __typename
      }
      __typename
    }
    components {
      label
      state
      __typename
    }
    __typename
  }
}`
    }
  })
    .then(resolve => {
      res.status(200);
      res.type("application/json");
      res.end(JSON.stringify(resolve.data.data.status.components));
      return;
    })
    .catch(reject => {
      res.status(500);
      res.end();
      console.error(reject);
    })
});

app.get("/api/amazonstatus", (req: Request, res: Response) => {
  axios({
    method: "get",
    url: "https://status.aws.amazon.com/currentevents.json"
  })
    .then(resolve => {
      res.status(200);
      res.type("application/json");
      res.end(JSON.stringify(resolve.data));
      return;
    })
    .catch(reject => {
      res.status(500);
      res.end();
      console.error(reject);
    })
})

app.get("/api/sysinfo", (req: Request, res: Response) => {
  var output: any;
  output.hostname = os.hostname();
  output.cpus = os.cpus();
  output.freemem = os.freemem();
  output.totalmem = os.totalmem();
  output.uptime = os.uptime();

  res.status(200);
  res.type("application/json");
  res.end(JSON.stringify(output));
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
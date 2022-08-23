import express, { Request, Response } from "express";
import axios from "axios";
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
  }).then(result => {
    res.status(200);
    res.type("application/json");
    res.end(JSON.stringify(result.data.data.status.components));
    return;
  }).catch(reject => {
    res.status(500);
    res.end();
    throw new Error(reject);
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
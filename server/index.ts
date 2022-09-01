import express, { Request, Response } from "express";
import axios from "axios";
import osUtils from "node-os-utils"
import path from "path";
import url from "url"
import fs from "fs";
const app = express();
const port = 4000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// fun stuff
const origLog = console.log.bind(console);

if (!fs.existsSync("log.txt")) {
  fs.writeFileSync("log.txt", "");
}

var stream = fs.createWriteStream("log.txt");

console.log = (...data) => {
  var str = "";

  for (var i = 0; i < data.length; i++) {
    str += data[i];
    if (i != data.length - 1) {
      str += " ";
    } else {
      str += "\n";
    }
  }

  stream.write(str);

  origLog(...data);
}

// normal code
app.get("/api/shopifystatus", (req: Request, res: Response) => {
  console.log(`Shopify Status Query at ${new Date().toUTCString()}`);

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
    .then((resolve: any) => {
      res.status(200);
      res.type("application/json");
      res.end(JSON.stringify(resolve.data.data.status.components));
      return;
    })
    .catch((reject: any) => {
      res.status(500);
      res.end();
      console.error(reject);
    })
});

app.get("/api/amazonstatus", (req: Request, res: Response) => {
  console.log(`Amazon Status Query at ${new Date().toUTCString()}`);

  axios({
    method: "get",
    url: "https://status.aws.amazon.com/currentevents.json"
  })
    .then((resolve: any) => {
      res.status(200);
      res.type("application/json");
      res.end(JSON.stringify(resolve.data));
      return;
    })
    .catch((reject: any) => {
      res.status(500);
      res.end();
      console.error(reject);
    })
})


var hostname = osUtils.os.hostname();
var model = osUtils.cpu.model();
var count = osUtils.cpu.count();

app.get("/api/sysinfo", (req: Request, res: Response) => {
  console.log(`System Information Query at ${new Date().toUTCString()}`);

  var output: any = {};
  osUtils.cpu.usage()
    .then(resolve => {
      output.cpu = resolve;

      return osUtils.mem.info();
    })
    .then(resolve => {
      output.mem = resolve;

      return osUtils.netstat.inOut();
    })
    .then(resolve => {
      output.netstat = resolve;
      output.hostname = hostname;
      output.model = model;
      output.count = count;

      res.contentType("application/json");
      res.status(200);
      res.json(output);
      res.end();
    })
})

app.use("/assets", express.static("../client/dist/assets/"))

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});

// Closing Actions
[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
  process.on(eventType, onClose.bind(null, eventType));
})

function onClose() {
  console.log("Shutting down server...");
  let filesize = fs.statSync("log.txt").size;
  if (filesize > 1500000) {
    let buffer = fs.readFileSync("log.txt").toString().slice(filesize - 1000000);

    fs.writeFileSync("log.txt", buffer);
  }

  process.exit();
}
import { Client } from 'beapi-core'
import * as mcnet from 'mojang-net';

const client = new Client()

//Address of your API Endpoint
const playerPositionsEndpoint = "http://localhost:5400/playerpositions";

setInterval(() => {
  //Get All Players
  let players = client.players.getAll();
  //Create PlayerPosition Arary
  let playerpositions = new Array();
  
  //For Each Player
  players.forEach(player => {
    let dimension;
    //Translate Dimension to Int
    switch(player.getDimension().id){
      case "minecraft:overworld": {
        dimension = 0
      }
      case "minecraft:nether": {
        dimension = 1;
      }
      case "minecraft:end": {
        dimension = 2;
      }
      default: {
        dimension = 0
        break;
      }
    }
    let playerPos = {"Name": player.getName(), "DimensionId": dimension, "xCoord": player.getLocation().x, "zCoord": player.getLocation().z, "Color": "Yellow", "Visible": true}
    playerpositions.push(playerPos);
  });
  //Format Body for API format
  let body = JSON.stringify({ playerpositions });
  //Only grab the Array
  body = body.substring(19, body.length - 1)
  const req = new mcnet.HttpRequest(playerPositionsEndpoint);
  req.body = body;
  req.method = mcnet.HttpRequestMethod.POST;
  req.headers = [
    new mcnet.HttpHeader("Content-Type", "application/json"),
    
  ];
  const response: any = mcnet.http.request(req);
}, 100)
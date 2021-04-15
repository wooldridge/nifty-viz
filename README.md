# nifty-viz

Visualize NFT data with MarkLogic Data Hub.

## Requirements

- MarkLogic Data Hub 5.4
- Node.js 14

## Set Up MarkLogic Data Hub Nifty Project

A MarkLogic Data Hub instance provides the NFT data. See: https://github.com/wooldridge/data-hub-nifty-project

## Run Server

In first terminal:

1. `cd server`
2. `npm install`
3. `node setup` (Install REST server on MarkLogic to server Data Hub content)
4. `node server` (Start middle tier)

## Run UI

In second terminal:

1. `cd ui`
2. `npm install`
3. `npm start` (Start UI application)
4. Open the following in your browser: http://localhost:3006

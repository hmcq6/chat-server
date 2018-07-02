# chat-server

This README outlines the details of how to set up the (Ember + Redis + Node + WebSockets) Chat Server. This chat server is WebSockets only and *does not* accept connections through HTTP. The server connects to a redis instance and listens to keyspace events, updating the client when a relevent change has been made. 

## Overview

The `chat-server` app is a Node + WebSockets chat room server, intended to be used in tandem with the Ember based [`chat-client`](https://github.com/hmcq6/chat-client). The `chat-server` listens for WebSockets connections on port `7611` with a route matching the pattern (`/:channel/:user`), where channel is the chatroom name. The server listens for keyspace events on redis [`sets`](https://redislabs.com/ebook/part-1-getting-started/chapter-1-getting-to-know-redis/1-2-what-redis-data-structures-look-like/1-2-3-sets-in-redis/) and updates clients to changes in the chatroom through WebSockets. The server will create and read notifications from redis `sets` matching the pattern `*:messages`, where the wildcard is the channel (chatroom) name.

## Network Diagram
![(Ember + Redis + Node + WebSockets) chat network diagram](https://drive.google.com/uc?export=view&id=1uty6TKiL5NvknUNJgQAomB7D9PgH9ti3)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Redis](https://redis.io/download)

## Installation

* `git clone <repository-url>` this repository
* `cd chat-server`
* `npm install`

## Running / Development

* Ensure your redis server is accepting connections on port `6379`
* `npm start`
* Start the `chat-client`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

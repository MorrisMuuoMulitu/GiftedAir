import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { exec } from 'child_process';
import fs from 'fs';

dotenv.config();

async function start() {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  
  process.env.MONGODB_URI = uri;
  console.log(`🚀 In-memory MongoDB started at ${uri}`);
  
  // Create a temporary .env file for the backend
  const envContent = `MONGODB_URI=${uri}\nPORT=3000\nNODE_ENV=development\nFRONTEND_URL=http://localhost:5173\n`;
  fs.writeFileSync('backend/.env.mock', envContent);
  
  // Start the server using the mock .env
  const server = exec('node --env-file=backend/.env.mock backend/server.js');
  
  server.stdout.on('data', (data) => {
    console.log(`[Backend] ${data.trim()}`);
  });
  
  server.stderr.on('data', (data) => {
    console.error(`[Backend-Error] ${data.trim()}`);
  });
  
  process.on('SIGINT', async () => {
    await mongod.stop();
    process.exit();
  });
}

start();

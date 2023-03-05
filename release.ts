#!/usr/bin/env node

import path from 'node:path';
import fs from 'node:fs';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Loop over each directory inside of the dist directory and generate a tar ball for each of them
const distDir = path.resolve(__dirname, "./dist");
const distBlocks = fs.readdirSync(distDir);

distBlocks.forEach((distBlock) => {
  const tarBall = `${distBlock}.tar.gz`;
  const tarBallPath = path.resolve(__dirname, "./dist", tarBall);
  const tarBallCmd = `tar -czf ${tarBallPath} -C ${distDir} ${distBlock}`;
  exec(tarBallCmd);
});

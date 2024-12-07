#!/bin/bash
(cd frontend && rm -rf node_modules && npm install)
(cd backend && rm -rf node_modules && npm install)
rm -rf node_modules && npm install && npm run dev
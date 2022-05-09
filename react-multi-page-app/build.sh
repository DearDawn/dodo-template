#!/bin/bash

PROJECT_NAME=$1
PROJECT_PATH=$2

if [[ -z $PROJECT_NAME || ! -d $PROJECT_PATH ]]; then
  echo "params empty"
  exit 1
fi

echo $PROJECT_NAME $PROJECT_PATH

. /www/server/nvm/nvm.sh
# . ~/.nvm/nvm.sh

nvm use v16.10.0
if [ $? != 0 ]; then
  nvm install v16.10.0
fi

node -v
npm -v

echo "start install"
npm install

echo "start build"
npm run build

if [[ $? != 0 || ! -d './build' ]]; then
  echo "build failed, dir empty"
  exit 1
fi

PUBLIC_PATH=$PROJECT_PATH$PROJECT_NAME
echo "start moving" $PUBLIC_PATH

if [[ -d $PROJECT_PATH && $PROJECT_NAME ]]; then
  rm -rf $PUBLIC_PATH
fi

mv ./dist $PROJECT_PATH$PROJECT_NAME

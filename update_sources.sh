#!/bin/bash

cd CwBack 
./gradlew
./gradlew bootJar
cd ..
cp CwBack/build/libs/DroneNotificationLastIteration-0.0.1-SNAPSHOT-plain.jar meta/back/app.jar

cd CwUi
yarn
yarn build
cd ..
cp -r CwUi/dist meta/front/build
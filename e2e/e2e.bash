docker build ./e2e/. --tag vision-e2e
docker run --name=e2e-test --network=vision_e2e_net vision-e2e
docker rm e2e-test
docker image rm vision-e2e
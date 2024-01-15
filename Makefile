start:
	docker-compose up

start-migration:
	cd ./libs/common/src/prisma && npx prisma migrate dev

start-seeder:
	npx prisma db seed

start-test:
	docker build -t e2e ./e2e/.
	docker run -it --rm -t e2e
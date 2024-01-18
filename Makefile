start:
	docker-compose up

start-migration:
	cd ./libs/common/src/prisma && npx prisma migrate dev

start-seeder:
	npx prisma db seed

start-test:
	docker-compose up e2e
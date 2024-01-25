start:
    # local | staging | production
	STAGE_NAME=$(ENV) docker-compose -p "vision-$(ENV)"  up

test:
	echo $(TEST)

start-migration:
	cd ./libs/common/src/prisma && npx prisma migrate dev

start-seeder:
	npx prisma db seed

start-test:
	cd e2e && npm run test

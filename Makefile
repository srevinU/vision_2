start:
    # local | staging | production / make start ENV=bar
	STAGE_NAME=$(ENV) docker-compose -p "vision-$(ENV)"  up -d

start-migration:
	cd ./libs/common/src/prisma && npx prisma migrate dev

start-seeder:
	npx prisma db seed

start-test:
	cd e2e && npm run test

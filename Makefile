createnetwork:
		docker network create qr-net

dbcreate:
		docker run -d \
		--name my-postgres \
		-e POSTGRES_USER=postgres \
		-e POSTGRES_PASSWORD=123 \
		-e POSTGRES_DB=lite \
		--network qr-net \
		--rm \
		-p 5432:5432 \
		-v postgres_data:/var/lib/postgresql/data \
		postgres:15-alpine

apibuild:
		docker build -t api ./backend/Dockerfile

apirun:
		docker run -d \
		--name api \
		--rm \
		--network qr-net \
		-p 3500:3500 \
		api

sitebuild:
		docker build -t site ./frontend/front/Dockerfile

siterun:
		docker run -d \
		--name site \
		--rm \
		--network qr-net \
		-p 3000:3000 \
		site
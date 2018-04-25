.PHONY: test
test:
	docker-compose run --name tests --rm web npm test

.PHONY: build
build: #
	docker-compose up --build

.PHONY: run
run: #
	npm run dev

.PHONY: lint
lint:#
	jshint src test


REPORTER = spec

all: lint test

run:
	node app.js

test:
	cd as-shackjack-backend/ && npm install
	node as-shackjack-backend/src/app.js &
	node app.js

tests: test

lint:
	jshint src test app.js

tap:
	@NODE_ENV=test ./node_modules/.bin/mocha -R tap > results.tap

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive -R xunit > results.xml --timeout 3000

skel:
	mkdir src test
	touch app.js
	npm install mocha chai --save-dev

.PHONY: test tap unit jshint skel
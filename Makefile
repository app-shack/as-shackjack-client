REPORTER = spec

all: lint test

run:
	node app.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter $(REPORTER) --timeout 3000

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
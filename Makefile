
all: clean deps build

clean:
	rm -rf build

deps:
	npm install

build:
	npm run build


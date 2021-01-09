yarn_version = 2.4.0

help:
	: TODO

setup:
	command -v yarn || npm install -g yarn
	
	yarn --no-default-rc set version berry
	yarn set version $(yarn_version)
	
	yarn install

build_dev: clean
	yarn run build-dev

build: clean
	yarn run build

clean:
	rm -rf ../hugo/assets/

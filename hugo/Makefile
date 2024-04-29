version = 0.125.4
platform = darwin-universal

hugo = ./bin/hugo

opt = --minify --gc --logLevel 'debug'

help:
	: TODO

setup:
	mkdir -p ./bin/
	
	curl -L https://github.com/gohugoio/hugo/releases/download/v$(version)/hugo_extended_$(version)_$(platform).tar.gz \
	  | tar -zxv -f - -C ./bin/ hugo

server:
	$(hugo) server $(opt)

build: clean
	$(hugo) $(opt)

clean:
	rm -rf ./public/

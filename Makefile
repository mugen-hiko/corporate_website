webpack_opt = 
hugo_opt = 

help:
	: TODO

setup:
	$(MAKE) -C ./webpack/ setup $(webpack_opt)
	$(MAKE) -C ./hugo/ setup $(hugo_opt)

build:
	$(MAKE) -C ./webpack/ build $(webpack_opt)
	$(MAKE) -C ./hugo/ build $(hugo_opt)

APP_PORT    := 5173
NGROK_TOKEN := 3AOb1nxRiuQ7Xkw1e0CgyvU6crN_5X7W6TiC9NmhKHSSwuRP7
NGROK_URL   := womanly-modesta-gnathic.ngrok-free.dev

.PHONY: dev expose expose-stop help

## Start the Vite dev server
dev:
	npx vite --host 0.0.0.0 --port $(APP_PORT)

## Expose the app via ngrok
expose:
	npx ngrok http --authtoken=$(NGROK_TOKEN) --url=$(NGROK_URL) $(APP_PORT)

## Show available commands
help:
	@echo ""
	@echo "  make dev       Lancer le serveur Vite (port $(APP_PORT))"
	@echo "  make expose    Exposer l'app via ngrok"
	@echo ""
	@echo "  URL : https://$(NGROK_URL)"
	@echo ""

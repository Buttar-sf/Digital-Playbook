APP_PORT    := 5173
NGROK_TOKEN := 3AOb1nxRiuQ7Xkw1e0CgyvU6crN_5X7W6TiC9NmhKHSSwuRP7
NGROK_URL   := womanly-modesta-gnathic.ngrok-free.dev

.PHONY: dev expose expose-docker expose-stop help

## Start the Vite dev server
dev:
	npx vite --host 0.0.0.0 --port $(APP_PORT)

## Expose via ngrok (native — requires `ngrok` installed: brew install ngrok / choco install ngrok)
expose:
	ngrok http --authtoken $(NGROK_TOKEN) --url=$(NGROK_URL) $(APP_PORT)

## Expose via ngrok (Docker — fallback if ngrok not installed locally)
expose-docker:
	@docker stop ngrok 2>/dev/null || true
	@docker rm ngrok 2>/dev/null || true
	docker run --net=host -it --name ngrok \
		-e NGROK_AUTHTOKEN=$(NGROK_TOKEN) \
		ngrok/ngrok:latest http --url=$(NGROK_URL) $(APP_PORT)

## Stop ngrok Docker container
expose-stop:
	@docker stop ngrok 2>/dev/null || true
	@docker rm ngrok 2>/dev/null || true
	@echo "🛑  Tunnel ngrok arrêté"

## Show available commands
help:
	@echo ""
	@echo "  make dev            Lancer le serveur Vite (port $(APP_PORT))"
	@echo "  make expose         Exposer via ngrok (natif)"
	@echo "  make expose-docker  Exposer via ngrok (Docker)"
	@echo "  make expose-stop    Arrêter le tunnel Docker"
	@echo ""
	@echo "  URL : https://$(NGROK_URL)"
	@echo ""

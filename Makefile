APP_PORT    := 5173
NGROK_TOKEN := 3AOb1nxRiuQ7Xkw1e0CgyvU6crN_5X7W6TiC9NmhKHSSwuRP7
NGROK_URL   := womanly-modesta-gnathic.ngrok-free.dev

.PHONY: dev expose expose-stop expose-logs help

## Start the Vite dev server
dev:
	npx vite --host 0.0.0.0 --port $(APP_PORT)

## Expose the app via ngrok (Docker)
expose:
	@docker stop ngrok 2>/dev/null || true
	@docker rm ngrok 2>/dev/null || true
	docker run --net=host -it --name ngrok \
		-e NGROK_AUTHTOKEN=$(NGROK_TOKEN) \
		ngrok/ngrok:latest http --url=$(NGROK_URL) $(APP_PORT)

## Stop the ngrok tunnel
expose-stop:
	@docker stop ngrok 2>/dev/null || true
	@docker rm ngrok 2>/dev/null || true
	@echo "🛑  Tunnel ngrok arrêté"

## Show ngrok container logs
expose-logs:
	docker logs -f ngrok

## Show available commands
help:
	@echo ""
	@echo "  make dev           Lancer le serveur Vite (port $(APP_PORT))"
	@echo "  make expose        Exposer l'app via ngrok (Docker)"
	@echo "  make expose-stop   Arrêter le tunnel ngrok"
	@echo "  make expose-logs   Voir les logs ngrok"
	@echo ""
	@echo "  URL : https://$(NGROK_URL)"
	@echo ""

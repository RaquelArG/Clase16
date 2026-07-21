import { ApiLLMGateway } from "./infrastructure/llm/ApiLLMGateway.js";
import { SessionStorageConversationRepository } from "./infrastructure/storage/SessionStorageConversationRepository.js";
import { LocalStorageFavoritesRepository } from "./infrastructure/storage/LocalStorageFavoritesRepository.js";
import { CookieTokenRepository } from "./infrastructure/storage/CookieTokenRepository.js";
import { DomView } from "./infrastructure/ui/DomView.js";
import { SessionExpiredModalNotifier } from "./infrastructure/ui/SessionExpiredModalNotifier.js";
import { AppController } from "./infrastructure/ui/AppController.js";

import { SendPromptUseCase } from "./application/usecases/SendPromptUseCase.js";
import { StartSessionUseCase } from "./application/usecases/StartSessionUseCase.js";
import { SaveFavoriteUseCase } from "./application/usecases/SaveFavoriteUseCase.js";
import { GetTokenStatusUseCase } from "./application/usecases/GetTokenStatusUseCase.js";
import { HandleSessionExpiredUseCase } from "./application/usecases/HandleSessionExpiredUseCase.js";

document.addEventListener("DOMContentLoaded", () => {
  // ---- Adaptadores secundarios (infraestructura -> puertos) ----
  const conversationRepository = new SessionStorageConversationRepository();
  const favoritesRepository = new LocalStorageFavoritesRepository();
  const tokenRepository = new CookieTokenRepository();
  const llmGateway = new ApiLLMGateway();

  const view = new DomView();
  const modalNotifier = new SessionExpiredModalNotifier(document.getElementById("modal"));

  // ---- Casos de uso (aplicación), con dependencias inyectadas por puerto ----
  const useCases = {
    sendPrompt: new SendPromptUseCase({ conversationRepository, tokenRepository, llmGateway }),
    startSession: new StartSessionUseCase({ tokenRepository }),
    saveFavorite: new SaveFavoriteUseCase({ favoritesRepository }),
    getTokenStatus: new GetTokenStatusUseCase({ tokenRepository }),
    handleSessionExpired: new HandleSessionExpiredUseCase({
      conversationRepository,
      notifier: modalNotifier,
    }),
  };

  // ---- Adaptador primario: entra al hexágono desde eventos del DOM ----
  const controller = new AppController({
    view,
    modalNotifier,
    useCases,
    conversationRepository,
    favoritesRepository,
  });

  controller.iniciar();
});

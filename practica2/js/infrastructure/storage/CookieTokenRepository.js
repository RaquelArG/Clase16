import { TokenRepository } from "../../application/ports/TokenRepository.js";
import { AccessToken } from "../../domain/AccessToken.js";

const COOKIE_NAME = "llm_token";

export class CookieTokenRepository extends TokenRepository {
  emitir(duracionMs) {
    const token = AccessToken.emitir(duracionMs);
    const maxAgeSeg = Math.floor(duracionMs / 1000);
    document.cookie = `${COOKIE_NAME}=${token.aValorCookie()}; max-age=${maxAgeSeg}; path=/`;
    return token;
  }

  leer() {
    const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + COOKIE_NAME + "=([^;]+)"));
    const valor = m ? decodeURIComponent(m[1]) : null;
    return AccessToken.desdeValorCookie(valor);
  }
}

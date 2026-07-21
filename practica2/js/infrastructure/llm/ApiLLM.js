export const ApiLLM = (() => {
  const _p = "llm_token";           // nombre exacto de la cookie
  const _f = /^tk_(\d+)$/;          // formato exacto del valor: tk_<epochMsExpiracion>

  function _leerCookie() {
    const m = document.cookie.match(new RegExp("(?:^|;\\s*)" + _p + "=([^;]+)"));
    return m ? decodeURIComponent(m[1]) : null;
  }
  function _tokenValido(t) {
    if (!t) return false;
    const m = t.match(_f);
    if (!m) return false;
    return Date.now() < Number(m[1]);
  }
  function _contextoValido(h) {
    return Array.isArray(h) && h.length > 0 && h.every(x =>
      x && typeof x === "object" &&
      (x.rol === "user" || x.rol === "ia") &&
      typeof x.contenido === "string"
    );
  }
  const _r = [
    "Interesante. Reformulando tu contexto de %N mensajes: la clave está en la especificidad.",
    "Con %N mensajes de contexto, mi análisis es: divide el problema antes de pedir código.",
    "He leído tus %N mensajes. Sugerencia: define el formato de salida en el prompt.",
    "Contexto de %N mensajes recibido. Un buen prompt declara rol, tarea y restricciones."
  ];

  async function enviar(historial) {
    // latencia de red simulada
    await new Promise(res => setTimeout(res, 350 + Math.random() * 900));

    if (!_tokenValido(_leerCookie())) {
      throw { status: 401, error: "TOKEN_AUSENTE_MALFORMADO_O_EXPIRADO" };
    }
    if (!_contextoValido(historial)) {
      throw { status: 422, error: "FORMATO_DE_CONTEXTO_INVALIDO",
              esperado: '[{ rol: "user"|"ia", contenido: string }, ...]' };
    }
    const frase = _r[historial.length % _r.length].replace("%N", historial.length);
    return { status: 200, respuesta: frase };
  }

  return { enviar };
})();
Object.freeze(ApiLLM);

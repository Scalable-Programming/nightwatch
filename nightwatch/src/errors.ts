export class NetworkError extends Error {
  constructor() {
    super("NetworkError");
  }
}

export class AbortError extends Error {
  constructor() {
    super("AbortError");
  }
}

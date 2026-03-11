export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginSuccessResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type LoginErrorResponse = {
  code:
    | "INVALID_CREDENTIALS"
    | "EMAIL_NOT_VERIFIED"
    | "ACCOUNT_LOCKED"
    | "TOO_MANY_ATTEMPTS"
    | "INTERNAL_ERROR";
  message: string;
};

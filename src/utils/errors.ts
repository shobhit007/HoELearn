import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        return "The request timed out. Please try again.";
      }
      return "Unable to connect. Please check your internet connection.";
    }

    const status = error.response.status;
    const data = error.response.data as
      | { message?: string; errors?: string[] }
      | undefined;
    const serverMessage =
      data?.message ??
      (Array.isArray(data?.errors) ? data.errors[0] : undefined);

    if (status === 401) {
      return serverMessage ?? "Invalid username or password.";
    }
    if (status === 409) {
      return (
        serverMessage ??
        "An account with this email or username already exists."
      );
    }
    if (status === 400 || status === 422) {
      return serverMessage ?? "Please check your information and try again.";
    }
    if (status >= 500) {
      return "Something went wrong on our end. Please try again later.";
    }

    return serverMessage ?? fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

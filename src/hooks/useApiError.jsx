import React from "react";

const useApiError = () => {
  const getErrorMessage = React.useCallback((error) => {
    if (!error?.response) {
      return "An unknown error occured.";
    }

    const status = error.response.status;

    switch (status) {
      case 400:
        return "Invalid Request";
      case 401:
        return "You must be logged in.";
      case 403:
        return "You are not permitted to do that.";
      case 404:
        return "Resource not found.";
      case 422:
        return "Validation failed. Please check your input data.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return "Something went wrong.";
    }
  }, []);
  return { getErrorMessage };
};

export default useApiError;

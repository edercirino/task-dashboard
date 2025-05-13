import React from "react";

const useApiError = () => {
  const getErrorMessage = React.useCallback((error) => {
    if (!error?.response) {
      return "An unknown error occured.";
    }

    const status = error.response.status;

    switch (status) {
      case 400:
        return "Error 400 - Invalid Request";
      case 401:
        return "Error 401 - You must be logged in.";
      case 403:
        return "Error 403 - You are not permitted to do that.";
      case 404:
        return "Error 404 - Resource not found.";
      case 422:
        return "Error 422 - Validation failed. Please check your input data.";
      case 500:
        return "Error 500 - Server error. Please try again later.";
      default:
        return "Something went wrong.";
    }
  }, []);
  return { getErrorMessage };
};

export default useApiError;

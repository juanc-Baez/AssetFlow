package com.juanapi.crudemp.exception;

public class ErrorDetails {
    private int statusCode;
    private String message;
    private String details;

    public ErrorDetails(int statusCode, String message, String details) {
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
    }

    public int getStatusCode() {
        return statusCode;
    }
    public String getMessage() {
        return message;
    }
    public String getDetails() {
        return details;
    }
    @Override
    public String toString() {
        return "ErrorDetails{" +
                "statusCode=" + statusCode +
                ", message='" + message + '\'' +
                ", details='" + details + '\'' +
                '}';
    }
}

